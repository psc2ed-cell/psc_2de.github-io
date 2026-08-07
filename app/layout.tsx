import type { Metadata } from "next";
import "./globals.css";

const title = "MOTION / MAKER — AI 影像个人作品集";
const description = "涵盖 3D 国风漫剧、情感剧情短片、都市短剧与汽车概念影像的个人作品集。";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "MOTION / MAKER Portfolio",
  openGraph: {
    title,
    description,
    type: "website",
    locale: "zh_CN",
    images: [{ url: "og.png", width: 1200, height: 630, alt: "MOTION MAKER AI 影像个人作品集" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
