import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import ViteSitemapPlugin from 'vite-plugin-sitemap'
import { robots } from 'vite-plugin-robots'
import { VitePWA } from 'vite-plugin-pwa'

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
  'dreamy-room-level-game-guides',
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
      hostname: process.env.VITE_SITE_URL || 'https://www.dreamyroom.co/',
      exclude: ['/404'],
      dynamicRoutes: [...staticPaths, ...loadGuideIds(), ...loadBlogIds()].filter(Boolean),
      outDir: 'dist',
      // 添加更多SEO配置
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString().split('T')[0],
      // 为不同类型的页面设置不同的优先级
      routes: {
        '/': { priority: 1.0, changefreq: 'weekly' },
        '/dreamy-room-level-game-guides': { priority: 0.9, changefreq: 'weekly' },
        '/dreamy-room-game-blog': { priority: 0.8, changefreq: 'weekly' },
        '/download-dreamy-room-game': { priority: 0.7, changefreq: 'monthly' },
        '/about': { priority: 0.6, changefreq: 'monthly' },
        '/contact': { priority: 0.5, changefreq: 'monthly' },
        '/privacy': { priority: 0.3, changefreq: 'yearly' },
        '/terms': { priority: 0.3, changefreq: 'yearly' },
      },
    }),
    robots({
      useProductionFile: true, // 使用.robots.production.txt文件
    }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: false, // 开发环境禁用PWA
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        cleanupOutdatedCaches: true,
      },
      includeAssets: ['favicon.ico'],
      manifest: {
        name: 'Dreamy Room Game Guides',
        short_name: 'Dreamy Room',
        description: 'Complete walkthrough guides for all levels of Dreamy Room puzzle game',
        theme_color: '#6a4c93',
        background_color: '#faf5ff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2015',
    minify: 'terser', // 使用terser获得更好的压缩
    terserOptions: {
      compress: {
        drop_console: true, // 生产环境移除console
        drop_debugger: true, // 移除debugger
        pure_funcs: ['console.log'], // 移除特定函数调用
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Vue核心库
          if (id.includes('vue') || id.includes('vue-router') || id.includes('vue-i18n')) {
            return 'vue'
          }
          // 第三方库
          if (id.includes('pinia') || id.includes('@vueuse')) {
            return 'vendor'
          }
          // 指南数据
          if (id.includes('/datas/guides/') || id.includes('/datas/blogs')) {
            return 'data'
          }
          // 组件
          if (id.includes('/components/') && !id.includes('node_modules')) {
            return 'components'
          }
          // 视图
          if (id.includes('/views/') && !id.includes('node_modules')) {
            return 'views'
          }
          // 其他第三方库
          if (id.includes('node_modules')) {
            return 'libs'
          }
        },
        // 优化文件名和缓存
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const fileName = assetInfo.names?.[0] || 'asset'
          const info = fileName.split('.')
          const ext = info[info.length - 1]
          if (/\.(png|jpe?g|gif|svg|webp|avif)(\?.*)?$/i.test(fileName)) {
            return `images/[name]-[hash].${ext}`
          }
          if (ext === 'css') {
            return `css/[name]-[hash].${ext}`
          }
          return `assets/[name]-[hash].${ext}`
        },
      },
    },
    // 启用CSS代码分割
    cssCodeSplit: true,
    // 设置chunk大小警告限制
    chunkSizeWarningLimit: 1000,
    // 启用压缩报告
    reportCompressedSize: true,
  },
  // 优化依赖预构建
  optimizeDeps: {
    include: ['vue', 'vue-router', 'pinia', 'vue-i18n'],
    exclude: ['@vueuse/head'], // 按需加载
  },
  // 服务器配置
  server: {
    // 启用HTTP/2
    https: false,
    // 移除预热配置，避免路径问题
  },
  // 预览服务器配置
  preview: {
    // 启用压缩
    headers: {
      'Cache-Control': 'public, max-age=31536000',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    },
  },
})
