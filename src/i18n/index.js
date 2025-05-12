import { createI18n } from 'vue-i18n'
import en from './locales/en.js'
import zh from './locales/zh.js'

// Create i18n instance
const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: localStorage.getItem('userLocale') || 'en', // Default locale
  fallbackLocale: 'en', // Fallback locale
  messages: {
    en,
    zh,
  },
  // Don't show 'en' in URL for default language
  silentTranslationWarn: true,
  missingWarn: false,
})

export default i18n
