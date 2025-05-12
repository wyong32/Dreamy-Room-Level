import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
// 暂时注释掉中文导入，但保留文件以便将来使用
// import zh from './locales/zh.js'

// Create i18n instance
const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: 'en', // 强制使用英文作为默认语言
  fallbackLocale: 'en', // Fallback locale
  messages: {
    en,
    // 暂时注释掉中文支持，但保留文件以便将来使用
    // zh,
  },
  // Don't show 'en' in URL for default language
  silentTranslationWarn: true,
  missingWarn: false,
})

export default i18n
