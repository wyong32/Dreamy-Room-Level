<template>
  <!-- This component doesn't render anything visible -->
  <div style="display: none"></div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { computed, watch } from 'vue'

export default {
  name: 'SeoHead',
  props: {
    // 页面类型: home, guides, blog, download
    pageType: {
      type: String,
      required: true,
    },
    // 自定义标题（可选）
    customTitle: {
      type: String,
      default: null,
    },
    // 自定义描述（可选）
    customDescription: {
      type: String,
      default: null,
    },
    // 自定义关键词（可选）
    customKeywords: {
      type: String,
      default: null,
    },
    // 自定义图片（可选）
    customImage: {
      type: String,
      default: null,
    },
    // 页面类型（用于Open Graph）
    ogType: {
      type: String,
      default: 'website',
    },
  },
  setup(props) {
    const { t, locale } = useI18n()

    // 计算SEO信息
    const seoInfo = computed(() => {
      // 使用正确的方式获取翻译
      let pageSeoTitle, pageSeoDescription, pageSeoKeywords
      let siteName, separator

      // 根据页面类型获取对应的SEO信息
      if (props.pageType === 'home') {
        pageSeoTitle = t('seo.home.title')
        pageSeoDescription = t('seo.home.description')
        pageSeoKeywords = t('seo.home.keywords')
      } else if (props.pageType === 'guides') {
        pageSeoTitle = t('seo.guides.title')
        pageSeoDescription = t('seo.guides.description')
        pageSeoKeywords = t('seo.guides.keywords')
      } else if (props.pageType === 'blog') {
        pageSeoTitle = t('seo.blog.title')
        pageSeoDescription = t('seo.blog.description')
        pageSeoKeywords = t('seo.blog.keywords')
      } else if (props.pageType === 'download') {
        pageSeoTitle = t('seo.download.title')
        pageSeoDescription = t('seo.download.description')
        pageSeoKeywords = t('seo.download.keywords')
      }

      // 获取全局SEO信息
      siteName = t('seo.global.siteName')
      separator = t('seo.global.separator')

      return {
        title: props.customTitle || pageSeoTitle,
        description: props.customDescription || pageSeoDescription,
        keywords: props.customKeywords || pageSeoKeywords,
        siteName: siteName,
        separator: separator,
      }
    })

    // 更新页面TDK
    const updatePageTDK = () => {
      // 设置页面标题
      document.title = seoInfo.value.title

      // 设置meta描述
      let metaDescription = document.querySelector('meta[name="description"]')
      if (!metaDescription) {
        metaDescription = document.createElement('meta')
        metaDescription.setAttribute('name', 'description')
        document.head.appendChild(metaDescription)
      }
      metaDescription.setAttribute('content', seoInfo.value.description)

      // 设置meta关键词
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        document.head.appendChild(metaKeywords)
      }
      metaKeywords.setAttribute('content', seoInfo.value.keywords)

      // 更新Open Graph标签
      updateMetaTag('og:title', seoInfo.value.title)
      updateMetaTag('og:description', seoInfo.value.description)
      updateMetaTag('og:type', props.ogType)
      updateMetaTag('og:image', props.customImage || '/images/logo.webp')
      updateMetaTag('og:site_name', seoInfo.value.siteName)
      updateMetaTag('og:locale', locale.value === 'zh' ? 'zh_CN' : 'en_US')

      // 更新Twitter Card标签
      updateMetaTag('twitter:card', 'summary_large_image')
      updateMetaTag('twitter:title', seoInfo.value.title)
      updateMetaTag('twitter:description', seoInfo.value.description)
      updateMetaTag('twitter:image', props.customImage || '/images/logo.webp')
    }

    // 辅助函数：更新meta标签
    const updateMetaTag = (property, content) => {
      let meta =
        document.querySelector(`meta[property="${property}"]`) ||
        document.querySelector(`meta[name="${property}"]`)

      if (!meta) {
        meta = document.createElement('meta')
        if (property.startsWith('og:') || property.startsWith('twitter:')) {
          meta.setAttribute('property', property)
        } else {
          meta.setAttribute('name', property)
        }
        document.head.appendChild(meta)
      }

      meta.setAttribute('content', content)
    }

    // 监听SEO信息变化
    watch(
      seoInfo,
      () => {
        updatePageTDK()
      },
      { immediate: true }
    )

    // 监听语言变化
    watch(locale, () => {
      updatePageTDK()
    })

    return {}
  },
}
</script>
