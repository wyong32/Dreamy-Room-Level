<template>
  <div class="blog-detail">
    <!-- SEO Head with custom values from blog data -->
    <SeoHead
      v-if="blog && blog.seo"
      pageType="blog"
      :customTitle="blog.seo.title"
      :customDescription="blog.seo.description"
      :customKeywords="blog.seo.keywords"
    />
    <div class="container">
      <div class="blog-header">
        <h1>{{ blog.pageTitle }}</h1>
        <div class="blog-meta">
          <span class="blog-date">{{ formatDate(blog.publishDate) }}</span>
        </div>
      </div>

      <div class="blog-content">
        <div class="main-content">
          <div class="blog-details" v-html="blog.detailsHtml"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blogsData from '@/datas/blogs.js'
import blogsZhData from '@/datas/blogs-zh.js'
import SeoHead from '@/components/SeoHead.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'BlogDetail',
  components: {
    SeoHead,
  },
  props: {
    id: {
      type: String,
      default: null, // 默认值为null，因为可能从URL中获取
    },
    locale: {
      type: String,
      default: null,
    },
  },
  setup() {
    const { t } = useI18n()

    return {
      t,
    }
  },
  data() {
    return {
      blog: null,
      idFromUrl: null,
      pathFromUrl: null,
    }
  },
  created() {
    // 从URL中获取ID或路径
    const pathParts = window.location.pathname.split('/')
    const lastPart = pathParts[pathParts.length - 1]

    // 检查是否是博客ID格式（blog-xxx）
    if (lastPart && lastPart.startsWith('blog-')) {
      // 可能是ID格式或完整路径格式
      this.idFromUrl = lastPart.replace('blog-', '')
      this.pathFromUrl = `/blog-${this.idFromUrl}`
    }

    this.loadBlogData()
  },
  methods: {
    loadBlogData() {
      // 获取当前语言
      const { locale } = useI18n()
      const currentLocale = locale.value

      // 定义查找博客的函数
      const findBlogById = (data, id) => data.find((b) => b.id === id)
      const findBlogByPath = (data, path) =>
        data.find((b) => b.detailsRoute && b.detailsRoute.path === path)

      // 尝试使用不同的方法查找博客
      let blog = null

      // 1. 如果有pathFromUrl，尝试使用path查找
      if (this.pathFromUrl) {
        console.log('Searching blog by path:', this.pathFromUrl)
        if (currentLocale === 'zh') {
          // 尝试在中文数据中查找
          const zhBlogs = Array.isArray(blogsZhData) ? blogsZhData : Object.values(blogsZhData)
          blog = findBlogByPath(zhBlogs, this.pathFromUrl)
          if (!blog) {
            // 如果在中文数据中找不到，尝试在英文数据中查找
            blog = findBlogByPath(blogsData, this.pathFromUrl)
          }
        } else {
          // 在英文数据中查找
          blog = findBlogByPath(blogsData, this.pathFromUrl)
        }
      }

      // 2. 如果没有找到，尝试使用ID查找
      if (!blog && (this.idFromUrl || this.id)) {
        const blogId = this.idFromUrl || this.id
        console.log('Searching blog by ID:', blogId)
        if (currentLocale === 'zh') {
          // 尝试在中文数据中查找
          const zhBlogs = Array.isArray(blogsZhData) ? blogsZhData : Object.values(blogsZhData)
          blog = findBlogById(zhBlogs, blogId)
          if (!blog && blogsZhData[blogId]) {
            // 如果是对象格式，直接使用键值查找
            blog = blogsZhData[blogId]
          }
          if (!blog) {
            // 如果在中文数据中找不到，尝试在英文数据中查找
            blog = findBlogById(blogsData, blogId)
          }
        } else {
          // 在英文数据中查找
          blog = findBlogById(blogsData, blogId)
        }
      }

      // 如果找到了博客，设置blog
      if (blog) {
        this.blog = blog
      } else {
        // 处理找不到博客的情况
        console.error('Blog not found')
        // 重定向到博客页面
        if (currentLocale === 'en') {
          this.$router.push('/blog')
        } else {
          this.$router.push(`/${currentLocale}/blog`)
        }
      }
    },
    navigateToBlog(blog) {
      // 获取当前语言
      const { locale } = useI18n()
      const currentLocale = locale.value

      // 确保 blog.detailsRoute.path 存在
      if (!blog.detailsRoute || !blog.detailsRoute.path) {
        console.error('Blog detailsRoute.path is undefined or null')
        return
      }

      // 使用更直接的方式进行导航
      if (currentLocale === 'en') {
        // 英文路由
        const path = blog.detailsRoute.path
        // 使用window.location.href进行导航
        window.location.href = path
      } else {
        // 非英文路由
        const path = `/${currentLocale}${blog.detailsRoute.path}`
        // 使用window.location.href进行导航
        window.location.href = path
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    },
  },
  watch: {
    // 监听ID属性变化（以防用户在博客之间导航）
    id() {
      this.loadBlogData()
    },
    // 监听语言变化，使用更直接的方法
    '$root.$i18n.locale'() {
      this.loadBlogData()
    },
  },
}
</script>

<style scoped>
.blog-detail {
  padding: 5rem 0 2rem 0; /* 增加顶部间距从2rem到5rem */
  background-color: #f9f7fe;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.blog-header {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-header h1 {
  color: #6a4c93;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.blog-meta {
  display: flex;
  justify-content: center;
  color: #9370db;
  font-size: 0.9rem;
  margin-bottom: 2rem;
}

.blog-content {
  display: block;
  max-width: 800px;
  margin: 0 auto;
}

.main-content {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.blog-details {
  line-height: 1.8;
}

.blog-details h2 {
  color: #6a4c93;
  margin-bottom: 1.5rem;
  font-size: 2rem;
}

.blog-details h3 {
  color: #6a4c93;
  margin: 2rem 0 1rem;
  font-size: 1.5rem;
}

.blog-details p {
  margin-bottom: 1.5rem;
}

.blog-details ul,
.blog-details ol {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

.blog-details li {
  margin-bottom: 0.8rem;
}

@media (max-width: 992px) {
  .blog-detail {
    padding: 1.5rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .blog-header {
    margin-bottom: 2rem;
  }

  .blog-header h1 {
    font-size: 2.2rem;
  }

  .blog-meta {
    margin-bottom: 1.5rem;
  }

  .main-content {
    padding: 1.8rem;
  }

  .blog-details h2 {
    font-size: 1.8rem;
    margin-bottom: 1.2rem;
  }

  .blog-details h3 {
    font-size: 1.4rem;
    margin: 1.8rem 0 0.8rem;
  }
}

@media (max-width: 768px) {
  .blog-detail {
    padding: 1.2rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .blog-header {
    margin-bottom: 1.5rem;
  }

  .blog-header h1 {
    font-size: 1.8rem;
    margin-bottom: 0.3rem;
  }

  .blog-meta {
    font-size: 0.8rem;
    margin-bottom: 1.2rem;
  }

  .main-content {
    padding: 1.5rem;
    border-radius: 10px;
  }

  .blog-details h2 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  .blog-details h3 {
    font-size: 1.3rem;
    margin: 1.5rem 0 0.7rem;
  }

  .blog-details p {
    margin-bottom: 1.2rem;
    font-size: 0.95rem;
  }

  .blog-details ul,
  .blog-details ol {
    margin-left: 1.2rem;
    margin-bottom: 1.2rem;
  }

  .blog-details li {
    margin-bottom: 0.6rem;
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .blog-detail {
    padding: 1rem 0;
  }

  .container {
    padding: 0 0.8rem;
  }

  .blog-header h1 {
    font-size: 1.6rem;
  }

  .blog-meta {
    font-size: 0.75rem;
  }

  .main-content {
    padding: 1.2rem;
  }

  .blog-details h2 {
    font-size: 1.4rem;
  }

  .blog-details h3 {
    font-size: 1.2rem;
  }

  .blog-details p,
  .blog-details li {
    font-size: 0.9rem;
  }
}
</style>
