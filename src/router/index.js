import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import GuidesView from '../views/GuidesView.vue'
import BlogView from '../views/BlogView.vue'
import DownloadView from '../views/DownloadView.vue'
import GuideDetail from '../views/GuideDetail.vue'
import BlogDetail from '../views/BlogDetail.vue'
import PrivacyView from '../views/PrivacyView.vue'
import TermsView from '../views/TermsView.vue'
import AboutView from '../views/AboutView.vue'
import ContactView from '../views/ContactView.vue'

import i18n from '../i18n'

// Create routes for default locale (English)
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/dreamy-room-level-game-guides',
    name: 'guides',
    component: GuidesView,
  },
  {
    path: '/guides',
    redirect: '/dreamy-room-level-game-guides',
  },
  {
    path: '/dreamy-room-game-blog',
    name: 'blog',
    component: BlogView,
  },
  {
    path: '/download-dreamy-room-game',
    name: 'download',
    component: DownloadView,
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: PrivacyView,
  },
  {
    path: '/terms',
    name: 'terms',
    component: TermsView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/contact',
    name: 'contact',
    component: ContactView,
  },
  {
    path: '/:id(game-level-\\d+)',
    name: 'guide-detail',
    component: GuideDetail,
    props: true,
  },
  {
    path: '/:id(dreamy-room-level-\\d+)',
    name: 'guide-detail-alt',
    component: GuideDetail,
    props: true,
  },
  {
    path: '/:id(blog-[\\w-]+)',
    name: 'blog-detail',
    component: BlogDetail,
    props: true,
  },
]

// 暂时注释掉多语言路由相关代码，以后可能会重新启用
// Create localized routes for non-default locales
const localeRoutes = []

/*
// Add localized routes for each route
routes.forEach((route) => {
  localeRoutes.push({
    path: route.path.includes('game-level-')
      ? `/:locale/:id(game-level-\\d+)`
      : route.path.includes('blog-')
        ? `/:locale/:id(blog-[\\w-]+)`
        : `/:locale${route.path}`,
    name: `locale-${route.name}`,
    component: route.component,
    // 传递原始props，不再传递locale
    props: (route) => {
      // 获取原始props
      const originalProps = typeof route.props === 'function' ? route.props(route) : route.props

      // 如果原始组件接受id参数，则传递id
      if (route.params.id) {
        return { ...originalProps, id: route.params.id }
      }

      return originalProps
    },
  })
})
*/

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes, // 只使用默认路由，不包含多语言路由
  scrollBehavior() {
    // Always scroll to top
    return { top: 0 }
  },
})

// 暂时注释掉多语言路由导航守卫，以后可能会重新启用
/*
// Navigation guard to set the locale based on the route
router.beforeEach((to, _from, next) => {
  // Get locale from route parameter
  const locale = to.params.locale

  // If locale exists in route and is supported
  if (locale && ['zh'].includes(locale)) {
    // Set i18n locale
    i18n.global.locale.value = locale

    // Save the locale preference
    localStorage.setItem('userLocale', locale)

    return next()
  }

  // Check for saved locale preference
  const savedLocale = localStorage.getItem('userLocale')

  // If there's a saved non-default locale preference and we're not on a localized route
  if (savedLocale && savedLocale !== 'en' && !to.params.locale) {
    // Redirect to the localized version of the route
    const localizedPath = `/${savedLocale}${to.path}`
    return next(localizedPath)
  }

  // Default locale (English) or already on correct route
  if (!locale) {
    i18n.global.locale.value = 'en'
  }

  return next()
})
*/

// 简化的导航守卫，只设置默认语言
router.beforeEach((to, _from, next) => {
  // 强制使用英文
  i18n.global.locale.value = 'en'
  return next()
})

export default router
