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

  // 游戏关卡页面 - 只包含实际存在的页面
  // 这里我们只包含1-30的关卡，您可以根据实际情况调整
  const levelPages = []

  // 只添加/dreamy-room-level-X格式（guides数据中的格式）
  // 这里我们假设只有1-30的关卡实际存在
  for (let i = 1; i <= 30; i++) {
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

  // 生成XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
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
