import { readFileSync, writeFileSync } from "node:fs";

const path = new URL("../app/page.tsx", import.meta.url);
const source = readFileSync(path, "utf8");

const block = `                <div className="project__header" data-reveal={Number(project.index) % 2 ? "left" : "right"}>
                  <span className="project__number">{project.index}</span>
                  <div>
                    <span className="project__category">{project.category}</span>
                  </div>
                  <span className="project__duration">{project.duration}</span>
                </div>

`;

if (!source.includes(block)) {
  console.log("Project header strip is already absent; nothing to remove.");
  process.exit(0);
}

writeFileSync(path, source.replace(block, ""));
console.log("Removed the entire project header strip: number, category, and duration.");
