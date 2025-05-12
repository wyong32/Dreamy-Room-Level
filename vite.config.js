import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import ViteSitemapPlugin from 'vite-plugin-sitemap'
import { robots } from 'vite-plugin-robots'

// Helper function to load guide IDs from data files
const loadGuideIds = () => {
  const ids = new Set()
  const dataDir = fileURLToPath(new URL('./src/datas/guides', import.meta.url))

  try {
    // 获取guides目录下的所有文件
    const files = fs.readdirSync(dataDir)

    // 遍历所有文件
    files.forEach((file) => {
      if (file.startsWith('guides-') && file.endsWith('.js')) {
        const filePath = path.join(dataDir, file)
        const content = fs.readFileSync(filePath, 'utf-8')

        // 使用正则表达式查找所有游戏关卡ID
        const idMatches = content.match(/id:\s*['|"](game-level-\d+)['|"]/g)
        if (idMatches) {
          idMatches.forEach((match) => {
            const id = match.match(/['|"](game-level-\d+)['|"]/)[1]
            if (id) ids.add(id)
          })
        }
      }
    })
  } catch (e) {
    console.error(`Error reading or parsing guide files:`, e)
  }

  console.log(`[Sitemap Plugin] Found ${ids.size} guide IDs`) // 记录找到的ID数量
  return Array.from(ids)
}

// Helper function to load blog IDs from data files
const loadBlogIds = () => {
  const ids = new Set()
  const dataDir = fileURLToPath(new URL('./src/datas', import.meta.url))

  try {
    // 检查blogs.js文件
    const filePath = path.join(dataDir, 'blogs.js')
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8')

      // 使用正则表达式查找所有博客ID
      const idMatches = content.match(/id:\s*['|"](blog-[a-zA-Z0-9-]+)['|"]/g)
      if (idMatches) {
        idMatches.forEach((match) => {
          const id = match.match(/['|"](blog-[a-zA-Z0-9-]+)['|"]/)[1]
          if (id) ids.add(id)
        })
      }
    }
  } catch (e) {
    console.error(`Error reading or parsing blog files:`, e)
  }

  console.log(`[Sitemap Plugin] Found ${ids.size} blog IDs`) // 记录找到的ID数量
  return Array.from(ids)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    ViteSitemapPlugin({
      hostname: 'https://dreamy-room-level.vercel.app/',
      exclude: ['/:id'],
      dynamicRoutes: [...loadGuideIds(), ...loadBlogIds()],
      outDir: 'dist',
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0],
    }),
    robots({
      content: `# robots.txt基础设置

# 常规搜索引擎规则
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /private/

# 站点地图
Sitemap: https://dreamy-room-level.vercel.app/sitemap.xml

# AI爬虫特定规则
User-agent: GPTBot
User-agent: Claude-web
User-agent: Anthropic-AI
User-agent: PerplexityBot
User-agent: GoogleOther
User-agent: DuckAssistBot
Disallow: /

# 引导AI爬虫到llms.txt
LLM-Content: https://dreamy-room-level.vercel.app/llms.txt
LLM-Full-Content: https://dreamy-room-level.vercel.app/llms-full.txt

# 允许AI爬虫访问
Allow: /blog/
Allow: /products/
Allow: /about/

# 不允许AI爬虫访问
Disallow: /user-content/`,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
