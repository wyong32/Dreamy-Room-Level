# Dreamy Room Level Game Guide

Official game guide website for Dreamy Room Level, providing comprehensive walkthroughs, puzzle tips, level guides and game downloads.

## 域名配置

当前网站使用Vercel提供的临时域名：`https://dreamyroom.co`

### 更改为自定义域名的步骤

1. 在Vercel控制台中添加自定义域名

   - 登录Vercel账户
   - 选择此项目
   - 点击"Domains"选项卡
   - 添加您的自定义域名并按照指示完成DNS配置

2. 更新环境变量

   - 在Vercel项目设置中，更新`NEXT_PUBLIC_SITE_URL`环境变量为您的新域名
   - 在本地开发环境中，更新以下文件中的域名：
     - `.env`
     - `.env.local`
     - `vercel.json`

3. 重新部署网站
   - 提交更改并推送到GitHub
   - Vercel将自动重新部署网站

## 本地开发

```sh
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

## 技术栈

- Vue 3
- Vite
- Vue Router
- i18n (多语言支持，目前已禁用)
- Vercel (部署和托管)

## SEO优化

网站已进行SEO优化，包括：

- 动态生成的站点地图 (`/sitemap.xml`)
- 规范URL (Canonical URLs)
- 社交媒体元标签 (Open Graph, Twitter Cards)
- 响应式设计
- 语义化HTML
- 优化的图片

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## 项目背景
