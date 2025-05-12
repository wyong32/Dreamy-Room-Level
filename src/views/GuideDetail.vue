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
        <p class="guide-subtitle">{{ guide.pageSubtitle }}</p>
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
    }
  },
  created() {
    // 从URL中获取ID
    const pathParts = window.location.pathname.split('/')

    // 检查URL格式
    if (pathParts.length >= 2) {
      // 最后一部分应该是ID
      const lastPart = pathParts[pathParts.length - 1]

      if (lastPart && lastPart.startsWith('game-level-')) {
        this.idFromUrl = lastPart

        // 检查是否是中文路径 (如 /zh/game-level-1)
        if (pathParts.length >= 3 && pathParts[1] === 'zh') {
          i18n.global.locale.value = 'zh'
        }
      }
    }

    this.loadGuideData()
  },
  methods: {
    loadGuideData() {
      // 使用从URL中获取的ID或者路由参数中的ID
      const guideId = this.idFromUrl || this.id

      // 获取当前语言
      const currentLocale = this.i18nLocale

      if (currentLocale === 'zh') {
        // 如果是中文，在中文数组中查找对应的指南
        const guide = guidesZhData.find((g) => g.id === guideId)
        if (guide) {
          this.guide = guide
        } else {
          // 如果没有中文数据，尝试使用英文数据
          const guide = guidesData.find((g) => g.id === guideId)
          if (guide) {
            this.guide = guide
          } else {
            // 处理找不到指南的情况
            console.error(`Guide with ID ${guideId} not found`)
            // 重定向到指南页面
            this.$router.push(`/${currentLocale}/guides`)
          }
        }
      } else {
        // 英文版本
        const guide = guidesData.find((g) => g.id === guideId)
        if (guide) {
          this.guide = guide
        } else {
          // 处理找不到指南的情况
          console.error(`Guide with ID ${guideId} not found`)
          // 重定向到指南页面
          this.$router.push('/guides')
        }
      }
    },
    navigateToGuide(guide) {
      // 获取当前语言
      const currentLocale = this.i18nLocale

      // 使用更直接的方式进行导航
      if (currentLocale === 'en') {
        // 英文路由
        const path = `/${guide.id}`
        // 使用window.location.href进行导航
        window.location.href = path
      } else {
        // 非英文路由
        const path = `/${currentLocale}/${guide.id}`
        // 使用window.location.href进行导航
        window.location.href = path
      }
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
  margin-bottom: 1rem;
  font-size: 2.2rem;
  font-weight: 600;
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

.guide-details h2 {
  color: #333;
  margin: 2rem 0 1.5rem;
  font-size: 1.8rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.8rem;
  font-weight: 600;
}

.guide-details h3 {
  color: #333;
  margin: 2.5rem 0 1rem;
  font-size: 1.4rem;
  position: relative;
  font-weight: 600;
}

/* 步骤标题特殊样式 */
.guide-details h3[id^='step-'],
.guide-details h3:nth-of-type(-n + 12):not([id]) {
  background-color: #f8f9fa;
  border-left: 4px solid #6a4c93;
  border-radius: 0;
  padding: 0.8rem 1rem 0.8rem 1rem;
  margin: 2rem 0 1.2rem;
  font-weight: 600;
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
  }

  .guide-header {
    margin-bottom: 1.5rem;
  }

  .guide-header h1 {
    font-size: 1.8rem;
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
    font-size: 1.6rem;
    margin: 1.8rem 0 1rem;
  }

  .guide-details h3 {
    font-size: 1.3rem;
    margin: 1.8rem 0 0.8rem;
  }

  /* 步骤标题特殊样式 - 移动端 */
  .guide-details h3[id^='step-'],
  .guide-details h3:nth-of-type(-n + 12):not([id]) {
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
    font-size: 1.6rem;
  }

  .guide-subtitle {
    font-size: 0.95rem;
  }

  .main-content {
    padding: 1.5rem;
  }

  .guide-details {
    font-size: 0.95rem;
  }

  .guide-details h2 {
    font-size: 1.4rem;
  }

  .guide-details h3 {
    font-size: 1.2rem;
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
