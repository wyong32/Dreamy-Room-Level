<template>
  <div class="guides-view">
    <!-- SEO Head -->
    <SeoHead pageType="guides" />
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">
          <span class="title-icon">
            <svg
              t="1756797503420"
              class="icon"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="154982"
              width="200"
              height="200"
            >
              <path
                d="M150.588235 0h722.82353c83.169882 0 150.588235 67.418353 150.588235 150.588235v722.82353c0 83.169882-67.418353 150.588235-150.588235 150.588235H150.588235C67.418353 1024 0 956.581647 0 873.411765V150.588235C0 67.418353 67.418353 0 150.588235 0z m155.602824 712.779294V662.588235a50.221176 50.221176 0 0 1 50.206117-50.191059h401.558589V261.014588A50.221176 50.221176 0 0 0 707.764706 210.823529H306.191059A50.221176 50.221176 0 0 0 256 261.014588v501.970824A50.221176 50.221176 0 0 0 306.191059 813.176471H707.764706a50.221176 50.221176 0 0 0 50.191059-50.191059H356.397176a50.221176 50.221176 0 0 1-50.206117-50.206118z m386.514823 0A25.088 25.088 0 1 0 692.705882 662.588235H341.338353a25.088 25.088 0 1 0 0 50.191059H692.705882z"
                fill="#29AB91"
                p-id="154983"
              ></path>
            </svg>
          </span>
          {{ $t('guides.title') }}
        </h1>
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
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 0.5rem;
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
