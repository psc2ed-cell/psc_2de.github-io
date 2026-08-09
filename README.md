# MOTION / MAKER

毛大明（Peter）的 AI 影像个人作品集，收录 3D 国风漫剧、情感短片、都市短剧与非商用汽车概念影像。

线上地址：[https://psc2ed-cell.github.io/psc_2de.github-io/](https://psc2ed-cell.github.io/psc_2de.github-io/)

## 内容

- 4 部完整展示成片与项目说明
- 题材方向与 AI 影像制作能力概览
- 红果漫剧新剧榜原始成绩截图
- 个人简介与邮箱、手机号联系方式

## 本地开发

需要 Node.js 22.13–23.x，以及 pnpm；当前推荐 Node.js 22 LTS。

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
pnpm build:static
```

`pnpm build` 验证 Cloudflare Workers 兼容构建；`pnpm build:static` 生成用于 GitHub Pages 的 `out/` 静态目录，并自动写入 `.nojekyll`。

## 发布

`main` 分支保存网站源代码，`gh-pages` 分支保存 `out/` 的静态成品。发布时使用最新静态构建替换 `gh-pages` 内容，现有 GitHub Pages 网址保持不变。

## 说明

YU7 GT 为非商用、非官方个人概念作品，与小米集团无隶属或合作关系；相关产品素材与商标归各自权利人所有。网页使用轻量代理视频，原始成片文件保持不变。
