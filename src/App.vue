<template>
  <div class="app">
    <AppHeader />
    <main class="main-content">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script setup>
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

// 获取当前路由
const route = useRoute()

// 计算当前页面的完整URL（用于规范链接和社交媒体分享）
const pageUrl = computed(() => {
  // 从环境变量获取基础URL，如果不存在则使用默认值
  const baseUrl = import.meta.env.VITE_SITE_URL || 'https://dreamy-room-level.vercel.app'
  return `${baseUrl}${route.path}`
})

// 动态更新规范链接和社交媒体元标签
watch(
  () => route.path,
  () => {
    // 更新规范链接
    updateCanonicalLink()

    // 更新社交媒体元标签
    updateSocialMetaTags()
  },
  { immediate: true },
)

// 更新规范链接
function updateCanonicalLink() {
  let link = document.querySelector('link[rel="canonical"]')

  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }

  link.setAttribute('href', pageUrl.value)
}

// 更新社交媒体元标签
function updateSocialMetaTags() {
  // 获取页面标题和描述
  const title = document.title
  const description =
    document.querySelector('meta[name="description"]')?.getAttribute('content') || ''

  // 更新Open Graph元标签
  updateMetaTag('property', 'og:url', pageUrl.value)
  updateMetaTag('property', 'og:title', title)
  updateMetaTag('property', 'og:description', description)
  updateMetaTag(
    'property',
    'og:image',
    'https://dreamy-room-level.vercel.app/images/guides_01.webp',
  )

  // 更新Twitter元标签
  updateMetaTag('property', 'twitter:url', pageUrl.value)
  updateMetaTag('property', 'twitter:title', title)
  updateMetaTag('property', 'twitter:description', description)
  updateMetaTag(
    'property',
    'twitter:image',
    'https://dreamy-room-level.vercel.app/images/guides_01.webp',
  )
}

// 辅助函数：更新或创建元标签
function updateMetaTag(attrName, attrValue, content) {
  let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`)

  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attrName, attrValue)
    document.head.appendChild(meta)
  }

  meta.setAttribute('content', content)
}
</script>

<style>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  padding-top: 80px; /* 为固定的header留出空间 */
}

/* 全局基础样式 */
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', 'Microsoft YaHei', Arial, sans-serif;
  color: #6a4c93;
  background-color: #faf5ff;
  line-height: 1.6;
}

a {
  text-decoration: none;
  color: inherit;
}

img {
  max-width: 100%;
  height: auto;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 标题样式 */
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 700;
  line-height: 1.3;
}

h1 {
  font-size: 2.5rem;
}

h2 {
  font-size: 2rem;
}

h3 {
  font-size: 1.5rem;
}

h4 {
  font-size: 1.25rem;
}

h5 {
  font-size: 1.125rem;
}

h6 {
  font-size: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.25rem;
  }
}
</style>
