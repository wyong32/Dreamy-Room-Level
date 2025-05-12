// 动态生成站点地图的Vercel Serverless Function
export default function handler(_req, res) {
  // 设置正确的内容类型
  res.setHeader('Content-Type', 'application/xml')

  // 获取当前日期作为lastmod
  const today = new Date().toISOString().split('T')[0]

  // 获取基础URL（从请求中或使用环境变量）
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamy-room-level.vercel.app'

  // 主页和主要页面
  const mainPages = [
    { url: '/', priority: '1.0', lastmod: today },
    { url: '/guides', priority: '0.9', lastmod: today },
    { url: '/blog', priority: '0.8', lastmod: today },
    { url: '/download', priority: '0.7', lastmod: today },
  ]

  // 游戏关卡页面 - 基于guides文件夹中的文件
  const levelPages = []

  // 添加所有可能的游戏关卡URL格式
  // 根据guides文件夹中的文件，我们有1-110的关卡

  // 1. 添加/game-level-X格式（路由配置中的格式）
  for (let i = 1; i <= 110; i++) {
    levelPages.push({
      url: `/game-level-${i}`,
      priority: '0.8',
      lastmod: today,
    })
  }

  // 2. 添加/dreamy-room-level-X格式（guides数据中的格式）
  for (let i = 1; i <= 110; i++) {
    levelPages.push({
      url: `/dreamy-room-level-${i}`,
      priority: '0.8',
      lastmod: today,
    })
  }

  // 博客文章页面 - 硬编码所有已知的博客文章
  const blogPages = [
    { url: '/blog-new-features-2025', priority: '0.7', lastmod: '2025-01-15' },
    { url: '/blog-design-philosophy', priority: '0.7', lastmod: '2025-01-28' },
    { url: '/blog-community-spotlight', priority: '0.7', lastmod: '2025-02-10' },
  ]

  // 合并所有页面
  const allPages = [...mainPages, ...levelPages, ...blogPages]

  // 去重 - 确保没有重复的URL
  const uniquePages = Array.from(new Map(allPages.map((page) => [page.url, page])).values())

  // 生成XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniquePages
  .map(
    (page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  // 返回生成的XML
  res.status(200).send(xml)
}
