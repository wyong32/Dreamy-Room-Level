<template>
  <div>
    <!-- SEO Head -->
    <SeoHead pageType="home" />
    <!-- Hero Section -->
    <section class="hero" aria-labelledby="hero-title">
      <!-- <div class="floating-bubbles" aria-hidden="true">
        <div
          class="bubble"
          v-for="n in 10"
          :key="n"
          :style="{
            left: `${Math.random() * 100}%`,
            width: `${Math.random() * 60 + 20}px`,
            height: `${Math.random() * 60 + 20}px`,
            animationDuration: `${Math.random() * 10 + 5}s`,
            animationDelay: `${Math.random() * 5}s`,
          }"
        ></div>
      </div> -->
      <div class="hero-content">
        <h1 id="hero-title">{{ $t('home.hero.title') }}</h1>
        <p>{{ $t('home.hero.subtitle') }}</p>
        <div class="hero-buttons">
          <a
            href="javascript:void(0)"
            @click="scrollToSection('guides')"
            class="btn-primary"
            :title="$t('home.hero.viewGuides')"
            >{{ $t('home.hero.viewGuides') }}</a
          >
          <a
            href="javascript:void(0)"
            @click="scrollToSection('download')"
            class="btn-secondary"
            :title="$t('home.hero.downloadGame')"
            >{{ $t('home.hero.downloadGame') }}</a
          >
        </div>
      </div>
    </section>

    <!-- Game Features -->
    <section id="features" class="features" aria-labelledby="features-title">
      <h2 id="features-title" class="section-title">
        <span class="title-icon">✨</span> {{ $t('home.features.title') }}
      </h2>
      <div class="feature-items">
        <article class="feature-item">
          <div class="feature-icon" aria-hidden="true">🏠</div>
          <h3>{{ $t('home.features.dreamyScenes.title') }}</h3>
          <p>{{ $t('home.features.dreamyScenes.description') }}</p>
        </article>
        <article class="feature-item">
          <div class="feature-icon" aria-hidden="true">🧩</div>
          <h3>{{ $t('home.features.puzzleChallenges.title') }}</h3>
          <p>{{ $t('home.features.puzzleChallenges.description') }}</p>
        </article>
        <article class="feature-item">
          <div class="feature-icon" aria-hidden="true">🎨</div>
          <h3>{{ $t('home.features.freeDecoration.title') }}</h3>
          <p>{{ $t('home.features.freeDecoration.description') }}</p>
        </article>
      </div>
    </section>

    <!-- Game Guides Section -->
    <section id="guides" class="guides" aria-labelledby="guides-title">
      <h2 id="guides-title" class="section-title">
        <span class="title-icon">📖</span> {{ $t('home.guides.title') }}
      </h2>
      <div class="container">
        <GameGuides />
      </div>
    </section>

    <!-- Download Game -->
    <section id="download" class="download" aria-labelledby="download-title">
      <h2 id="download-title" class="section-title">
        <span class="title-icon">⬇️</span> {{ $t('home.download.title') }}
      </h2>
      <div class="download-container">
        <div class="download-info">
          <h3>{{ $t('home.hero.title') }}</h3>
          <p>{{ $t('home.download.subtitle') }}</p>
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
                <span>{{ $t('home.download.buttons.appStore') }}</span>
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
                <span>{{ $t('home.download.buttons.googlePlay') }}</span>
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
    </section>

    <!-- About the Game -->
    <section id="about" class="about" aria-labelledby="about-title">
      <h2 id="about-title" class="section-title">
        <span class="title-icon">ℹ️</span> {{ $t('home.about.title') }}
      </h2>
      <div class="about-container">
        <div class="about-image">
          <div class="image-frame" aria-label="Game scene showcase"></div>
        </div>
        <div class="about-content">
          <h3>{{ $t('home.about.storyTitle') }}</h3>
          <p>
            {{ $t('home.about.story1') }}
          </p>
          <p>
            {{ $t('home.about.story2') }}
          </p>
          <ul class="about-features">
            <li class="about-feature">
              <div class="feature-dot" aria-hidden="true"></div>
              <span>{{ $t('home.about.features.levels') }}</span>
            </li>
            <li class="about-feature">
              <div class="feature-dot" aria-hidden="true"></div>
              <span>{{ $t('home.about.features.atmosphere') }}</span>
            </li>
            <li class="about-feature">
              <div class="feature-dot" aria-hidden="true"></div>
              <span>{{ $t('home.about.features.updates') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Tips and Tricks -->
    <section id="tips" class="tips" aria-labelledby="tips-title">
      <h2 id="tips-title" class="section-title">
        <span class="title-icon">💡</span> {{ $t('home.tips.title') }}
      </h2>
      <div class="tips-container">
        <article class="tip-card">
          <div class="tip-icon" aria-hidden="true">💡</div>
          <h3>{{ $t('home.tips.observeDetails.title') }}</h3>
          <p>
            {{ $t('home.tips.observeDetails.description') }}
          </p>
        </article>
        <article class="tip-card">
          <div class="tip-icon" aria-hidden="true">🔍</div>
          <h3>{{ $t('home.tips.tryCombinations.title') }}</h3>
          <p>
            {{ $t('home.tips.tryCombinations.description') }}
          </p>
        </article>
        <article class="tip-card">
          <div class="tip-icon" aria-hidden="true">🎯</div>
          <h3>{{ $t('home.tips.colorMatching.title') }}</h3>
          <p>
            {{ $t('home.tips.colorMatching.description') }}
          </p>
        </article>
      </div>
    </section>

    <!-- Frequently Asked Questions -->
    <section id="faq" class="faq" aria-labelledby="faq-title">
      <h2 id="faq-title" class="section-title">
        <span class="title-icon">❓</span> {{ $t('home.faq.title') }}
      </h2>
      <div class="faq-container">
        <details class="faq-item">
          <summary class="faq-question">
            <h3>{{ $t('home.faq.questions.howToStart.question') }}</h3>
            <div class="faq-toggle" aria-hidden="true">+</div>
          </summary>
          <div class="faq-answer">
            <p>
              {{ $t('home.faq.questions.howToStart.answer') }}
            </p>
          </div>
        </details>
        <details class="faq-item">
          <summary class="faq-question">
            <h3>{{ $t('home.faq.questions.isFree.question') }}</h3>
            <div class="faq-toggle" aria-hidden="true">+</div>
          </summary>
          <div class="faq-answer">
            <p>
              {{ $t('home.faq.questions.isFree.answer') }}
            </p>
          </div>
        </details>
        <details class="faq-item">
          <summary class="faq-question">
            <h3>{{ $t('home.faq.questions.unlockLevels.question') }}</h3>
            <div class="faq-toggle" aria-hidden="true">+</div>
          </summary>
          <div class="faq-answer">
            <p>
              {{ $t('home.faq.questions.unlockLevels.answer') }}
            </p>
          </div>
        </details>
        <details class="faq-item">
          <summary class="faq-question">
            <h3>{{ $t('home.faq.questions.languages.question') }}</h3>
            <div class="faq-toggle" aria-hidden="true">+</div>
          </summary>
          <div class="faq-answer">
            <p>
              {{ $t('home.faq.questions.languages.answer') }}
            </p>
          </div>
        </details>
        <details class="faq-item">
          <summary class="faq-question">
            <h3>{{ $t('home.faq.questions.problems.question') }}</h3>
            <div class="faq-toggle" aria-hidden="true">+</div>
          </summary>
          <div class="faq-answer">
            <p>
              {{ $t('home.faq.questions.problems.answer') }}
            </p>
          </div>
        </details>
      </div>
    </section>
  </div>
</template>

<script>
import GameGuides from '@/components/GameGuides.vue'
import SeoHead from '@/components/SeoHead.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'HomeView',
  components: {
    GameGuides,
    SeoHead,
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {}
  },
  mounted() {
    // 添加滚动动画
    this.addScrollAnimation()

    // 添加FAQ点击事件
    this.setupFaqToggle()
  },
  methods: {
    // 添加滚动动画
    addScrollAnimation() {
      const sections = document.querySelectorAll('section')

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate')
            }
          })
        },
        { threshold: 0.1 }
      )

      sections.forEach((section) => {
        observer.observe(section)
      })
    },

    // 设置FAQ点击事件
    setupFaqToggle() {
      const faqItems = document.querySelectorAll('details.faq-item')

      faqItems.forEach((item) => {
        const toggle = item.querySelector('.faq-toggle')

        // 监听details的open状态变化
        item.addEventListener('toggle', () => {
          if (item.open) {
            // 当打开时，更改加号为减号
            toggle.textContent = '−'

            // 关闭其他所有FAQ项
            faqItems.forEach((otherItem) => {
              if (otherItem !== item && otherItem.open) {
                otherItem.open = false
                otherItem.querySelector('.faq-toggle').textContent = '+'
              }
            })
          } else {
            // 当关闭时，更改减号为加号
            toggle.textContent = '+'
          }
        })
      })
    },

    // 平滑滚动到指定区域
    scrollToSection(sectionId) {
      const section = document.getElementById(sectionId)
      if (section) {
        // 获取头部导航的高度
        const headerHeight = document.querySelector('.header').offsetHeight

        // 计算目标位置，考虑头部导航的高度
        const targetPosition =
          section.getBoundingClientRect().top + window.pageYOffset - headerHeight

        // 使用平滑滚动
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })
      }
    },
  },
}
</script>

<style scoped>
/* 基础样式 */
main {
  max-width: 100%;
  overflow-x: hidden;
  background-color: #faf5ff;
  color: #6a4c93;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 英雄区域浮动气泡 */
.floating-bubbles {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.bubble {
  position: absolute;
  bottom: -100px;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  opacity: 0.5;
  animation: rise 15s infinite ease-in;
}

@keyframes rise {
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.5;
  }
  100% {
    transform: translateY(-1000px) scale(1.5);
    opacity: 0;
  }
}

/* 英雄区域 */
.hero {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, #c2e9fb 0%, #a1c4fd 100%);
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 2rem;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #6a4c93;
  text-shadow: 3px 3px 0px rgba(255, 255, 255, 0.5);
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #6a4c93;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn-primary,
.btn-secondary {
  display: inline-block;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.btn-primary {
  background-color: #ff6b6b;
  color: white;
  box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
}

.btn-secondary {
  background-color: white;
  color: #6a4c93;
  box-shadow: 0 5px 15px rgba(106, 76, 147, 0.2);
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.btn-primary::after,
.btn-secondary::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.6s ease, height 0.6s ease;
  z-index: -1;
}

.btn-primary:hover::after,
.btn-secondary:hover::after {
  width: 300px;
  height: 300px;
}

/* 章节标题 */
.section-title {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
  display: inline-flex;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  padding-bottom: 1rem;
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

.section-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;
  height: 4px;
  background: linear-gradient(90deg, transparent, #b19cd9, transparent);
  border-radius: 2px;
}

/* 游戏特色 */
.features {
  padding: 5rem 2rem;
  padding-top: 100px; /* 增加顶部内边距，避免被头部导航栏遮挡 */
  background-color: #fff;
  position: relative;
}

.feature-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item {
  text-align: center;
  padding: 2rem;
  border-radius: 20px;
  background: #f9f7fe;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
}

.feature-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(106, 76, 147, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;
}

.feature-icon::after {
  content: '';
  position: absolute;
  width: 50px;
  height: 50px;
  background: rgba(255, 107, 107, 0.1);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  transition: all 0.3s ease;
}

.feature-item:hover .feature-icon::after {
  width: 70px;
  height: 70px;
  background: rgba(255, 107, 107, 0.2);
}

.feature-item h3 {
  margin-bottom: 0.5rem;
  color: #6a4c93;
}

/* 游戏指南 */
.guides {
  padding: 5rem 2rem;
  background-color: #f9f7fe;
  position: relative;
  scroll-margin-top: 80px; /* 考虑头部导航的高度 */
}

/* 下载游戏 */
.download {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  scroll-margin-top: 80px; /* 考虑头部导航的高度 */
}

.download-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  gap: 2rem;
}

.download-info {
  flex: 1;
  padding: 2rem;
}

.download-info h3 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #6a4c93;
}

.download-info p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  color: #6a4c93;
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
  color: #ff6b6b;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 0.9rem;
  color: #6a4c93;
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
  font-size: 0.8rem;
  color: #fff;
}

.download-text strong {
  font-size: 1.2rem;
  color: #fff;
}

.download-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.phone-mockup {
  width: 280px;
  height: 550px;
  background-color: #333;
  border-radius: 40px;
  position: relative;
  padding: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  transform: rotate(-5deg);
  transition: all 0.5s ease;
}

.phone-mockup:hover {
  transform: rotate(0deg) scale(1.05);
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: linear-gradient(45deg, #ff9a8b, #ff6a88, #ff99ac);
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
  background: url('/images/phone-screen.webp') center/cover no-repeat;
  opacity: 0.8;
}

/* 关于游戏 */
.about {
  padding: 5rem 2rem;
  background-color: #fff;
  position: relative;
}

.about-container {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 3rem;
}

.about-image {
  flex: 1;
  display: flex;
  justify-content: center;
}

.image-frame {
  width: 400px;
  height: 400px;
  border-radius: 20px;
  background: linear-gradient(45deg, #ff9a8b, #ff6a88, #ff99ac);
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(106, 76, 147, 0.15);
  transition: all 0.5s ease;
}

.image-frame:hover {
  transform: scale(1.05);
  box-shadow: 0 30px 60px rgba(106, 76, 147, 0.2);
}

.image-frame::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/images/about-image.webp') center/cover no-repeat;
  opacity: 0.8;
}

.about-content {
  flex: 1;
  padding: 2rem;
}

.about-content h3 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #6a4c93;
}

.about-content p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
  color: #6a4c93;
}

.about-features {
  margin-top: 2rem;
}

.about-feature {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.feature-dot {
  width: 12px;
  height: 12px;
  background-color: #ff6b6b;
  border-radius: 50%;
  margin-right: 1rem;
}

/* 提示与技巧 */
.tips {
  padding: 5rem 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
}

.tips-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 固定一行放3个 */
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.tip-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  transition: all 0.5s ease;
  position: relative;
  overflow: hidden;
}

.tip-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(106, 76, 147, 0.1);
}

.tip-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 5px;
  background: linear-gradient(90deg, #ff9a8b, #ff6a88, #ff99ac);
  transition: height 0.5s ease;
}

.tip-card:hover::before {
  height: 10px;
}

.tip-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
}

.tip-card h3 {
  margin-bottom: 1rem;
  color: #6a4c93;
}

/* 常见问题 */
.faq {
  padding: 5rem 2rem;
  background-color: #fff;
  position: relative;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  margin-bottom: 1.5rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 10px 30px rgba(106, 76, 147, 0.1);
}

/* 移除details的默认样式 */
details.faq-item {
  list-style: none;
}

details.faq-item summary {
  list-style: none;
}

details.faq-item summary::-webkit-details-marker {
  display: none;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  background-color: #f9f7fe;
  cursor: pointer;
}

.faq-question h3 {
  margin: 0;
  color: #6a4c93;
  font-size: 1.2rem;
}

.faq-toggle {
  font-size: 1.5rem;
  color: #ff6b6b;
  transition: transform 0.3s ease;
}

.faq-answer {
  padding: 1.5rem;
  background-color: #fff;
}

/* 当details打开时的样式 */
details.faq-item[open] .faq-toggle {
  transform: rotate(45deg);
}

details.faq-item:not([open]) .faq-answer {
  display: none;
}

/* 滚动动画 */
section {
  opacity: 0;
  transform: translateY(50px);
  transition: all 1s ease;
}

section.animate {
  opacity: 1;
  transform: translateY(0);
}

/* FAQ 激活状态 */
.faq-item.active .faq-answer {
  padding: 1.5rem;
  max-height: 200px;
}

.faq-item.active .faq-toggle {
  transform: rotate(45deg);
}

/* --- 响应式设计 --- */
@media (max-width: 992px) {
  .container {
    padding: 0 1.5rem;
  }

  .hero h1 {
    font-size: 3.5rem;
  }

  .hero p {
    font-size: 1.3rem;
  }

  .download-container {
    flex-direction: column;
    text-align: center;
  }

  .download-info {
    padding: 1rem 0; /* 调整内边距 */
  }

  .download-buttons {
    justify-content: center; /* 居中下载按钮 */
  }

  .phone-mockup {
    width: 250px; /* 缩小手机模型 */
    height: auto; /* 高度自适应 */
    aspect-ratio: 280 / 550; /* 保持原始宽高比 */
    margin-top: 2rem;
  }

  .about-container {
    flex-direction: column;
    text-align: center;
  }

  .about-image {
    margin-bottom: 2rem;
  }

  .image-frame {
    width: 350px; /* 缩小图片框架 */
    height: 350px;
  }

  .tips-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-title {
    font-size: 1.8rem; /* 调整章节标题大小 */
  }
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.8rem;
  }

  .hero p {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column; /* 按钮垂直排列 */
    gap: 0.8rem;
  }

  .btn-primary,
  .btn-secondary {
    padding: 0.8rem 1.5rem; /* 调整按钮内边距 */
    width: 100%; /* 按钮宽度占满 */
    max-width: 300px; /* 最大宽度，避免过宽 */
    margin-left: auto;
    margin-right: auto;
  }

  .features {
    padding: 1rem;
  }

  .feature-items {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* 特色项改为单列 */
    gap: 0.5rem;
  }

  .guides {
    padding: 1rem 0;
  }

  .download-info h3 {
    font-size: 2rem; /* 调整下载区域标题大小 */
  }

  .download-info p {
    font-size: 1rem; /* 调整下载区域描述文字大小 */
  }

  .download-buttons {
    flex-direction: column; /* 下载按钮垂直排列 */
    align-items: center;
  }

  .download-btn {
    width: 100%;
    max-width: 280px; /* 统一按钮宽度 */
  }

  .phone-mockup {
    width: 220px;
  }

  .image-frame {
    width: 300px;
    height: 300px;
  }

  .about-content h3 {
    font-size: 1.8rem;
  }

  .tips-container {
    grid-template-columns: 1fr;
  }

  .faq-question h3 {
    font-size: 1rem; /* FAQ问题字体 */
  }

  .tip-card h3 {
    font-size: 1.2rem;
  }

  .faq {
    padding: 1rem;
  }

  .faq-question {
    padding: 0.5rem;
  }

  .faq-container {
    padding: 0;
  }
}

@media (max-width: 576px) {
  .container {
    padding: 0 1rem;
  }

  .hero h1 {
    font-size: 2.2rem;
  }

  .hero p {
    font-size: 1rem;
  }

  .section-title {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .feature-item {
    padding: 0.5rem 0; /* 调整特色项内边距 */
  }

  .feature-icon {
    font-size: 2.5rem; /* 调整特色项图标大小 */
    margin-bottom: 0.5rem;
  }

  .feature-item h3 {
    font-size: 1rem; /* 调整特色项标题大小 */
    line-height: 1;
  }

  .download {
    padding: 1rem;
  }
  .download-info {
    padding: 0;
  }
  .download-info h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
  .download-info p {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
  .download-container {
    gap: 0.5rem;
  }
  .download-btn {
    padding: 0.5rem 1rem;
  }

  .phone-mockup {
    width: 180px;
  }

  .image-frame {
    width: 100%; /* 图片框架宽度占满，由父容器控制 */
    max-width: 280px;
    height: auto;
    aspect-ratio: 1 / 1; /* 保持方形 */
  }

  .about {
    padding: 1rem;
  }

  .about-container {
    display: block;
  }

  .about-image {
    margin-bottom: 1rem;
  }

  .about-content h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .about-content {
    padding: 0;
  }

  .about-content p {
    margin-bottom: 0.5rem;
  }

  .about-features {
    margin-top: 0;
  }

  .tips {
    padding: 1rem;
  }

  .tips-container {
    padding: 0;
  }

  .tip-card {
    padding: 0.5rem; /* 调整提示卡片内边距 */
  }
}
</style>
