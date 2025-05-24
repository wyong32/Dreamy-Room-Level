<template>
  <!-- Footer -->
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-columns">
        <!-- Left Column - About -->
        <div class="footer-column">
          <div class="footer-logo">{{ $t('home.hero.title') }}</div>
          <p class="footer-desc">
            {{ $t('footer.about.description') }}
          </p>
          <div class="social-links">
            <a href="#" class="social-link" title="Follow us on Twitter" aria-label="Twitter"
              ><i class="social-icon">🐦</i></a
            >
            <a href="#" class="social-link" title="Follow us on Instagram" aria-label="Instagram"
              ><i class="social-icon">📷</i></a
            >
            <a href="#" class="social-link" title="Join our Discord" aria-label="Discord"
              ><i class="social-icon">💬</i></a
            >
          </div>
        </div>

        <!-- Middle Column - Quick Links -->
        <div class="footer-column">
          <h3 class="footer-title">
            <span class="footer-icon">🔗</span> {{ $t('footer.quickLinks.title') }}
          </h3>
          <nav class="footer-nav" aria-label="Quick Links Navigation">
            <router-link :to="getLocalizedPath('/')" :title="$t('footer.quickLinks.home')">{{
              $t('footer.quickLinks.home')
            }}</router-link>
            <router-link
              :to="getLocalizedPath('/guides')"
              :title="$t('footer.quickLinks.guides')"
              >{{ $t('footer.quickLinks.guides') }}</router-link
            >
            <router-link
              :to="getLocalizedPath('/dreamy-room-game-blog')"
              :title="$t('footer.quickLinks.blog')"
              >{{ $t('footer.quickLinks.blog') }}</router-link
            >
            <router-link
              :to="getLocalizedPath('/download-dreamy-room-game')"
              :title="$t('footer.quickLinks.download')"
              >{{ $t('footer.quickLinks.download') }}</router-link
            >
            <router-link :to="getLocalizedPath('/about')" :title="$t('footer.quickLinks.about')">{{
              $t('footer.quickLinks.about')
            }}</router-link>
            <router-link :to="getLocalizedPath('/contact')" title="Contact Us">
              Contact Us
            </router-link>
          </nav>
        </div>

        <!-- Middle Column - Levels -->
        <div class="footer-column">
          <h3 class="footer-title">
            <span class="footer-icon">🎮</span> {{ $t('footer.levels.title') }}
          </h3>
          <nav class="footer-nav" aria-label="Levels Navigation">
            <a href="/dreamy-room-level-15" title="View Dreamy Room Level 15"
              >Dreamy Room Level 15</a
            >
            <a href="/dreamy-room-level-16" title="View Dreamy Room Level 16"
              >Dreamy Room Level 16</a
            >
            <a href="/dreamy-room-level-22" title="View Dreamy Room Level 22"
              >Dreamy Room Level 22</a
            >
            <a href="/dreamy-room-level-25" title="View Dreamy Room Level 25"
              >Dreamy Room Level 25</a
            >
            <a href="/dreamy-room-level-50" title="View Dreamy Room Level 50"
              >Dreamy Room Level 50</a
            >
            <a href="/dreamy-room-level-56" title="View Dreamy Room Level 56"
              >Dreamy Room Level 56</a
            >
          </nav>
        </div>

        <!-- Right Column - Legal -->
        <div class="footer-column">
          <h3 class="footer-title">
            <span class="footer-icon">📜</span> {{ $t('footer.legal.title') }}
          </h3>
          <nav class="footer-nav" aria-label="Legal Navigation">
            <router-link :to="getLocalizedPath('/privacy')" :title="$t('footer.legal.privacy')">{{
              $t('footer.legal.privacy')
            }}</router-link>
            <router-link :to="getLocalizedPath('/terms')" :title="$t('footer.legal.terms')">{{
              $t('footer.legal.terms')
            }}</router-link>
          </nav>
        </div>
      </div>

      <p class="copyright">{{ $t('footer.copyright') }}</p>
      <p class="disclaimer">
        {{ $t('footer.disclaimer') }}
      </p>
    </div>
  </footer>
</template>

<script>
import { useI18n } from 'vue-i18n'

export default {
  name: 'AppFooter',
  setup() {
    const { locale } = useI18n()

    // Helper function to get localized path
    const getLocalizedPath = (path) => {
      return locale.value === 'en' ? path : `/${locale.value}${path}`
    }

    return {
      getLocalizedPath,
      i18nLocale: locale,
    }
  },
}
</script>

<style scoped>
/* 页脚 */
.footer {
  background: #8b4513; /* 棕色背景 */
  color: white;
  padding: 3rem 2rem;
  /* 防止CLS优化 */
  contain: layout style paint;
  min-height: 400px;
  width: 100%;
  box-sizing: border-box;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  /* 防止CLS优化 */
  contain: layout style;
  min-height: 300px;
  width: 100%;
  box-sizing: border-box;
}

.footer-columns {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr; /* 固定列比例 */
  gap: 2rem;
  margin-bottom: 3rem;
  /* 防止CLS优化 */
  contain: layout style paint;
  min-height: 250px;
  width: 100%;
  box-sizing: border-box;
}

.footer-column {
  display: flex;
  flex-direction: column;
  /* 防止CLS优化 */
  min-height: 200px;
  contain: layout style;
  box-sizing: border-box;
}

.footer-column:nth-child(1) {
  min-height: 220px; /* 第一列稍高 */
}

.footer-column:nth-child(2),
.footer-column:nth-child(3),
.footer-column:nth-child(4) {
  min-height: 180px;
}

.footer-logo {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: white;
}

.footer-desc {
  margin-bottom: 1.5rem;
  opacity: 0.8;
  line-height: 1.6;
  font-size: 0.95rem;
  color: #fff;
}

.footer-title {
  font-size: 1.2rem;
  margin-bottom: 1.2rem;
  color: white;
  position: relative;
  display: flex;
  align-items: center;
}

.footer-icon {
  font-size: 1.1rem;
  margin-right: 0.5rem;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-nav a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 0.95rem;
}

.footer-nav a:hover {
  color: white;
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.social-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-3px);
}

.copyright {
  color: #fff;
  text-align: center;
  opacity: 0.7;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.disclaimer {
  color: #fff;
  text-align: center;
  opacity: 0.6;
  font-size: 0.8rem;
  max-width: 800px;
  margin: 0 auto;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .footer {
    padding: 2.5rem 1.5rem;
    min-height: 380px;
  }

  .footer-content {
    min-height: 280px;
  }

  .footer-columns {
    grid-template-columns: 1fr 1fr; /* 平板端2列布局 */
    gap: 1.5rem;
    margin-bottom: 2rem;
    min-height: 220px;
  }

  .footer-column:nth-child(1) {
    grid-column: 1 / -1; /* 第一列占满整行 */
    min-height: 120px;
  }

  .footer-column:nth-child(2) {
    grid-column: 1;
    min-height: 100px;
  }

  .footer-column:nth-child(3) {
    grid-column: 2;
    min-height: 100px;
  }

  .footer-column:nth-child(4) {
    grid-column: 1 / -1; /* 第四列占满整行 */
    min-height: 80px;
  }

  .footer-logo {
    font-size: 1.5rem;
  }

  .footer-desc {
    font-size: 0.9rem;
  }

  .footer-title {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .footer-nav {
    gap: 0.6rem;
  }

  .footer-nav a {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 1rem;
    min-height: 350px; /* 移动端固定最小高度 */
  }

  .footer-content {
    min-height: 250px; /* 移动端固定最小高度 */
  }

  .footer-columns {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    min-height: 180px; /* 固定最小高度防止CLS */
    contain: layout style paint;
  }

  .footer-column:nth-child(1) {
    grid-column: 1 / -1; /* 第一列占满整行 */
    min-height: 80px;
  }

  .footer-column:nth-child(2) {
    grid-column: 1;
    min-height: 100px;
  }

  .footer-column:nth-child(3) {
    display: none;
  }

  .footer-column:nth-child(4) {
    grid-column: 2;
    min-height: 100px;
  }

  .footer-logo {
    font-size: 1.4rem;
    /* text-align: center; */ /* If centering column content */
  }

  .footer-desc {
    font-size: 0.85rem;
    /* text-align: center; */ /* If centering column content */
  }

  .footer-title {
    font-size: 1rem;
    /* justify-content: center; */ /* If centering title with icon */
  }

  .footer-nav {
    gap: 0.5rem;
    /* align-items: center; */ /* If centering nav items */
  }

  .footer-nav a {
    font-size: 0.85rem;
  }

  .copyright {
    font-size: 0.8rem;
  }

  .disclaimer {
    font-size: 0.75rem;
  }
}

@media (max-width: 576px) {
  .footer-column {
    /* On very small screens, ensure content isn't too cramped */
    padding: 0 0.5rem; /* Add a little horizontal padding within columns if needed */
  }

  .footer-logo {
    font-size: 1.3rem;
  }

  .footer-desc {
    font-size: 0.8rem;
  }

  .footer-title {
    font-size: 0.95rem;
  }

  .footer-nav a {
    font-size: 0.8rem;
  }
}
</style>
