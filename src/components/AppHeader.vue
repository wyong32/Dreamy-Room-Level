<template>
  <!-- Navigation Bar -->
  <header class="header">
    <div class="container">
      <div class="logo">
        <div class="logo-text">
          <img src="/images/logo.webp" alt="Logo" class="logo-image" /> {{ $t('header.logo') }}
        </div>
      </div>
      <nav class="nav" aria-label="Main Navigation">
        <ul>
          <li>
            <router-link :to="getLocalizedPath('/')" :title="$t('header.home')"
              ><span class="nav-icon">🏠</span> {{ $t('header.home') }}</router-link
            >
          </li>
          <li>
            <router-link :to="getLocalizedPath('/guides')" :title="$t('header.guides')"
              ><span class="nav-icon">📖</span> {{ $t('header.guides') }}</router-link
            >
          </li>
          <li>
            <router-link :to="getLocalizedPath('/blog')" :title="$t('header.blog')"
              ><span class="nav-icon">📝</span> {{ $t('header.blog') }}</router-link
            >
          </li>
          <li>
            <router-link :to="getLocalizedPath('/download')" :title="$t('header.download')"
              ><span class="nav-icon">⬇️</span> {{ $t('header.download') }}</router-link
            >
          </li>

          <li class="language-item">
            <div class="language-dropdown">
              <button
                class="dropdown-toggle"
                @click="toggleDropdown"
                :aria-expanded="isOpen"
                aria-haspopup="true"
              >
                {{ currentLocaleInfo.name }}
                <span class="dropdown-arrow" :class="{ open: isOpen }">▼</span>
              </button>

              <div class="dropdown-menu" v-if="isOpen" @click.stop>
                <button
                  v-for="locale in availableLocales"
                  :key="locale.code"
                  @click="changeLocale(locale.code)"
                  :class="{ active: currentLocale === locale.code }"
                  class="dropdown-item"
                >
                  {{ locale.name }}
                </button>
              </div>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeader',
  setup() {
    const { locale } = useI18n()
    const router = useRouter()

    // Language dropdown functionality
    const isOpen = ref(false)

    const availableLocales = [
      { code: 'en', name: 'English' },
      { code: 'zh', name: '中文' },
    ]

    const currentLocale = computed(() => locale.value)

    const currentLocaleInfo = computed(() => {
      return availableLocales.find((l) => l.code === currentLocale.value) || availableLocales[0]
    })

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value
    }

    const changeLocale = (localeCode) => {
      // Set the locale
      locale.value = localeCode

      // Save the locale preference in localStorage
      localStorage.setItem('userLocale', localeCode)

      // Get current route
      const currentRoute = router.currentRoute.value
      const currentPath = currentRoute.path

      // Check if we're on a guide detail page (path matches /game-level-X or /zh/game-level-X)
      const isGuideDetailPage = /^\/(zh\/)?game-level-\d+/.test(currentPath)

      if (isGuideDetailPage) {
        // Extract the guide ID from the path
        const guideId = currentPath.match(/game-level-\d+/)[0]

        // Construct the new path based on the locale
        const newPath = localeCode === 'en' ? `/${guideId}` : `/${localeCode}/${guideId}`

        // Force a full page reload to handle the guide detail page correctly
        window.location.href = newPath
        return
      }

      // Check if we're on a blog detail page (path matches /blog-X or /zh/blog-X)
      const isBlogDetailPage = /^\/(zh\/)?(blog-[\w-]+)/.test(currentPath)

      if (isBlogDetailPage) {
        // Extract the blog ID from the path
        const blogId = currentPath.match(/(blog-[\w-]+)/)[0]

        // Construct the new path based on the locale
        const newPath = localeCode === 'en' ? `/${blogId}` : `/${localeCode}/${blogId}`

        // Force a full page reload to handle the blog detail page correctly
        window.location.href = newPath
        return
      }

      // For other pages, use the standard routing logic
      // If we're switching to the default locale (en) and the route has a locale prefix
      if (localeCode === 'en' && currentRoute.params.locale) {
        // Redirect to the same route without the locale prefix
        const newPath = currentPath.replace(/^\/[^\/]+/, '')
        router.push(newPath || '/')
      }
      // If we're switching to a non-default locale
      else if (localeCode !== 'en') {
        if (currentRoute.params.locale) {
          // Replace current locale with new locale
          const newPath = currentPath.replace(/^\/[^\/]+/, `/${localeCode}`)
          router.push(newPath)
        } else {
          // Add locale prefix to current path
          const newPath = `/${localeCode}${currentPath}`
          router.push(newPath)
        }
      }

      // Close dropdown after selection
      isOpen.value = false
    }

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (isOpen.value && !event.target.closest('.language-dropdown')) {
        isOpen.value = false
      }
    }

    // Add/remove event listeners
    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
    })

    // Helper function to get localized path
    const getLocalizedPath = (path) => {
      return locale.value === 'en' ? path : `/${locale.value}${path}`
    }

    return {
      // Language dropdown
      isOpen,
      availableLocales,
      currentLocale,
      currentLocaleInfo,
      toggleDropdown,
      changeLocale,

      // Path localization
      getLocalizedPath,
    }
  },
}
</script>

<style scoped>
/* 导航栏 */
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 1rem 0;
}

.container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo .logo-text {
  font-size: 2rem;
  margin: 0;
  font-weight: bold;
  background: linear-gradient(90deg, #b19cd9 0%, #9370db 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: flex;
  align-items: center;
}

.logo-image {
  height: 30px;
  width: auto;
  margin-right: 0.5rem;
  vertical-align: middle;
}

.nav ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav a {
  color: #6a4c93;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  align-items: center;
}

.nav-icon {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.nav a:hover {
  color: #9370db;
  transform: translateY(-2px);
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #b19cd9 0%, #9370db 100%);
  transition: width 0.3s ease;
}

.nav a:hover::after {
  width: 100%;
}

.language-item {
  margin-left: 1rem;
  display: flex;
  align-items: center;
}

/* Language Dropdown Styles */
.language-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-toggle {
  background: none;
  border: none;
  color: #6a4c93;
  cursor: pointer;
  font-size: 0.9rem;
  padding: 0.5rem 0.8rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  background-color: rgba(106, 76, 147, 0.1);
}

.dropdown-toggle:hover {
  background-color: rgba(106, 76, 147, 0.2);
}

.dropdown-arrow {
  font-size: 0.7rem;
  transition: transform 0.3s ease;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 120px;
  overflow: hidden;
}

.dropdown-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.7rem 1rem;
  border: none;
  background: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #6a4c93;
}

.dropdown-item:hover,
.dropdown-item.active {
  background-color: rgba(106, 76, 147, 0.1);
}

.dropdown-item.active {
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .logo .logo-text {
    font-size: 1.6rem;
  }

  .nav a {
    font-size: 0.9rem;
  }

  .nav-icon {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 0.8rem;
    padding: 0 1rem;
  }

  .nav ul {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }

  .logo .logo-text {
    font-size: 1.4rem;
  }

  .logo-image {
    height: 25px;
  }

  .nav a {
    font-size: 0.85rem;
  }

  .nav-icon {
    font-size: 0.9rem;
    margin-right: 0.3rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 0.5rem;
  }

  .nav ul {
    gap: 0.7rem;
  }

  .logo .logo-text {
    font-size: 1.2rem;
  }

  .logo-image {
    height: 20px;
  }

  .nav a {
    font-size: 0.8rem;
  }
}
</style>
