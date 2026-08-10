import { spawnSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDirectory = join(projectRoot, "out");
const buildDirectory = join(projectRoot, "dist");
const clientDirectory = join(buildDirectory, "client");
const vinextCli = join(projectRoot, "node_modules", "vinext", "dist", "cli.js");
const requiredStaticArtifacts = [
  join(clientDirectory, "index.html"),
  join(clientDirectory, "index.rsc"),
  join(clientDirectory, "vinext-client-entry-manifest.json"),
  join(clientDirectory, "_next", "static"),
];

function copyDirectory(source, destination) {
  mkdirSync(destination, { recursive: true });
  for (const entry of readdirSync(source, { withFileTypes: true })) {
    const sourcePath = join(source, entry.name);
    const destinationPath = join(destination, entry.name);
    if (entry.isDirectory()) copyDirectory(sourcePath, destinationPath);
    else if (entry.isFile()) copyFileSync(sourcePath, destinationPath);
  }
}

if (!existsSync(vinextCli)) {
  throw new Error("vinext is not installed. Run pnpm install first.");
}

// `emptyOutDir` is intentionally disabled in Vite. Both targets are ignored
// build products, so clear them before generating a publishable snapshot.
if (existsSync(outputDirectory)) {
  rmSync(outputDirectory, { recursive: true, force: true });
}
if (existsSync(buildDirectory)) {
  rmSync(buildDirectory, { recursive: true, force: true });
}

const result = spawnSync(process.execPath, [vinextCli, "build"], {
  cwd: projectRoot,
  env: { ...process.env, STATIC_EXPORT: "1" },
  stdio: "inherit",
});

if (result.error) throw result.error;
if (result.status !== 0 && !requiredStaticArtifacts.every(existsSync)) {
  process.exit(result.status ?? 1);
}

if (result.status !== 0) {
  console.warn("vinext exited after generating a complete static export; continuing with the verified artifacts.");
}

if (!existsSync(clientDirectory)) {
  throw new Error("Static export did not create dist/client.");
}

copyDirectory(clientDirectory, outputDirectory);

// Keep every framework asset relative so GitHub project Pages resolves `_next`
// below the repository path instead of at the account root. Vinext has emitted
// both `/./_next/` and `/_next/` across versions, so normalize and assert both
// the HTML document and its RSC payload.
for (const entryName of ["index.html", "index.rsc"]) {
  const entryPath = join(outputDirectory, entryName);
  const normalized = readFileSync(entryPath, "utf8")
    .replaceAll("/./_next/", "./_next/")
    .replace(/([\"'=])\/_next\//g, "$1./_next/");

  if (/([\"'=])\/(?:\.\/)?_next\//.test(normalized)) {
    throw new Error(`${entryName} still contains a root-relative _next asset URL.`);
  }

  writeFileSync(entryPath, normalized);
}
writeFileSync(join(outputDirectory, ".nojekyll"), "");
