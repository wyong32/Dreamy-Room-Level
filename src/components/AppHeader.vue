<template>
  <!-- Navigation Bar -->
  <header class="header">
    <div class="container">
      <div class="logo">
        <div class="logo-text">
          <img src="/images/logo.webp" alt="Logo" class="logo-image" /> {{ $t('header.logo') }}
        </div>
      </div>
      <nav class="nav desktop-nav" aria-label="Main Navigation">
        <ul>
          <li>
            <router-link
              :to="getLocalizedPath('/')"
              :title="$t('header.home')"
              @click="closeMobileMenuIfNeeded"
              ><span class="nav-icon">🏠</span> {{ $t('header.home') }}</router-link
            >
          </li>
          <li>
            <router-link
              :to="getLocalizedPath('/dreamy-room-revel-game-guides')"
              :title="$t('header.guides')"
              @click="closeMobileMenuIfNeeded"
              ><span class="nav-icon">📖</span> {{ $t('header.guides') }}</router-link
            >
          </li>
          <li>
            <router-link
              :to="getLocalizedPath('/dreamy-room-game-blog')"
              :title="$t('header.blog')"
              @click="closeMobileMenuIfNeeded"
              ><span class="nav-icon">📝</span> {{ $t('header.blog') }}</router-link
            >
          </li>
          <li>
            <router-link
              :to="getLocalizedPath('/download-dreamy-room-game')"
              :title="$t('header.download')"
              @click="closeMobileMenuIfNeeded"
              ><span class="nav-icon">⬇️</span> {{ $t('header.download') }}</router-link
            >
          </li>
        </ul>
      </nav>

      <!-- Level Search Bar -->
      <div class="level-search-container">
        <div class="level-search-bar">
          <span class="search-icon">🔍</span>
          <input
            type="number"
            v-model="searchLevel"
            :placeholder="searchPlaceholder"
            min="1"
            :max="maxLevel"
            @keyup.enter="performSearch"
            class="level-search-input"
            aria-label="Search level"
          />
        </div>
      </div>
      <!-- End Level Search Bar -->

      <button
        class="mobile-nav-toggle"
        @click="toggleMobileMenu"
        aria-label="Toggle navigation"
        :aria-expanded="isMobileMenuOpen.toString()"
      >
        <span class="hamburger-icon"></span>
      </button>
    </div>
    <nav class="mobile-nav" :class="{ open: isMobileMenuOpen }" aria-label="Mobile Navigation">
      <ul>
        <li>
          <router-link
            :to="getLocalizedPath('/')"
            :title="$t('header.home')"
            @click="closeMobileMenu"
            ><span class="nav-icon">🏠</span> {{ $t('header.home') }}</router-link
          >
        </li>
        <li>
          <router-link
            :to="getLocalizedPath('/dreamy-room-revel-game-guides')"
            :title="$t('header.guides')"
            @click="closeMobileMenu"
            ><span class="nav-icon">📖</span> {{ $t('header.guides') }}</router-link
          >
        </li>
        <li>
          <router-link
            :to="getLocalizedPath('/dreamy-room-game-blog')"
            :title="$t('header.blog')"
            @click="closeMobileMenu"
            ><span class="nav-icon">📝</span> {{ $t('header.blog') }}</router-link
          >
        </li>
        <li>
          <router-link
            :to="getLocalizedPath('/download-dreamy-room-game')"
            :title="$t('header.download')"
            @click="closeMobileMenu"
            ><span class="nav-icon">⬇️</span> {{ $t('header.download') }}</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeader',
  setup() {
    const { locale, t } = useI18n()
    const router = useRouter()

    const isMobileMenuOpen = ref(false)

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
      if (isMobileMenuOpen.value) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }

    const closeMobileMenu = () => {
      isMobileMenuOpen.value = false
      document.body.style.overflow = ''
    }

    const closeMobileMenuIfNeeded = () => {
      if (isMobileMenuOpen.value) {
        closeMobileMenu()
      }
    }

    // Language dropdown functionality - 暂时注释掉，但保留基本功能
    /*
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
    */

    // 保留基本的语言功能，但不显示切换界面
    const isOpen = ref(false)
    const availableLocales = [{ code: 'en', name: 'English' }]
    const currentLocale = computed(() => 'en')
    const currentLocaleInfo = computed(() => availableLocales[0])
    const toggleDropdown = () => {}
    const changeLocale = () => {}

    // Helper function to get localized path
    const getLocalizedPath = (path) => {
      return currentLocale.value === 'en' || !currentLocale.value
        ? path
        : `/${currentLocale.value}${path}`
    }

    // --- Level Search Logic ---
    const searchLevel = ref(null)
    const maxLevel = ref(115) // Max level, as specified

    const searchPlaceholder = computed(() => t('header.searchPlaceholder', { max: maxLevel.value }))

    const performSearch = () => {
      const level = parseInt(searchLevel.value)
      if (!isNaN(level) && level >= 1 && level <= maxLevel.value) {
        const path = `/dreamy-room-level-${level}`
        router.push(getLocalizedPath(path))
        searchLevel.value = null // Clear input after search
        closeMobileMenuIfNeeded() // Also close mobile menu if open
      } else {
        alert(t('header.searchInvalidLevel', { max: maxLevel.value }))
        // Optionally clear invalid input or provide better feedback
        searchLevel.value = null
      }
    }
    // --- End Level Search Logic ---

    return {
      // Mobile Menu
      isMobileMenuOpen,
      toggleMobileMenu,
      closeMobileMenu,
      closeMobileMenuIfNeeded,

      // Language dropdown
      isOpen,
      availableLocales,
      currentLocale,
      currentLocaleInfo,
      toggleDropdown,
      changeLocale,

      // Path localization
      getLocalizedPath,
      t,

      // Level Search
      searchLevel,
      maxLevel,
      searchPlaceholder,
      performSearch,
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

.mobile-nav {
  display: none;
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

  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
  }

  .mobile-nav-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    color: #6a4c93;
    cursor: pointer;
    padding: 0.5rem;
    margin-right: -0.5rem;
  }

  .hamburger-icon {
    width: 24px;
    height: 2px;
    background-color: #6a4c93;
    position: relative;
    transition: all 0.3s ease;
  }

  .hamburger-icon::before,
  .hamburger-icon::after {
    content: '';
    position: absolute;
    width: 24px;
    height: 2px;
    background-color: #6a4c93;
    left: 0;
    transition: all 0.3s ease;
    z-index: 999;
  }

  .hamburger-icon::before {
    top: -7px;
  }

  .hamburger-icon::after {
    bottom: -7px;
  }

  .mobile-nav-toggle[aria-expanded='true'] .hamburger-icon {
    background-color: transparent;
  }

  .mobile-nav-toggle[aria-expanded='true'] .hamburger-icon::before {
    transform: translateY(7px) rotate(45deg);
  }

  .mobile-nav-toggle[aria-expanded='true'] .hamburger-icon::after {
    transform: translateY(-7px) rotate(-45deg);
  }

  .mobile-nav {
    display: none;
    position: fixed;
    top: 60px;
    left: 0;
    width: 100%;
    height: calc(100vh - 60px);
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(5px);
    padding: 2rem;
    box-sizing: border-box;
    z-index: 99;
    overflow-y: auto;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .mobile-nav.open {
    display: flex;
  }

  .mobile-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
  }

  .mobile-nav li {
    width: 100%;
  }

  .mobile-nav a {
    font-size: 1.2rem;
    padding: 0.8rem 1rem;
    display: block;
    border-radius: 8px;
    transition: background-color 0.2s ease-in-out;
  }

  .mobile-nav a:hover,
  .mobile-nav a.router-link-exact-active {
    background-color: rgba(106, 76, 147, 0.1);
    color: #9370db;
  }

  .mobile-nav .nav-icon {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .header {
    padding: 0.8rem 0;
  }
  .mobile-nav {
    top: 54px;
    height: calc(100vh - 54px);
  }

  .container {
    padding: 0 1rem;
  }

  .logo .logo-text {
    font-size: 1.2rem;
  }
}

.level-search-bar {
  display: flex;
  align-items: center;
  background-color: #f0e6ff; /* Light purple background */
  border-radius: 20px; /* Rounded corners */
  padding: 0.3rem 0.8rem;
  border: 1px solid #dcd1ff;
  transition: box-shadow 0.3s ease;
}

.level-search-bar:focus-within {
  box-shadow: 0 0 0 2px #a17de8; /* Focus outline */
  border-color: #a17de8;
}

.search-icon {
  margin-right: 0.5rem;
  color: #6a4c93; /* Icon color */
  font-size: 0.9rem;
}

.level-search-input {
  border: none;
  outline: none;
  background: transparent;
  color: #333;
  font-size: 0.9rem;
  width: 120px; /* Adjust width as needed */
  padding: 0.2rem 0;
}

/* Hide number input spinners */
.level-search-input::-webkit-outer-spin-button,
.level-search-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.level-search-input::placeholder {
  color: #aaa;
  font-size: 0.85rem;
}

/* Responsive adjustments for search bar */
@media (max-width: 992px) {
  .level-search-container {
    margin-left: 1rem; /* Adjust spacing */
  }
  .level-search-input {
    width: 100px;
  }
}

@media (max-width: 768px) {
  .level-search-container {
    display: none; /* Hide desktop search bar on mobile */
    /* Alternatively, move it inside the mobile menu if needed */
  }

  /* Ensure desktop nav doesn't interfere when hidden */
  .desktop-nav {
    margin-right: 0;
  }

  .level-search-container {
    display: none;
  }
}
</style>
