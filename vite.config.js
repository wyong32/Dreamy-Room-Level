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
      sitemap: 'https://dreamy-room-level.vercel.app/sitemap.xml',
      host: 'https://dreamy-room-level.vercel.app',
      disallow: ['/admin/', '/private/'],
      allow: ['/'],
      useDisallowAll: false,
      useProductionFile: false, // 不使用外部文件
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
