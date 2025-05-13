<template>
  <div class="guides-view">
    <!-- SEO Head -->
    <SeoHead pageType="guides" />
    <div class="container">
      <div class="page-header">
        <h1 class="page-title"><span class="title-icon">📖</span> {{ $t('guides.title') }}</h1>
        <h2 class="page-description">{{ $t('guides.description') }}</h2>
      </div>

      <!-- Game Guides Component -->
      <GameGuides />
    </div>
  </div>
</template>

<script>
import GameGuides from '@/components/GameGuides.vue'
import SeoHead from '@/components/SeoHead.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'GuidesView',
  components: {
    GameGuides,
    SeoHead,
  },
  setup() {
    const { t, locale } = useI18n()
    return {
      t,
      i18nLocale: locale,
    }
  },
}
</script>

<style scoped>
.guides-view {
  padding: 2rem 0;
  padding-top: 100px; /* 增加顶部内边距，避免被头部导航栏遮挡 */
  background-color: #f9f7fe;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  color: #6a4c93;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.title-icon {
  font-size: 1.5rem;
  margin-right: 0.5rem;
  display: inline-block;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.page-description {
  color: #8a8a8a;
  font-size: 1.1rem;
}

/* --- Responsive Design --- */
@media (max-width: 992px) {
  .guides-view {
    padding-top: 70px; /* Adjust based on header height at this breakpoint */
    padding-left: 0;
    padding-right: 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .page-header {
    margin-bottom: 2rem;
  }

  .page-title {
    /* Assuming h1, let's set a base size and then adjust icon */
    font-size: 1.8rem;
  }

  .title-icon {
    font-size: 1.3rem; /* Adjust icon size relative to title */
  }

  .page-description {
    font-size: 1rem;
  }
}

@media (max-width: 768px) {
  .guides-view {
    padding-top: 60px; /* Adjust based on header height at this breakpoint */
    padding-bottom: 1rem; /* Reduce bottom padding */
  }

  .container {
    padding: 0 1rem;
  }

  .page-header {
    margin-bottom: 1.5rem;
  }

  .page-title {
    font-size: 1.6rem;
  }

  .title-icon {
    font-size: 1.2rem;
  }

  .page-description {
    font-size: 0.95rem;
  }
}

@media (max-width: 576px) {
  .guides-view {
    padding-top: 60px; /* Assuming header height doesn't change further significantly */
  }

  .page-title {
    font-size: 1.4rem;
    /* flex-direction: column; /* Example: stack icon and text if needed */
    /* align-items: center; */
  }

  .title-icon {
    font-size: 1.1rem;
    /* margin-right: 0; */
    /* margin-bottom: 0.3rem; */ /* If stacking */
  }

  .page-description {
    font-size: 0.9rem;
  }
}
</style>
