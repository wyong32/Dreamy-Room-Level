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

    <div v-if="filteredGuides.length > 0" class="guide-cards">
      <article
        v-for="(guide, index) in filteredGuides"
        :key="guide.id"
        class="guide-card"
        @click="navigateToGuide(guide)"
      >
        <div class="card-image food-image">
          <img
            :src="
              guide.imageUrl ||
              'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmMGZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNiIgZmlsbD0iI2I5Y2Q5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHJlYW15IFJvb208L3RleHQ+PC9zdmc+'
            "
            :alt="guide.imageAlt || guide.pageTitle"
            :fetchpriority="index < 3 ? 'high' : 'auto'"
            :loading="index < 3 ? 'eager' : 'lazy'"
            :decoding="index < 3 ? 'sync' : 'async'"
            width="300"
            height="200"
            @error="handleImageError"
            @load="handleImageLoad"
            class="guide-image"
          />
        </div>
        <div class="card-content">
          <h3>
            {{ guide.pageTitle }}
          </h3>
        </div>
      </article>
    </div>
    <div v-else class="no-content-container">
      <p>{{ $t('guides.noGuidesFound') }}</p>
    </div>
  </div>
</template>

<script>
import guidesData from '@/datas/guides/index.js'
import guidesZhData from '@/datas/guides-zh/index.js'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { ref, computed, watch, onMounted } from 'vue'

export default {
  name: 'GameGuides',
  setup() {
    const { t, locale: i18nLocale } = useI18n()
    const router = useRouter()

    const guides = ref([])
    const activeCategory = ref('01-10')
    const categories = ref([
      { id: '01-10', name: 'Levels 1-10' },
      { id: '11-20', name: 'Levels 11-20' },
      { id: '21-30', name: 'Levels 21-30' },
      { id: '31-40', name: 'Levels 31-40' },
      { id: '41-50', name: 'Levels 41-50' },
      { id: '51-60', name: 'Levels 51-60' },
      { id: '61-70', name: 'Levels 61-70' },
      { id: '71-80', name: 'Levels 71-80' },
      { id: '81-90', name: 'Levels 81-90' },
      { id: '91-100', name: 'Levels 91-100' },
      { id: '101-110', name: 'Levels 101-110' },
    ])

    const loadGuides = () => {
      try {
        const sourceData = i18nLocale.value === 'zh' ? guidesZhData : guidesData
        guides.value = sourceData.filter((guide) => guide.category === activeCategory.value)
      } catch (error) {
        console.error('Error loading guides:', error)
        guides.value = []
      }
    }

    const setActiveCategory = (categoryId) => {
      if (activeCategory.value !== categoryId) {
        activeCategory.value = categoryId
        loadGuides()
        sessionStorage.setItem('gameGuidesActiveCategory', categoryId)
      }
    }

    const initializeActiveCategory = () => {
      const savedCategory = sessionStorage.getItem('gameGuidesActiveCategory')
      if (savedCategory && categories.value.some((cat) => cat.id === savedCategory)) {
        activeCategory.value = savedCategory
      } else if (categories.value.length > 0) {
        activeCategory.value = categories.value[0].id
      }
      loadGuides()
    }

    onMounted(() => {
      initializeActiveCategory()
    })

    watch(i18nLocale, () => {
      loadGuides()
    })

    const filteredGuides = computed(() => guides.value)

    const navigateToGuide = (guide) => {
      if (!guide.detailsRoute || !guide.detailsRoute.path) {
        console.error('Guide detailsRoute.path is undefined or null')
        return
      }
      router.push({ path: guide.detailsRoute.path })
    }

    const getCategoryName = (category) => {
      const id = category.id
      const range = id.split('-')
      return t('guides.levelRange', { start: range[0], end: range[1] })
    }

    const handleImageError = (event) => {
      // 图片加载失败时的处理
      const img = event.target
      if (img && !img.dataset.fallbackLoaded) {
        img.dataset.fallbackLoaded = 'true'
        img.src =
          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmMGZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iI2I5Y2Q5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RHJlYW15IFJvb208L3RleHQ+PC9zdmc+'
      }
    }

    const handleImageLoad = (event) => {
      // 图片加载完成后添加淡入效果
      event.target.classList.add('loaded')
    }

    return {
      t,
      i18nLocale,
      activeCategory,
      categories,
      filteredGuides,
      setActiveCategory,
      navigateToGuide,
      getCategoryName,
      handleImageError,
      handleImageLoad,
    }
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
  opacity: 0;
  transition: opacity 0.3s ease;
  transform: translateZ(0);
  backface-visibility: hidden;
}

.food-image img.loaded {
  opacity: 1;
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .card-image {
    height: 160px;
  }
}

@media (max-width: 768px) {
  .guides-container {
    padding: 1.5rem 0;
  }

  .level-nav {
    gap: 0.6rem;
    margin-bottom: 2rem;
  }

  .level-nav-item {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .guide-cards {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }

  .card-image {
    height: 140px;
  }

  .card-content h3 {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .level-nav {
    justify-content: flex-start;
    overflow-x: auto;
    padding-bottom: 0.5rem; /* For scrollbar visibility */
    white-space: nowrap; /* Prevent wrapping */
    -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  }

  .level-nav-item {
    flex: 0 0 auto; /* Prevent shrinking */
  }

  .guide-cards {
    grid-template-columns: 1fr 1fr;
    gap: 0.8rem;
  }

  .card-image {
    height: 120px;
  }
}

.no-content-container {
  text-align: center;
  padding: 3rem 1rem;
  font-size: 1.2rem;
  color: #666;
}
</style>
