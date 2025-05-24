import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'
import i18n from './i18n'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(head)

// 参考cookingdom：确保router完全准备就绪后再挂载应用，防止CLS
async function initApp() {
  try {
    // 等待router准备就绪
    await router.isReady()
    console.log('Router已准备就绪')

    // 挂载应用
    app.mount('#app')
    console.log('应用已挂载')
  } catch (error) {
    console.error('应用初始化失败:', error)
    // 即使出错也尝试挂载应用
    app.mount('#app')
  }
}

// 初始化应用
initApp()

// PWA插件会自动注册Service Worker，无需手动注册
