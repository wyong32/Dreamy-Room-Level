// 动态生成站点地图的Vercel Serverless Function
export default function handler(req, res) {
  // 设置正确的内容类型
  res.setHeader('Content-Type', 'application/xml');
  
  // 获取当前日期作为lastmod
  const today = new Date().toISOString().split('T')[0];
  
  // 获取基础URL（从请求中或使用环境变量）
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dreamy-room-level.vercel.app';
  
  // 主页和主要页面
  const mainPages = [
    { url: '/', priority: '1.0' },
    { url: '/guides', priority: '0.9' },
    { url: '/blog', priority: '0.8' },
    { url: '/download', priority: '0.7' },
  ];
  
  // 游戏关卡页面（1-40）
  const levelPages = Array.from({ length: 40 }, (_, i) => ({
    url: `/game-level-${i + 1}`,
    priority: '0.8'
  }));
  
  // 博客文章页面（示例）
  const blogPages = [
    { url: '/blog-tips-for-beginners', priority: '0.7' },
    { url: '/blog-advanced-strategies', priority: '0.7' },
    { url: '/blog-hidden-features', priority: '0.7' },
  ];
  
  // 合并所有页面
  const allPages = [...mainPages, ...levelPages, ...blogPages];
  
  // 生成XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  // 返回生成的XML
  res.status(200).send(xml);
}
