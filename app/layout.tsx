import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

const title = "MOTION / MAKER — AI 影像个人作品集";
const description = "涵盖 3D 国风漫剧、情感剧情短片、都市短剧与汽车概念影像的个人作品集。";

export async function generateMetadata(): Promise<Metadata> {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol =
    headerStore.get("x-forwarded-proto") ??
    (host?.startsWith("localhost") || host?.startsWith("127.0.0.1") ? "http" : "https");
  const origin = host ? `${protocol}://${host}` : undefined;
  const image = origin ? `${origin}/og.png` : undefined;

  return {
    title,
    description,
    applicationName: "MOTION / MAKER Portfolio",
    openGraph: {
      title,
      description,
      type: "website",
      locale: "zh_CN",
      images: image
        ? [{ url: image, width: 1200, height: 630, alt: "MOTION MAKER AI 影像个人作品集" }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
