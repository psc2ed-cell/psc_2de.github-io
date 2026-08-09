import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://psc2ed-cell.github.io/psc_2de.github-io/";
const ogImage = `${siteUrl}og.png`;
const title = "毛大明 Peter｜AI 影像作品集 — MOTION / MAKER";
const description = "毛大明（Peter）的 AI 影像作品集，涵盖 3D 国风漫剧、情感短片、都市短剧与非商用汽车概念影像。";

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
      <body>{children}</body>
    </html>
  );
}
