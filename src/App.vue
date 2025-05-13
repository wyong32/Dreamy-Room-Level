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
import { useI18n } from 'vue-i18n'
import { useHead } from '@vueuse/head'

// 获取当前路由
const route = useRoute()
const { t, locale } = useI18n()

// 将 baseUrl 定义提升到 setup 顶层
const baseUrl = import.meta.env.VITE_SITE_URL || '/'

// pageUrl 现在可以直接使用顶层的 baseUrl
const pageUrl = computed(() => {
  return `${baseUrl}${route.path}`
})

// useHead 也可以直接使用顶层的 baseUrl
useHead({
  htmlAttrs: {
    lang: locale,
  },
  // Canonical URL (现在统一由SeoHead处理或页面单独处理，这里不再硬编码)
  // link: [
  //   {
  //     rel: 'canonical',
  //     href: computed(() => `${baseUrl}${route.path}`)
  //   }
  // ],
  meta: [
    // General SEO
    {
      name: 'robots',
      content: 'index, follow',
    },
    // Open Graph
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:site_name',
      content: computed(() => t('seo.global.siteName')),
    },
    {
      property: 'og:locale',
      content: computed(() => (locale.value === 'zh' ? 'zh_CN' : 'en_US')),
    },
    {
      property: 'og:image',
      // 使用顶层 baseUrl
      content: computed(() => `${baseUrl}images/guides_01.webp`),
    },
    {
      property: 'og:image:alt',
      content: computed(() => t('seo.global.siteName')),
    },
    // Twitter Card
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:image',
      // 使用顶层 baseUrl
      content: computed(() => `${baseUrl}images/guides_01.webp`),
    },
    {
      name: 'twitter:image:alt',
      content: computed(() => t('seo.global.siteName')),
    },
  ],
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
  { immediate: true }
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
  // 直接传递 baseUrl 构建的字符串
  updateMetaTag('property', 'og:image', `${baseUrl}images/guides_01.webp`)

  // 更新Twitter元标签
  updateMetaTag('property', 'twitter:url', pageUrl.value)
  updateMetaTag('property', 'twitter:title', title)
  updateMetaTag('property', 'twitter:description', description)
  // 直接传递 baseUrl 构建的字符串
  updateMetaTag('property', 'twitter:image', `${baseUrl}images/guides_01.webp`)
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
</style>
