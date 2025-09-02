<template>
  <div class="blog-view">
    <!-- SEO Head -->
    <SeoHead pageType="blog" />
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">
          <span class="title-icon">
            <svg
              t="1756798324104"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="182065"
              width="200"
              height="200"
            >
              <path
                d="M957.705625 384.093127h-57.574278a71.293815 71.293815 0 0 1-68.256406-64.161021A320.805106 320.805106 0 0 0 501.240913 0.150847H332.749977A331.316592 331.316592 0 0 0 0 330.853131v362.441513A331.316592 331.316592 0 0 0 332.749977 1023.996928h358.346128A331.316592 331.316592 0 0 0 1023.846082 693.294644v-234.460753a74.228841 74.228841 0 0 0-66.140457-74.740764zM319.951901 256.112367H511.923041a63.99038 63.99038 0 1 1 0 127.98076H319.951901A64.297534 64.297534 0 0 1 255.96152 319.932106 65.457893 65.457893 0 0 1 319.951901 256.112367z m383.94228 511.923041H319.951901A62.830021 62.830021 0 0 1 255.96152 703.874387a64.024508 64.024508 0 0 1 63.990381-63.819739h383.94228a64.024508 64.024508 0 0 1 63.99038 63.819739 62.830021 62.830021 0 0 1-63.99038 64.161021z"
                fill="#3aba96"
                p-id="182066"
              ></path>
            </svg>
          </span>
          {{ $t('blog.title') }}
        </h1>
        <h2 class="page-description">{{ $t('blog.description') }}</h2>
      </div>

      <div v-if="blogPosts.length > 0" class="blog-posts">
        <article
          class="blog-post"
          v-for="post in blogPosts"
          :key="post.id"
          @click="navigateToBlog(post)"
        >
          <div class="post-image">
            <img :src="post.imageUrl" :alt="post.imageAlt" />
          </div>
          <div class="post-content">
            <h2 class="post-title">{{ post.title }}</h2>
            <div class="post-meta">
              <span class="post-date">{{ post.date }}</span>
            </div>
            <p class="post-excerpt">{{ post.content }}</p>
            <router-link :to="post.detailsRoute" class="read-more">{{
              $t('blog.readMore')
            }}</router-link>
          </div>
        </article>
      </div>
      <div v-else class="no-content-container">
        <p>{{ $t('blog.noBlogsFound') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import SeoHead from '@/components/SeoHead.vue'
import { useI18n } from 'vue-i18n'
import blogsData from '@/datas/blogs.js'
import blogsZhData from '@/datas/blogs-zh.js'

export default {
  name: 'BlogView',
  components: {
    SeoHead,
  },
  setup() {
    const { t, locale } = useI18n()
    return { t, locale }
  },
  data() {
    return {
      blogPosts: [],
    }
  },
  created() {
    this.loadBlogPosts()
  },
  methods: {
    loadBlogPosts() {
      // 根据当前语言加载博客数据
      if (this.locale === 'zh') {
        // 中文博客数据
        this.blogPosts = Object.values(blogsZhData).map((blog) => ({
          id: blog.id || Object.keys(blogsZhData).find((key) => blogsZhData[key] === blog),
          title: blog.pageTitle,
          date: this.formatDate(blog.publishDate),
          content: blog.listContent,
          imageUrl: blog.listImageUrl,
          imageAlt: blog.listImageAlt || blog.pageTitle, // 使用alt属性，如果没有则使用标题
          detailsRoute: blog.detailsRoute,
        }))
      } else {
        // 英文博客数据
        this.blogPosts = blogsData.map((blog) => ({
          id: blog.id,
          title: blog.pageTitle,
          date: this.formatDate(blog.publishDate),
          content: blog.listContent,
          imageUrl: blog.listImageUrl,
          imageAlt: blog.listImageAlt || blog.pageTitle, // 使用alt属性，如果没有则使用标题
          detailsRoute: blog.detailsRoute,
        }))
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      // Explicitly use 'en-US' locale for English format
      return new Date(dateString).toLocaleDateString('en-US', options)
    },
    navigateToBlog(blog) {
      // 确保 blog.detailsRoute.path 存在
      if (!blog.detailsRoute || !blog.detailsRoute.path) {
        console.error('Blog detailsRoute.path is undefined or null')
        return
      }

      // 使用 blog.detailsRoute.path 进行导航
      this.$router.push(blog.detailsRoute.path)
    },
  },
  watch: {
    // 监听语言变化，重新加载博客数据
    locale() {
      this.loadBlogPosts()
    },
  },
}
</script>

<style scoped>
.blog-view {
  padding: 2rem 0;
  padding-top: 100px; /* 增加顶部内边距，避免被头部导航栏遮挡 */
  background-color: #f9f7fe;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  color: #6a4c93;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 0.5rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.page-description {
  color: #8a8a8a;
  font-size: 1.1rem;
}

.blog-posts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.blog-post {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  display: grid;
  grid-template-columns: 1fr 2fr;
  transition: transform 0.3s ease;
}

.blog-post:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(106, 76, 147, 0.15);
}

.post-image {
  height: 100%;
  height: 250px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.post-content {
  padding: 2rem;
}

.post-title {
  color: #6a4c93;
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.post-meta {
  display: flex;
  gap: 1rem;
  color: #8a8a8a;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.post-excerpt {
  color: #555;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.read-more {
  display: inline-block;
  color: #6a4c93;
  font-weight: bold;
  text-decoration: none;
  position: relative;
}

.read-more::after {
  content: '→';
  margin-left: 5px;
  transition: transform 0.3s ease;
}

.read-more:hover::after {
  transform: translateX(5px);
}

@media (max-width: 992px) {
  .blog-container {
    padding: 2rem 1.5rem;
  }

  .blog-header {
    margin-bottom: 2rem;
  }

  .blog-title {
    font-size: 2rem;
  }

  .blog-description {
    font-size: 1rem;
  }

  .blog-posts {
    gap: 2rem;
  }

  .blog-post {
    gap: 1.5rem;
  }

  .post-content {
    padding: 1.2rem;
  }

  .post-title {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }
}

@media (max-width: 768px) {
  .blog-container {
    padding: 1.5rem 1rem;
  }

  .blog-header {
    margin-bottom: 1.5rem;
  }

  .blog-title {
    font-size: 1.8rem;
  }

  .blog-description {
    font-size: 0.9rem;
  }

  .blog-posts {
    gap: 1.5rem;
  }

  .blog-post {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .post-image {
    height: 200px;
  }

  .post-content {
    padding: 1rem;
  }

  .post-title {
    font-size: 1.3rem;
    margin-bottom: 0.6rem;
  }

  .post-meta {
    font-size: 0.8rem;
    margin-bottom: 0.8rem;
  }

  .post-excerpt {
    font-size: 0.9rem;
    margin-bottom: 1.2rem;
  }
}

@media (max-width: 480px) {
  .blog-container {
    padding: 1.2rem 0.8rem;
  }

  .blog-title {
    font-size: 1.6rem;
  }

  .blog-description {
    font-size: 0.85rem;
  }

  .post-image {
    height: 180px;
  }

  .post-title {
    font-size: 1.2rem;
  }

  .post-meta {
    font-size: 0.75rem;
  }

  .post-excerpt {
    font-size: 0.85rem;
  }
}

.no-content-container {
  text-align: center;
  padding: 4rem 2rem;
  font-size: 1.2rem;
  color: #666;
}
</style>
