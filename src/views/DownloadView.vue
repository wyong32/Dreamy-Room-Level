<template>
  <div class="download-view">
    <!-- SEO Head -->
    <SeoHead pageType="download" />
    <div class="container">
      <div class="page-header">
        <h1 class="page-title"><span class="title-icon">⬇️</span> {{ $t('download.title') }}</h1>
        <p class="page-description">{{ $t('download.description') }}</p>
      </div>

      <div class="download-container">
        <div class="download-info">
          <h2>{{ $t('home.hero.title') }}</h2>
          <div class="download-buttons">
            <a
              href="https://apps.apple.com/us/app/dreamy-room/id6742221896"
              class="download-btn app-store"
              title="Download from App Store"
              target="_blank"
            >
              <div class="download-icon" aria-hidden="true">
                <span>🍎</span>
              </div>
              <div class="download-text">
                <span>{{ $t('download.buttons.appStore') }}</span>
                <strong>App Store</strong>
              </div>
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.abi.dream.unpacking"
              class="download-btn google-play"
              title="Download from Google Play"
              target="_blank"
            >
              <div class="download-icon" aria-hidden="true">
                <span>🤖</span>
              </div>
              <div class="download-text">
                <span>{{ $t('download.buttons.googlePlay') }}</span>
                <strong>Google Play</strong>
              </div>
            </a>
          </div>
        </div>

        <div class="download-image">
          <div class="phone-mockup" aria-label="Game mobile interface preview">
            <div class="phone-screen"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SeoHead from '@/components/SeoHead.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'DownloadView',
  components: {
    SeoHead,
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
}
</script>

<style scoped>
.download-view {
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

.download-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
  background: white;
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.download-info h2 {
  color: #6a4c93;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.download-info p {
  color: #555;
  margin-bottom: 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
}

.download-stats {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  color: #6a4c93;
}

.stat-label {
  color: #8a8a8a;
  font-size: 0.9rem;
}

.download-buttons {
  display: flex;
  gap: 1rem;
}

.download-btn {
  display: flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  color: white;
  border-radius: 10px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.app-store {
  background-color: #5e3577; /* Purple background for App Store */
}

.google-play {
  background-color: #5e3577; /* Purple background for Google Play */
}

.download-btn:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(94, 53, 119, 0.3);
}

.download-icon {
  font-size: 1.8rem;
  margin-right: 0.8rem;
}

.download-text {
  display: flex;
  flex-direction: column;
}

.download-text span {
  font-size: 0.7rem;
  color: #fff;
}

.download-text strong {
  font-size: 1.1rem;
  color: #fff;
}

.download-image {
  display: flex;
  justify-content: center;
  align-items: center;
}

.phone-mockup {
  width: 280px;
  height: 550px;
  background-color: #333;
  border-radius: 40px;
  padding: 10px;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #b19cd9 0%, #6a4c93 100%);
  border-radius: 30px;
  overflow: hidden;
  position: relative;
}
.phone-screen::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('images/phone-screen.webp') center/cover no-repeat;
  opacity: 0.8;
}

.system-requirements {
  margin-top: 3rem;
}

.system-requirements h2 {
  color: #6a4c93;
  text-align: center;
  margin-bottom: 2rem;
}

.requirements-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.requirement-card {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.requirement-card h3 {
  color: #6a4c93;
  margin-bottom: 1rem;
  text-align: center;
}

.requirement-card ul {
  list-style-type: none;
  padding: 0;
}

.requirement-card li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0e6ff;
  color: #555;
}

.requirement-card li:last-child {
  border-bottom: none;
}

@media (max-width: 992px) {
  .download-view {
    padding: 1.8rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .page-header {
    margin-bottom: 2.5rem;
  }

  .page-title {
    font-size: 2.2rem;
  }

  .title-icon {
    font-size: 1.3rem;
  }

  .page-description {
    font-size: 1rem;
  }

  .download-container {
    padding: 2.5rem;
    gap: 2rem;
  }

  .download-info h2 {
    font-size: 1.8rem;
  }

  .download-buttons {
    flex-wrap: wrap;
  }

  .download-btn {
    padding: 0.7rem 1.3rem;
  }

  .download-icon {
    font-size: 1.6rem;
  }

  .download-text strong {
    font-size: 1rem;
  }

  .phone-mockup {
    width: 240px;
    height: 470px;
  }
}

@media (max-width: 768px) {
  .download-view {
    padding: 1.5rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .page-header {
    margin-bottom: 2rem;
  }

  .page-title {
    font-size: 1.8rem;
  }

  .title-icon {
    font-size: 1.2rem;
  }

  .page-description {
    font-size: 0.9rem;
  }

  .download-container {
    grid-template-columns: 1fr;
    padding: 2rem 1.5rem;
    gap: 1.5rem;
    margin-bottom: 3rem;
  }

  .download-info {
    text-align: center;
  }

  .download-info h2 {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }

  .download-buttons {
    justify-content: center;
    gap: 0.8rem;
  }

  .download-btn {
    padding: 0.6rem 1.2rem;
  }

  .download-icon {
    font-size: 1.5rem;
    margin-right: 0.6rem;
  }

  .download-text span {
    font-size: 0.65rem;
  }

  .download-text strong {
    font-size: 0.9rem;
  }

  .phone-mockup {
    width: 220px;
    height: 430px;
  }

  .requirements-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .requirement-card {
    padding: 1.5rem;
  }

  .requirement-card h3 {
    font-size: 1.3rem;
  }

  .requirement-card li {
    font-size: 0.9rem;
    padding: 0.4rem 0;
  }
}

@media (max-width: 480px) {
  .download-view {
    padding: 1.2rem 0;
  }

  .container {
    padding: 0 0.8rem;
  }

  .page-title {
    font-size: 1.6rem;
  }

  .title-icon {
    font-size: 1.1rem;
  }

  .page-description {
    font-size: 0.85rem;
  }

  .download-container {
    padding: 1.5rem 1rem;
    border-radius: 15px;
  }

  .download-info h2 {
    font-size: 1.4rem;
  }

  .download-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 250px;
    margin: 0 auto;
  }

  .download-btn {
    width: 100%;
    justify-content: center;
  }

  .phone-mockup {
    width: 180px;
    height: 350px;
    border-radius: 30px;
  }

  .phone-screen {
    border-radius: 22px;
  }

  .requirement-card {
    padding: 1.2rem;
  }

  .requirement-card h3 {
    font-size: 1.2rem;
  }

  .requirement-card li {
    font-size: 0.85rem;
  }
}
</style>
