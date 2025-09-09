<template>
  <!-- Navigation Bar -->
  <header class="header">
    <div class="container">
      <div class="logo">
        <div class="logo-text">
          <img
            src="/images/logo.webp"
            alt="Logo"
            class="logo-image"
            width="30"
            height="30"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
          />
          {{ $t('header.logo') }}
        </div>
      </div>
      <nav class="nav desktop-nav" aria-label="Main Navigation">
        <ul>
          <li>
            <a
              :href="getLocalizedPath('/')"
              :title="$t('header.home')"
              @click="closeMobileMenuIfNeeded"
              ><span class="nav-icon">
                <svg
                  t="1756797050129"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="124739"
                  width="200"
                  height="200"
                >
                  <path
                    d="M49.617455 515.304727a34.909091 34.909091 0 0 1-23.645091-60.625454L488.378182 29.626182a34.978909 34.978909 0 0 1 47.336727 0.069818L995.444364 454.749091a34.909091 34.909091 0 1 1-47.406546 51.269818L511.930182 102.795636 73.239273 506.088727a34.769455 34.769455 0 0 1-23.621818 9.216z"
                    fill="#1296db"
                    p-id="124740"
                  ></path>
                  <path
                    d="M827.275636 1001.844364H196.724364c-44.916364 0-81.454545-36.538182-81.454546-81.454546V541.858909a34.909091 34.909091 0 1 1 69.818182 0v378.530909a11.636364 11.636364 0 0 0 11.636364 11.636364h630.551272c6.4 0 11.636364-5.236364 11.636364-11.636364V541.858909a34.909091 34.909091 0 1 1 69.818182 0v378.530909c0 44.916364-36.538182 81.454545-81.454546 81.454546z"
                    fill="#1296db"
                    p-id="124741"
                  ></path>
                  <path
                    d="M597.178182 1001.844364h-170.379637c-44.916364 0-81.454545-36.538182-81.454545-81.454546v-237.149091c0-44.916364 36.538182-81.454545 81.454545-81.454545h170.379637c44.916364 0 81.454545 36.538182 81.454545 81.454545v237.125818a81.547636 81.547636 0 0 1-81.454545 81.477819z m-170.379637-330.24a11.636364 11.636364 0 0 0-11.636363 11.636363v237.125818a11.636364 11.636364 0 0 0 11.636363 11.636364h170.379637c6.4 0 11.636364-5.236364 11.636363-11.636364V683.240727c0-6.4-5.236364-11.636364-11.636363-11.636363h-170.379637z"
                    fill="#1296db"
                    p-id="124742"
                  ></path>
                </svg>
              </span>
              {{ $t('header.home') }}</a
            >
          </li>
          <li>
            <a
              :href="getLocalizedPath('/dreamy-room-level-game-guides')"
              :title="$t('header.guides')"
              @click="closeMobileMenuIfNeeded"
              ><span class="nav-icon">
                <svg
                  t="1756797112429"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="128545"
                  width="200"
                  height="200"
                >
                  <path
                    d="M868.1472 209.92a29.8496 29.8496 0 0 0-29.9008 29.9008v642.7648H231.68a44.6464 44.6464 0 1 1 0-89.2928h512a29.9008 29.9008 0 0 0 29.9008-29.8496V107.1104a29.9008 29.9008 0 0 0-29.9008-29.8496H273.2544A146.1248 146.1248 0 0 0 127.2832 223.232v614.7072a104.4992 104.4992 0 0 0 104.3968 104.3968h636.4672a29.8496 29.8496 0 0 0 29.8496-29.8496V239.872a29.8496 29.8496 0 0 0-29.8496-29.952zM250.0608 388.352L673.6896 240.64a11.6224 11.6224 0 0 1 14.848 14.7968l-144.8448 421.1712a12.8 12.8 0 0 1-23.6032 1.4848l-80.8448-163.84 116.3264-135.5264-138.24 113.664-168.5504-80.384a12.8 12.8 0 0 1 1.28-23.6544z"
                    fill="#4D8DFF"
                    p-id="128546"
                  ></path>
                </svg>
              </span>
              {{ $t('header.guides') }}</a
            >
          </li>
          <li>
            <a
              :href="getLocalizedPath('/dreamy-room-game-blog')"
              :title="$t('header.blog')"
              @click="closeMobileMenuIfNeeded"
              ><span class="nav-icon">
                <svg
                  t="1756797136034"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="129589"
                  width="200"
                  height="200"
                >
                  <path
                    d="M957.705625 384.093127h-57.574278a71.293815 71.293815 0 0 1-68.256406-64.161021A320.805106 320.805106 0 0 0 501.240913 0.150847H332.749977A331.316592 331.316592 0 0 0 0 330.853131v362.441513A331.316592 331.316592 0 0 0 332.749977 1023.996928h358.346128A331.316592 331.316592 0 0 0 1023.846082 693.294644v-234.460753a74.228841 74.228841 0 0 0-66.140457-74.740764zM319.951901 256.112367H511.923041a63.99038 63.99038 0 1 1 0 127.98076H319.951901A64.297534 64.297534 0 0 1 255.96152 319.932106 65.457893 65.457893 0 0 1 319.951901 256.112367z m383.94228 511.923041H319.951901A62.830021 62.830021 0 0 1 255.96152 703.874387a64.024508 64.024508 0 0 1 63.990381-63.819739h383.94228a64.024508 64.024508 0 0 1 63.99038 63.819739 62.830021 62.830021 0 0 1-63.99038 64.161021z"
                    fill="#3aba96"
                    p-id="129590"
                  ></path>
                </svg>
              </span>
              {{ $t('header.blog') }}</a
            >
          </li>
          <li>
            <a
              :href="getLocalizedPath('/download-dreamy-room-game')"
              :title="$t('header.download')"
              @click="closeMobileMenuIfNeeded"
              ><span class="nav-icon">
                <svg
                  t="1756797158580"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="131454"
                  width="200"
                  height="200"
                >
                  <path
                    d="M960 128h-192a64 64 0 1 0 0 128h128v640H128V128h229.504L448 218.496v331.008L365.248 466.752a63.936 63.936 0 1 0-90.496 90.496l192 192a63.808 63.808 0 0 0 90.496 0l192-192a63.936 63.936 0 1 0-90.496-90.496L576 549.504V192a63.808 63.808 0 0 0-18.752-45.248l-128-128A63.744 63.744 0 0 0 384 0H64a64 64 0 0 0-64 64v896a64 64 0 0 0 64 64h896a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64"
                    fill="#4D94FF"
                    p-id="131455"
                  ></path>
                </svg>
              </span>
              {{ $t('header.download') }}</a
            >
          </li>
        </ul>
      </nav>

      <!-- Level Search Bar -->
      <div class="level-search-container">
        <div class="level-search-bar">
          <span class="search-icon">
            <svg
              t="1756797184301"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="132441"
              width="200"
              height="200"
            >
              <path
                d="M782.08 476.330667A305.706667 305.706667 0 1 0 170.666667 476.416a305.706667 305.706667 0 0 0 611.413333-0.085333z m42.666667 0a348.416 348.416 0 1 1-696.832-0.042667 348.416 348.416 0 0 1 696.789333 0.042667z"
                fill="#409EFF"
                p-id="132442"
              ></path>
              <path
                d="M476.373333 281.898667c48.384 0 92.16 19.626667 123.861334 51.328a21.333333 21.333333 0 1 1-30.165334 30.165333 132.096 132.096 0 0 0-93.696-38.826667c-36.608 0-69.76 14.805333-93.738666 38.826667a21.333333 21.333333 0 0 1-30.208-30.165333 174.805333 174.805333 0 0 1 123.946666-51.328zM696.32 696.362667a21.333333 21.333333 0 0 1 30.208 0l163.2 163.2a21.333333 21.333333 0 1 1-30.165333 30.165333l-163.2-163.2a21.333333 21.333333 0 0 1 0-30.165333z"
                fill="#409EFF"
                p-id="132443"
              ></path>
            </svg>
          </span>
          <input
            type="number"
            v-model="searchLevel"
            placeholder="search"
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
  </header>

  <!-- 移动端导航放在header外面 -->
  <nav class="mobile-nav" :class="{ open: isMobileMenuOpen }" aria-label="Mobile Navigation">
    <ul>
      <li>
        <a :href="getLocalizedPath('/')" :title="$t('header.home')" @click="closeMobileMenu"
          ><span class="nav-icon">🏠</span> {{ $t('header.home') }}</a
        >
      </li>
      <li>
        <a
          :href="getLocalizedPath('/dreamy-room-level-game-guides')"
          :title="$t('header.guides')"
          @click="closeMobileMenu"
          ><span class="nav-icon">📖</span> {{ $t('header.guides') }}</a
        >
      </li>
      <li>
        <a
          :href="getLocalizedPath('/dreamy-room-game-blog')"
          :title="$t('header.blog')"
          @click="closeMobileMenu"
          ><span class="nav-icon">📝</span> {{ $t('header.blog') }}</a
        >
      </li>
      <li>
        <a
          :href="getLocalizedPath('/download-dreamy-room-game')"
          :title="$t('header.download')"
          @click="closeMobileMenu"
          ><span class="nav-icon">⬇️</span> {{ $t('header.download') }}</a
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeader',
  setup() {
    const { t } = useI18n()
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
  /* 防止CLS优化 */
  height: 80px;
  min-height: 80px;
  contain: layout style paint;
  box-sizing: border-box;
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
  width: 30px;
  margin-right: 0.5rem;
  vertical-align: middle;
  /* 防止CLS优化 */
  background-color: #f0f0f0;
  border-radius: 4px;
  object-fit: contain;
  contain: layout style paint;
  transform: translateZ(0);
  backface-visibility: hidden;
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
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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

/* 默认隐藏移动端导航和按钮 */
.mobile-nav {
  display: none;
}

.mobile-nav-toggle {
  display: none;
}

/* 在大屏幕上确保移动端导航完全隐藏 */
@media (min-width: 993px) {
  .mobile-nav {
    display: none !important;
  }
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
    position: fixed;
    top: 80px;
    left: 0;
    width: 100%;
    height: calc(100vh - 80px);
    background-color: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(5px);
    padding: 2rem;
    box-sizing: border-box;
    z-index: 101; /* 比header的z-index(100)更高 */
    overflow-y: auto;
    display: none;
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
    height: 70px;
    min-height: 70px;
  }
  .mobile-nav {
    top: 70px;
    height: calc(100vh - 70px);
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
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
