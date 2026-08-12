import type { Metadata } from "next";
import "./globals.css";
import "./portfolio-overrides.css";

const siteUrl = "https://psc2ed-cell.github.io/psc_2de.github-io/";
const ogImage = `${siteUrl}og.png`;
const title = "毛大明 Peter｜AI 影像作品集 — MOTION / MAKER";
const description = "毛大明（Peter）的 AI 影像作品集，涵盖 3D 国风漫剧、都市玄幻 AI 短剧、现代情感短剧与非商用汽车概念影像。";
const refreshEntryScript = `
  (() => {
    const entries = typeof performance.getEntriesByType === "function"
      ? performance.getEntriesByType("navigation")
      : [];
    const isReload = entries.length
      ? entries[0].type === "reload"
      : Boolean(performance.navigation && performance.navigation.type === 1);

    if (!isReload) return;

    if (window.location.hash) {
      history.replaceState(history.state, "", window.location.pathname + window.location.search);
    }

    const supportsRestoration = "scrollRestoration" in history;
    const previousRestoration = supportsRestoration ? history.scrollRestoration : "auto";
    if (supportsRestoration) history.scrollRestoration = "manual";

    const root = document.documentElement;
    const previousBehavior = root.style.getPropertyValue("scroll-behavior");
    const previousPriority = root.style.getPropertyPriority("scroll-behavior");
    root.style.setProperty("scroll-behavior", "auto", "important");

    const resetTop = () => {
      root.getBoundingClientRect();
      window.scrollTo(0, 0);
    };

    const finishReset = () => {
      resetTop();
      if (previousBehavior) root.style.setProperty("scroll-behavior", previousBehavior, previousPriority);
      else root.style.removeProperty("scroll-behavior");
      if (supportsRestoration) history.scrollRestoration = previousRestoration;
    };

    resetTop();
    document.addEventListener("DOMContentLoaded", resetTop, { once: true });
    window.addEventListener("load", resetTop, { once: true });
    window.addEventListener("pageshow", () => {
      resetTop();
      requestAnimationFrame(() => {
        resetTop();
        window.setTimeout(finishReset, 320);
      });
    }, { once: true });
  })();
`;

const hdPosterScript = `
  (() => {
    const posters = {
      "media/project-upgrade.mp4": "media/穿成镇北王.png",
      "media/project-breakoff.mp4": "media/缘尽安好.png",
      "media/project-master-descends.mp4": "media/高手下山.png",
    };

    const applyPosters = () => {
      document.querySelectorAll("video").forEach((video) => {
        const source = video.querySelector("source");
        const src = source?.getAttribute("src") || "";
        const poster = posters[src];
        if (poster) video.setAttribute("poster", poster);
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", applyPosters, { once: true });
    } else {
      applyPosters();
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  applicationName: "MOTION / MAKER Portfolio",
  alternates: { canonical: siteUrl },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "MOTION / MAKER Portfolio",
    type: "website",
    locale: "zh_CN",
    images: [{ url: ogImage, width: 1200, height: 630, alt: "MOTION MAKER AI 影像个人作品集" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <script id="refresh-entry-reset" dangerouslySetInnerHTML={{ __html: refreshEntryScript }} />
      </head>
      <body>
        {children}
        <script id="hd-project-posters" dangerouslySetInnerHTML={{ __html: hdPosterScript }} />
      </body>
    </html>
  );
}
