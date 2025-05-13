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

        // 查找detailsRoute中的路径，这是我们希望的URL路径
        const routeMatches = content.match(
          /detailsRoute:\s*{\s*path:\s*['|"](\/[a-zA-Z0-9-]+)['|"]/g,
        )
        if (routeMatches) {
          routeMatches.forEach((match) => {
            const route = match.match(/['|"](\/[a-zA-Z0-9-]+)['|"]/)[1]
            if (route && typeof route === 'string') {
              // 移除开头的斜杠，因为path属性不需要
              const pathStr = route.startsWith('/') ? route.substring(1) : route
              ids.add(pathStr)
            }
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

      // 查找detailsRoute中的路径，这是我们希望的URL路径
      const routeMatches = content.match(/detailsRoute:\s*{\s*path:\s*['|"](\/[a-zA-Z0-9-]+)['|"]/g)
      if (routeMatches) {
        routeMatches.forEach((match) => {
          const routeMatch = match.match(/['|"](\/[a-zA-Z0-9-]+)['|"]/)
          if (routeMatch && routeMatch[1] && typeof routeMatch[1] === 'string') {
            // 移除开头的斜杠，因为path属性不需要
            const pathStr = routeMatch[1].startsWith('/')
              ? routeMatch[1].substring(1)
              : routeMatch[1]
            if (typeof pathStr === 'string') {
              ids.add(pathStr)
            }
          }
        })
      }
    }

    // 检查blogs目录（如果存在）
    const blogsDir = path.join(dataDir, 'blogs')
    if (fs.existsSync(blogsDir) && fs.statSync(blogsDir).isDirectory()) {
      const files = fs.readdirSync(blogsDir)

      // 遍历所有文件
      files.forEach((file) => {
        if (file.endsWith('.js')) {
          const filePath = path.join(blogsDir, file)
          const content = fs.readFileSync(filePath, 'utf-8')

          // 查找detailsRoute中的路径，这是我们希望的URL路径
          const routeMatches = content.match(
            /detailsRoute:\s*{\s*path:\s*['|"](\/[a-zA-Z0-9-]+)['|"]/g,
          )
          if (routeMatches) {
            routeMatches.forEach((match) => {
              const routeMatch = match.match(/['|"](\/[a-zA-Z0-9-]+)['|"]/)
              if (routeMatch && routeMatch[1] && typeof routeMatch[1] === 'string') {
                // 移除开头的斜杠，因为path属性不需要
                const pathStr = routeMatch[1].startsWith('/')
                  ? routeMatch[1].substring(1)
                  : routeMatch[1]
                if (typeof pathStr === 'string') {
                  ids.add(pathStr)
                }
              }
            })
          }
        }
      })
    }
  } catch (e) {
    console.error(`Error reading or parsing blog files:`, e)
  }

  console.log(`[Sitemap Plugin] Found ${ids.size} blog IDs`) // 记录找到的ID数量
  return Array.from(ids)
}

// 定义静态路径（不带前导斜杠）
const staticPaths = [
  '', // 对应首页 '/'
  'dreamy-room-revel-game-guides',
  'dreamy-room-game-blog',
  'download-dreamy-room-game',
  'about',
  'contact',
  'privacy',
  'terms',
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    ViteSitemapPlugin({
      hostname: process.env.VITE_SITE_URL || 'https://dreamy-room-level.vercel.app/',
      exclude: ['/:id'], // 这个可能不再需要，或者需要调整
      // 不再使用 routes 选项
      dynamicRoutes: [
        // 先添加所有静态路径
        ...staticPaths,
        // 再添加动态生成的路径
        ...loadGuideIds(), // 直接使用 loadGuideIds() 的结果
        ...loadBlogIds(), // 直接使用 loadBlogIds() 的结果
      ].filter(Boolean), // 过滤掉可能的空值
      // 可以为特定路径自定义 lastmod, changefreq, priority (可选)
      // 如果需要，可以使用 `transform` 选项来自定义每个 URL 的属性
      // transform: async (route) => {
      //   if (staticPaths.includes(route)) {
      //      // 为静态路由设置不同的属性
      //      if (route === '') return { loc: '/', priority: 1.0, changefreq: 'weekly', lastmod: new Date() }
      //      if (route === 'dreamy-room-revel-game-guides') return { loc: `/${route}`, priority: 0.9, changefreq: 'weekly', lastmod: new Date() }
      //      // ... 其他静态路由
      //   } else {
      //     // 动态路由的默认属性
      //     return { loc: `/${route}`, priority: 0.8, changefreq: 'daily', lastmod: new Date() }
      //   }
      // },
      outDir: 'dist',
    }),
    robots({
      useProductionFile: true, // 使用.robots.production.txt文件
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
