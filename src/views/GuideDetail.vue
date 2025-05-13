<template>
  <div class="guide-detail">
    <!-- SEO Head with custom values from guide data -->
    <SeoHead
      v-if="guide && guide.seo"
      pageType="guides"
      :customTitle="guide.seo.title"
      :customDescription="guide.seo.description"
      :customKeywords="guide.seo.keywords"
    />
    <div class="container">
      <div class="guide-header">
        <h1>{{ guide.pageTitle }}</h1>
      </div>

      <div class="guide-content">
        <div class="main-content">
          <div v-if="guide.iframeUrl" class="guide-video">
            <iframe
              :src="guide.iframeUrl"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <div class="guide-details" v-html="guide.detailsHtml"></div>
        </div>

        <aside class="guide-sidebar">
          <div class="sidebar-image">
            <img :src="guide.sidebarData.sidebarImageUrl" :alt="guide.pageTitle" />
          </div>
          <div class="level-info" v-html="guide.sidebarData.levelInfoHtml"></div>

          <div v-if="guide.sidebarData.featuredGuides" class="featured-guides">
            <h3>{{ t('guides.relatedGuides') }}</h3>
            <div class="featured-guides-list">
              <div
                v-for="featuredGuide in guide.sidebarData.featuredGuides"
                :key="featuredGuide.id"
                class="featured-guide"
                @click="navigateToGuide(featuredGuide)"
              >
                <div class="featured-guide-image">
                  <img
                    :src="featuredGuide.imageUrl"
                    :alt="featuredGuide.imageAlt || featuredGuide.title"
                  />
                </div>
                <h4 v-html="featuredGuide.title"></h4>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script>
import guidesData from '@/datas/guides/index.js'
import guidesZhData from '@/datas/guides-zh/index.js'
import SeoHead from '@/components/SeoHead.vue'
import { useI18n } from 'vue-i18n'
import i18n from '@/i18n'
import { useHead } from '@vueuse/head'

export default {
  name: 'GuideDetail',
  components: {
    SeoHead,
  },
  props: {
    id: {
      type: String,
      default: null, // 改为默认值为null，因为可能从URL中获取
    },
    locale: {
      type: String,
      default: null,
    },
  },
  setup() {
    const { t, locale } = useI18n()

    return {
      t,
      i18nLocale: locale,
    }
  },
  data() {
    return {
      guide: null,
      idFromUrl: null,
      pathFromUrl: null,
    }
  },
  created() {
    // 从URL中获取ID或路径
    const pathParts = window.location.pathname.split('/')

    // 检查URL格式
    if (pathParts.length >= 2) {
      // 最后一部分应该是ID或路径的最后部分
      const lastPart = pathParts[pathParts.length - 1]

      // 检查是否是game-level-X格式
      if (lastPart && lastPart.startsWith('game-level-')) {
        this.idFromUrl = lastPart
      }
      // 检查是否是dreamy-room-level-X格式
      else if (lastPart && lastPart.startsWith('dreamy-room-level-')) {
        this.pathFromUrl = `/dreamy-room-level-${lastPart.split('dreamy-room-level-')[1]}`
      }

      // 检查是否是中文路径 (如 /zh/game-level-1 或 /zh/dreamy-room-level-1)
      if (pathParts.length >= 3 && pathParts[1] === 'zh') {
        i18n.global.locale.value = 'zh'
      }
    }

    this.loadGuideData()
  },
  methods: {
    loadGuideData() {
      // 获取当前语言
      const currentLocale = this.i18nLocale

      // 定义查找指南的函数
      const findGuideById = (data, id) => data.find((g) => g.id === id)
      const findGuideByPath = (data, path) =>
        data.find((g) => g.detailsRoute && g.detailsRoute.path === path)

      // 尝试使用不同的方法查找指南
      let guide = null

      // 1. 如果有pathFromUrl，尝试使用path查找
      if (this.pathFromUrl) {
        console.log('Searching by path:', this.pathFromUrl)
        if (currentLocale === 'zh') {
          guide = findGuideByPath(guidesZhData, this.pathFromUrl)
          if (!guide) {
            guide = findGuideByPath(guidesData, this.pathFromUrl)
          }
        } else {
          guide = findGuideByPath(guidesData, this.pathFromUrl)
        }
      }

      // 2. 如果没有找到，尝试使用ID查找
      if (!guide && (this.idFromUrl || this.id)) {
        const guideId = this.idFromUrl || this.id
        console.log('Searching by ID:', guideId)
        if (currentLocale === 'zh') {
          guide = findGuideById(guidesZhData, guideId)
          if (!guide) {
            guide = findGuideById(guidesData, guideId)
          }
        } else {
          guide = findGuideById(guidesData, guideId)
        }
      }

      // 如果找到了指南，设置guide
      if (guide) {
        this.guide = guide
        this.injectJsonLd(guide)
      } else {
        // 处理找不到指南的情况
        console.error('Guide not found')
        // 重定向到指南页面
        if (currentLocale === 'en') {
          this.$router.push('/dreamy-room-revel-game-guides')
        } else {
          this.$router.push(`/${currentLocale}/dreamy-room-revel-game-guides`)
        }
      }
    },
    navigateToGuide(guide) {
      // 获取当前语言
      const currentLocale = this.i18nLocale

      // 确保 guide.detailsRoute.path 存在
      if (!guide.detailsRoute || !guide.detailsRoute.path) {
        console.error('Guide detailsRoute.path is undefined or null')
        return
      }

      // 使用更直接的方式进行导航
      if (currentLocale === 'en') {
        // 英文路由
        const path = guide.detailsRoute.path
        // 使用window.location.href进行导航
        window.location.href = path
      } else {
        // 非英文路由
        const path = `/${currentLocale}${guide.detailsRoute.path}`
        // 使用window.location.href进行导航
        window.location.href = path
      }
    },
    injectJsonLd(guide) {
      const url = typeof window !== 'undefined' ? window.location.href : ''
      useHead({
        script: [
          {
            type: 'application/ld+json',
            children: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: guide.pageTitle,
              description: guide.seo?.description || '',
              image: guide.imageUrl || '',
              author: {
                '@type': 'Person',
                name: 'Dreamy Room Team',
              },
              datePublished: guide.publishDate,
              uploadDate: guide.publishDate,
              mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': url,
              },
            }),
          },
        ],
      })
    },
  },
  watch: {
    // Watch for changes in the ID prop (in case user navigates between guides)
    id() {
      this.loadGuideData()
    },
    // 监听语言变化，使用更直接的方法
    '$root.$i18n.locale'() {
      this.loadGuideData()
    },
    // 不再需要手动更新SEO信息，使用SeoHead组件代替
  },
}
</script>

<style>
.guide-detail {
  padding: 5rem 0 2rem 0; /* 增加顶部间距从2rem到5rem */
  background-color: #f8f9fa;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.guide-header {
  text-align: left;
  margin-bottom: 2.5rem;
}

.guide-header h1 {
  color: #333;
  margin: 2rem 0 1.5rem;
  font-size: 2.2rem;
  border-bottom: 2px solid #6a4c93;
  padding-bottom: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.01em;
  text-align: center;
}

.guide-subtitle {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
}

.guide-content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2.5rem;
}

.main-content {
  background: white;
  border-radius: 8px;
  padding: 2.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.guide-video {
  margin-bottom: 2rem;
  position: relative;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  height: 0;
  overflow: hidden;
}

.guide-video iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 6px;
}

.guide-details {
  line-height: 1.8;
  color: #333;
  font-size: 1.05rem;
}
/* 
.guide-details h2 {
  color: #333;
  margin: 2rem 0 1.5rem;
  font-size: 1.8rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.8rem;
  font-weight: 600;
} */

.guide-details h2 {
  color: #4b3869;
  margin: 2rem 0 1.2rem;
  font-size: 1.45rem;
  font-weight: 600;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 0.4rem;
  background: none;
  border-radius: 0;
  letter-spacing: 0.01em;
}

/* 步骤标题特殊样式 */
.guide-details h2[id^='step-'],
.guide-details h2:nth-of-type(-n + 12):not([id]) {
  background-color: #f8f9fa;
  border-left: 4px solid #6a4c93;
  border-radius: 0;
  padding: 0.8rem 1rem 0.8rem 1rem;
  margin: 2rem 0 1.2rem;
  font-weight: 600;
}

.guide-details h3 {
  color: #8e7cc3;
  margin: 1.2rem 0 0.8rem 0;
  font-size: 1.08rem;
  font-weight: 600;
  background: none;
  border: none;
  border-bottom: 1px dashed #d1c4e9;
  padding: 0 0 0.3rem 0;
  border-radius: 0;
  box-shadow: none;
  letter-spacing: 0.01em;
  transition: color 0.2s;
}
.guide-details h3:hover {
  color: #6a4c93;
  background: none;
}

.guide-details p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
}

.guide-details strong {
  color: #333;
  font-weight: 600;
}

.guide-details ul,
.guide-details ol {
  margin-left: 1rem;
  margin-bottom: 1.8rem;
  padding-left: 1.2rem;
}

.guide-details li {
  margin-bottom: 0.8rem;
  position: relative;
  line-height: 1.7;
}

.guide-details ul {
  list-style-type: disc;
}

.guide-details ul li::marker {
  color: #6a4c93;
}

.guide-details ol {
  list-style-type: decimal;
}

.guide-details ol li {
  padding-left: 0.3rem;
}

/* 图片样式 */
.guide-details img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 1.8rem 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: block;
}

/* 表格样式 */
.guide-details table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.8rem 0;
  overflow: hidden;
}

.guide-details table {
  display: block;
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.guide-details table th {
  background-color: #f8f9fa;
  color: #333;
  font-weight: 600;
  text-align: left;
  padding: 0.8rem;
  border: 1px solid #dee2e6;
  white-space: nowrap;
}

.guide-details table td {
  padding: 0.8rem;
  border: 1px solid #dee2e6;
  vertical-align: top;
}

.guide-details table tr:nth-child(even) {
  background-color: #f8f9fa;
}

.guide-details table tr:hover {
  background-color: #f1f3f5;
}

/* 引用块样式 */
.guide-details blockquote {
  background-color: #f8f9fa;
  border-left: 4px solid #6a4c93;
  padding: 1.2rem 1.5rem;
  margin: 1.8rem 0;
  font-style: italic;
  color: #495057;
}

/* 代码块样式 */
.guide-details code {
  background-color: #f8f9fa;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
  color: #333;
  font-size: 0.9em;
}

.guide-details pre {
  background-color: #f8f9fa;
  padding: 1.2rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1.8rem 0;
  border: 1px solid #dee2e6;
}

.guide-details pre code {
  background-color: transparent;
  padding: 0;
}

.guide-sidebar {
  background: white;
  border-radius: 8px;
  padding: 1.8rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-image {
  margin-bottom: 1.8rem;
}

.sidebar-image img {
  width: 100%;
  border-radius: 4px;
}

.level-info {
  margin-bottom: 2rem;
}

.level-info h3 {
  color: #333;
  margin-bottom: 0.8rem;
  font-weight: 600;
}

.featured-guides h3 {
  color: #333;
  margin-bottom: 1.2rem;
  font-weight: 600;
}

.featured-guides-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

.featured-guide {
  background: #f8f9fa;
  border-radius: 4px;
  overflow: hidden;
  transition: transform 0.3s ease;
  border: 1px solid #dee2e6;
}

.featured-guide:hover {
  transform: translateY(-3px);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

.featured-guide-image img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.featured-guide h4 {
  padding: 0.8rem;
  font-size: 0.95rem;
  color: #333;
  font-weight: 500;
}

@media (max-width: 768px) {
  .guide-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .guide-sidebar {
    order: -1;
    display: none;
  }

  .guide-header {
    margin-bottom: 1.5rem;
  }

  .guide-header h1 {
    font-size: 1.5rem;
    margin: 1.2rem 0 1rem;
    padding-bottom: 0.5rem;
  }

  .guide-subtitle {
    font-size: 1rem;
  }

  .main-content {
    padding: 1.8rem;
  }

  .guide-details {
    font-size: 1rem;
  }

  .guide-details h2 {
    font-size: 1.1rem;
    margin: 1.2rem 0 0.7rem;
    padding-bottom: 0.2rem;
  }

  .guide-details h3 {
    font-size: 0.98rem;
    margin: 0.8rem 0 0.5rem 0;
    padding-bottom: 0.2rem;
  }

  /* 步骤标题特殊样式 - 移动端 */
  .guide-details h2[id^='step-'],
  .guide-details h2:nth-of-type(-n + 12):not([id]) {
    padding: 0.7rem 1rem 0.7rem 1rem;
    margin: 1.8rem 0 1rem;
  }

  /* 移动端表格样式优化 */
  .guide-details table {
    font-size: 0.9rem;
  }

  .guide-details table th,
  .guide-details table td {
    padding: 0.7rem;
  }

  /* 移动端图片样式优化 */
  .guide-details img {
    margin: 1.5rem auto;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1.2rem;
  }

  .guide-header h1 {
    font-size: 1.18rem;
    margin: 0.8rem 0 0.7rem;
    padding-bottom: 0.3rem;
  }

  .guide-subtitle {
    font-size: 0.95rem;
  }

  .main-content {
    padding: 1.5rem 0;
  }

  .guide-details {
    font-size: 0.95rem;
  }

  .guide-details h2 {
    font-size: 0.98rem;
    margin: 0.7rem 0 0.4rem;
    padding-bottom: 0.1rem;
  }

  .guide-details h3 {
    font-size: 0.89rem;
    margin: 0.5rem 0 0.3rem 0;
    padding-bottom: 0.1rem;
  }

  .guide-details ul,
  .guide-details ol {
    margin-left: 0.5rem;
    padding-left: 0.5rem;
  }

  .guide-details blockquote {
    padding: 0.8rem 1rem;
  }
}

/* 动画效果 */
.guide-details h2,
.guide-details h3,
.guide-details p,
.guide-details ul,
.guide-details ol,
.guide-details table,
.guide-details blockquote,
.guide-details img {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
