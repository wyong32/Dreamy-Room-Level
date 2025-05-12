<template>
  <div class="guides-container">
    <!-- Level Navigation -->
    <div class="level-nav">
      <a
        v-for="category in categories"
        :key="category.id"
        href="#"
        class="level-nav-item"
        :class="{ active: activeCategory === category.id }"
        @click.prevent="setActiveCategory(category.id)"
      >
        {{ getCategoryName(category) }}
      </a>
    </div>

    <div class="guide-cards">
      <article
        v-for="guide in filteredGuides"
        :key="guide.id"
        class="guide-card"
        @click="navigateToGuide(guide)"
      >
        <div class="card-image food-image">
          <img
            :src="
              guide.imageUrl ||
              'https://via.placeholder.com/300x300/f5f0ff/b19cd9?text=' + guide.title
            "
            :alt="guide.imageAlt || guide.pageTitle"
          />
        </div>
        <div class="card-content">
          <h3>
            {{ guide.pageTitle }}
          </h3>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import guidesData from '@/datas/guides/index.js'
import guidesZhData from '@/datas/guides-zh/index.js'
import { useI18n } from 'vue-i18n'

export default {
  name: 'GameGuides',
  setup() {
    const { t, locale } = useI18n()
    return {
      t,
      i18nLocale: locale,
    }
  },
  data() {
    return {
      guides: [],
      activeCategory: '01-10',
      categories: [
        { id: '01-10', name: 'Levels 1-10', module: 'guides-1-10' },
        { id: '11-20', name: 'Levels 11-20', module: 'guides-11-20' },
        { id: '21-30', name: 'Levels 21-30', module: 'guides-21-30' },
        { id: '31-40', name: 'Levels 31-40', module: 'guides-31-40' },
        { id: '41-50', name: 'Levels 41-50', module: 'guides-41-50' },
        { id: '51-60', name: 'Levels 51-60', module: 'guides-51-60' },
        { id: '61-70', name: 'Levels 61-70', module: 'guides-61-70' },
        { id: '71-80', name: 'Levels 71-80', module: 'guides-71-80' },
        { id: '81-90', name: 'Levels 81-90', module: 'guides-81-90' },
        { id: '91-100', name: 'Levels 91-100', module: 'guides-91-100' },
        { id: '101-110', name: 'Levels 101-110', module: 'guides-101-110' },
      ],
    }
  },
  created() {
    // 初始加载指南数据
    this.loadGuides()
  },
  computed: {
    filteredGuides() {
      return this.guides
    },
  },
  methods: {
    async loadGuides() {
      const currentLocale = this.i18nLocale

      try {
        if (currentLocale === 'zh') {
          // 加载中文指南数据
          this.guides = guidesZhData.filter((guide) => guide.category === this.activeCategory)
        } else {
          // 加载英文指南数据
          this.guides = guidesData.filter((guide) => guide.category === this.activeCategory)
        }
      } catch (error) {
        console.error('Error loading guides:', error)
        this.guides = []
      }
    },

    async setActiveCategory(categoryId) {
      this.activeCategory = categoryId

      // 切换类别时重新加载指南数据
      await this.loadGuides()
    },

    navigateToGuide(guide) {
      // 使用 this.i18nLocale 而不是 useI18n()
      const currentLocale = this.i18nLocale

      console.log('Current locale:', currentLocale)
      console.log('Guide ID:', guide.id)
      console.log('Guide object:', guide)

      // 确保 guide.id 存在
      if (!guide.id) {
        console.error('Guide ID is undefined or null')
        return
      }

      // 使用更直接的方式进行导航
      if (currentLocale === 'en') {
        // 英文路由
        const path = `/${guide.id}`
        console.log('Navigating to:', path)
        // 使用window.location.href进行导航
        window.location.href = path
      } else {
        // 非英文路由
        const path = `/${currentLocale}/${guide.id}`
        console.log('Navigating to:', path)
        // 使用window.location.href进行导航
        window.location.href = path
      }
    },

    getCategoryName(category) {
      // 根据当前语言返回翻译后的类别名称
      const id = category.id
      const range = id.split('-')
      return this.t('guides.levelRange', { start: range[0], end: range[1] })
    },
  },

  watch: {
    // 监听语言变化，重新加载指南数据
    i18nLocale: {
      handler() {
        this.loadGuides()
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
/* Game Guides */
.guides-container {
  padding: 2rem 0;
  position: relative;
}

/* Level Navigation */
.level-nav {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.level-nav-item {
  padding: 0.8rem 1.5rem;
  background-color: #f0e6ff;
  color: #6a4c93;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
}

.level-nav-item:hover,
.level-nav-item.active {
  background-color: #b19cd9;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(177, 156, 217, 0.4);
}

.guide-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}

.guide-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  border: 1px solid #f0e6ff;
  cursor: pointer;
}

.guide-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(106, 76, 147, 0.15);
  border-color: #b19cd9;
}

.card-image {
  height: 180px;
  background-color: #f5f0ff;
  position: relative;
  overflow: hidden;
}

.food-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.card-content {
  padding: 1rem;
  text-align: center;
}

.card-content h3 {
  margin: 0;
  color: #6a4c93;
  font-size: 1rem;
  line-height: 1.4;
}

/* Responsive Design */
@media (max-width: 992px) {
  .level-nav {
    gap: 0.8rem;
    margin-bottom: 2.5rem;
  }

  .level-nav-item {
    padding: 0.7rem 1.2rem;
    font-size: 0.9rem;
  }

  .guide-cards {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.2rem;
  }

  .card-content h3 {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .level-nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.6rem;
    margin-bottom: 2rem;
  }

  .level-nav-item {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
    width: 30%; /* 一行放3个 */
    text-align: center;
    box-sizing: border-box;
  }

  .guide-cards {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }

  .card-image {
    height: 150px;
  }

  .card-content {
    padding: 0.8rem;
  }

  .card-content h3 {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .level-nav-item {
    width: 30%; /* 保持一行3个 */
    padding: 0.5rem 0.5rem;
    font-size: 0.8rem;
  }

  .guide-cards {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 0.8rem;
  }

  .card-image {
    height: 120px;
  }

  .card-content {
    padding: 0.6rem;
  }

  .card-content h3 {
    font-size: 0.8rem;
  }
}
</style>
