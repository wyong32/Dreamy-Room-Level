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
            if (id && typeof id === 'string') ids.add(id)
          })
        }

        // 查找detailsRoute中的路径
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

      // 使用正则表达式查找所有博客ID
      const idMatches = content.match(/id:\s*['|"]([a-zA-Z0-9-]+)['|"]/g)
      if (idMatches) {
        idMatches.forEach((match) => {
          const idMatch = match.match(/['|"]([a-zA-Z0-9-]+)['|"]/)
          if (idMatch && idMatch[1] && typeof idMatch[1] === 'string') {
            // 添加blog-前缀，因为路由是/blog-{id}
            ids.add(`blog-${idMatch[1]}`)
          }
        })
      }

      // 查找detailsRoute中的路径
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

          // 使用正则表达式查找所有博客ID
          const idMatches = content.match(/id:\s*['|"]([a-zA-Z0-9-]+)['|"]/g)
          if (idMatches) {
            idMatches.forEach((match) => {
              const idMatch = match.match(/['|"]([a-zA-Z0-9-]+)['|"]/)
              if (idMatch && idMatch[1] && typeof idMatch[1] === 'string') {
                // 添加blog-前缀，因为路由是/blog-{id}
                ids.add(`blog-${idMatch[1]}`)
              }
            })
          }

          // 查找detailsRoute中的路径
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

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    ViteSitemapPlugin({
      hostname: 'https://dreamy-room-level.vercel.app/',
      exclude: ['/:id'],
      // 添加静态路由（主页和主要页面）
      routes: [
        {
          path: '/',
          lastmod: new Date().toISOString().split('T')[0],
          priority: 1.0,
          changefreq: 'weekly',
        },
        {
          path: '/guides',
          lastmod: new Date().toISOString().split('T')[0],
          priority: 0.9,
          changefreq: 'weekly',
        },
        {
          path: '/blog',
          lastmod: new Date().toISOString().split('T')[0],
          priority: 0.8,
          changefreq: 'weekly',
        },
        {
          path: '/download',
          lastmod: new Date().toISOString().split('T')[0],
          priority: 0.7,
          changefreq: 'weekly',
        },
      ],
      // 添加动态路由（游戏关卡和博客文章）
      dynamicRoutes: [
        // 游戏关卡路由 - 使用字符串数组而不是对象数组
        ...loadGuideIds().map((id) => id),
        // 博客文章路由 - 使用字符串数组而不是对象数组
        ...loadBlogIds().map((id) => id),
      ].filter(Boolean), // 过滤掉可能的null或undefined值
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
