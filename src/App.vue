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

// 计算用于图片的绝对基础URL (通常是站点根源)
const siteUrlString = import.meta.env.VITE_SITE_URL
let absoluteImageBaseUrl
if (
  siteUrlString &&
  (siteUrlString.startsWith('http://') || siteUrlString.startsWith('https://'))
) {
  try {
    const urlObject = new URL(siteUrlString)
    absoluteImageBaseUrl = urlObject.origin // 例如 "https://www.dreamyroom.co"
  } catch (e) {
    console.error('无法从 VITE_SITE_URL 解析 origin:', siteUrlString, e)
    absoluteImageBaseUrl = '/' // 解析失败则回退到根路径
  }
} else {
  // 如果 VITE_SITE_URL 未设置，或者是相对路径 (如 /subpath/ 或 /)，则图片也从根路径引用
  absoluteImageBaseUrl = '/'
}

// 辅助函数：智能拼接URL路径
function smartJoin(base, ...parts) {
  let result = base
  for (const part of parts) {
    const baseEndsWithSlash = result.endsWith('/')
    const partStartsWithSlash = part.startsWith('/')

    if (baseEndsWithSlash && partStartsWithSlash) {
      result += part.substring(1)
    } else if (!baseEndsWithSlash && !partStartsWithSlash) {
      // 确保在 baseUrl 不是 '/' 或者 part 不是以 '/' 开头时才添加斜杠
      // 同时处理 part 为空字符串的情况
      if (part) {
        // 只有当 part 非空时才添加斜杠和 part
        result += '/' + part
      } else if (!baseEndsWithSlash && result !== '/') {
        // 如果 part 为空，且 base 不是 / 且不以 / 结尾，则给 base 补上 /
        // 这主要针对类似 site.com + "" 的情况，应变为 site.com/
        // 但如果 base 本身就是 "/"，则不需要再加，避免 "//"
      }
    } else {
      result += part
    }
  }
  // 如果 VITE_SITE_URL 存在且结果只是域名 (不含路径)，确保末尾有斜杠
  if (
    import.meta.env.VITE_SITE_URL &&
    result === import.meta.env.VITE_SITE_URL &&
    !result.endsWith('/')
  ) {
    result += '/'
  }
  return result
}

// pageUrl 现在可以使用 smartJoin
const pageUrl = computed(() => {
  // route.path 总是以 '/' 开头， smartJoin 会处理好
  return smartJoin(baseUrl, route.path)
})

// useHead 也可以直接使用顶层的 baseUrl，并通过 smartJoin 处理路径
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
      // 使用 smartJoin 和 absoluteImageBaseUrl 构造 URL
      content: computed(() => smartJoin(absoluteImageBaseUrl, 'images/guides_01.webp')),
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
      // 使用 smartJoin 和 absoluteImageBaseUrl 构造 URL
      content: computed(() => smartJoin(absoluteImageBaseUrl, 'images/guides_01.webp')),
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
  // 直接传递 baseUrl 构建的字符串，使用 smartJoin 和 absoluteImageBaseUrl
  updateMetaTag('property', 'og:image', smartJoin(absoluteImageBaseUrl, 'images/guides_01.webp'))

  // 更新Twitter元标签
  updateMetaTag('property', 'twitter:url', pageUrl.value)
  updateMetaTag('property', 'twitter:title', title)
  updateMetaTag('property', 'twitter:description', description)
  // 直接传递 baseUrl 构建的字符串，使用 smartJoin 和 absoluteImageBaseUrl
  updateMetaTag(
    'property',
    'twitter:image',
    smartJoin(absoluteImageBaseUrl, 'images/guides_01.webp')
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
</style>
