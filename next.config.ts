import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出：生成纯 HTML/CSS/JS，适配 GitHub Pages 等静态托管
  output: "export",
  // GitHub Pages 项目页部署在子路径，资源用相对路径引用
  trailingSlash: true,
};

export default nextConfig;
