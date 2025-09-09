<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <!-- 404图标 -->
      <div class="error-icon">
        <span class="icon">🔍</span>
        <h1 class="error-code">404</h1>
      </div>

      <!-- 错误信息 -->
      <div class="error-message">
        <h2>{{ $t('notFound.title') }}</h2>
        <p class="error-description">
          {{ $t('notFound.description') }}
        </p>
        <p class="error-path" v-if="currentPath">
          <strong>{{ $t('notFound.requestedPath') }}:</strong> {{ currentPath }}
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="action-buttons">
        <a :href="getLocalizedPath('/')" class="btn btn-primary">
          <span class="btn-icon">🏠</span>
          {{ $t('notFound.backToHome') }}
        </a>
        
        <a :href="getLocalizedPath('/dreamy-room-level-game-guides')" class="btn btn-secondary">
          <span class="btn-icon">📖</span>
          {{ $t('notFound.backToGuides') }}
        </a>
      </div>

      <!-- 建议链接 -->
      <div class="suggestions">
        <h3>{{ $t('notFound.suggestions') }}</h3>
        <ul class="suggestion-list">
          <li>
            <a :href="getLocalizedPath('/dreamy-room-level-game-guides')">
              <span class="suggestion-icon">📖</span>
              {{ $t('header.guides') }}
            </a>
          </li>
          <li>
            <a :href="getLocalizedPath('/dreamy-room-game-blog')">
              <span class="suggestion-icon">📝</span>
              {{ $t('header.blog') }}
            </a>
          </li>
          <li>
            <a :href="getLocalizedPath('/download-dreamy-room-game')">
              <span class="suggestion-icon">⬇️</span>
              {{ $t('header.download') }}
            </a>
          </li>
        </ul>
      </div>

      <!-- 搜索建议 -->
      <div class="search-suggestion">
        <p>{{ $t('notFound.searchHint') }}</p>
        <div class="search-box">
          <input 
            v-model="searchLevel" 
            type="number" 
            :placeholder="$t('header.searchPlaceholder', { max: 115 })"
            @keyup.enter="performSearch"
            min="1"
            max="115"
          >
          <button @click="performSearch" class="search-btn">
            <span>🔍</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'NotFoundView',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    
    const searchLevel = ref(null)
    const currentPath = ref('')

    // 获取当前请求的路径
    onMounted(() => {
      currentPath.value = route.fullPath
    })

    // 本地化路径辅助函数
    const getLocalizedPath = (path) => {
      // 简化版本，只返回英文路径
      return path
    }

    // 搜索关卡功能
    const performSearch = () => {
      const level = parseInt(searchLevel.value)
      if (!isNaN(level) && level >= 1 && level <= 115) {
        const path = `/dreamy-room-level-${level}`
        router.push(getLocalizedPath(path))
      } else {
        alert(t('header.searchInvalidLevel', { max: 115 }))
        searchLevel.value = null
      }
    }

    return {
      t,
      currentPath,
      searchLevel,
      getLocalizedPath,
      performSearch
    }
  }
}
</script>

<style scoped>
.not-found-container {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f0ff 0%, #faf5ff 100%);
}

.not-found-content {
  max-width: 600px;
  text-align: center;
  background: white;
  padding: 3rem 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(106, 76, 147, 0.1);
}

.error-icon {
  margin-bottom: 2rem;
}

.icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  background: linear-gradient(90deg, #b19cd9 0%, #9370db 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin: 0;
  line-height: 1;
}

.error-message {
  margin-bottom: 2rem;
}

.error-message h2 {
  color: #6a4c93;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.error-description {
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.error-path {
  color: #888;
  font-size: 0.9rem;
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  word-break: break-all;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(90deg, #b19cd9 0%, #9370db 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(106, 76, 147, 0.3);
}

.btn-secondary {
  background: white;
  color: #6a4c93;
  border: 2px solid #b19cd9;
}

.btn-secondary:hover {
  background: #f5f0ff;
  transform: translateY(-2px);
}

.suggestions {
  margin-bottom: 2rem;
  text-align: left;
}

.suggestions h3 {
  color: #6a4c93;
  margin-bottom: 1rem;
  text-align: center;
}

.suggestion-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.5rem;
}

.suggestion-list li a {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  text-decoration: none;
  color: #6a4c93;
  transition: all 0.3s ease;
}

.suggestion-list li a:hover {
  background: #f5f0ff;
  transform: translateX(5px);
}

.suggestion-icon {
  font-size: 1.2rem;
}

.search-suggestion {
  border-top: 1px solid #eee;
  padding-top: 2rem;
}

.search-suggestion p {
  color: #666;
  margin-bottom: 1rem;
}

.search-box {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  max-width: 300px;
  margin: 0 auto;
}

.search-box input {
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}

.search-box input:focus {
  outline: none;
  border-color: #b19cd9;
}

.search-btn {
  padding: 0.8rem 1rem;
  background: linear-gradient(90deg, #b19cd9 0%, #9370db 100%);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(106, 76, 147, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .not-found-content {
    padding: 2rem 1rem;
  }
  
  .error-code {
    font-size: 4rem;
  }
  
  .action-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 250px;
    justify-content: center;
  }
}
</style>
