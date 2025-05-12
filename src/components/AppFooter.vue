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
            <router-link :to="getLocalizedPath('/blog')" :title="$t('footer.quickLinks.blog')">{{
              $t('footer.quickLinks.blog')
            }}</router-link>
            <router-link
              :to="getLocalizedPath('/download')"
              :title="$t('footer.quickLinks.download')"
              >{{ $t('footer.quickLinks.download') }}</router-link
            >
            <!-- 暂时注释掉About链接，因为路由中没有定义 -->
            <!-- <router-link :to="getLocalizedPath('/about')" :title="$t('footer.quickLinks.about')">{{
              $t('footer.quickLinks.about')
            }}</router-link> -->
          </nav>
        </div>

        <!-- Middle Column - Levels -->
        <div class="footer-column">
          <h3 class="footer-title">
            <span class="footer-icon">🎮</span> {{ $t('footer.levels.title') }}
          </h3>
          <nav class="footer-nav" aria-label="Levels Navigation">
            <a href="#" title="View Dreamy Room Level 96">Dreamy Room Level 96</a>
            <a href="#" title="View Dreamy Room Level 97">Dreamy Room Level 97</a>
            <a href="#" title="View Dreamy Room Level 98">Dreamy Room Level 98</a>
            <a href="#" title="View Dreamy Room Level 99">Dreamy Room Level 99</a>
            <a href="#" title="View Dreamy Room Level 100">Dreamy Room Level 100</a>
            <a href="#" title="View Dreamy Room Level 101">Dreamy Room Level 101</a>
            <a href="#" title="View Dreamy Room Level 102">Dreamy Room Level 102</a>
            <a href="#" title="View Dreamy Room Level 103">Dreamy Room Level 103</a>
          </nav>
        </div>

        <!-- Right Column - Legal -->
        <div class="footer-column">
          <h3 class="footer-title">
            <span class="footer-icon">📜</span> {{ $t('footer.legal.title') }}
          </h3>
          <nav class="footer-nav" aria-label="Legal Navigation">
            <a href="/privacy" :title="$t('footer.legal.privacy')">{{
              $t('footer.legal.privacy')
            }}</a>
            <a href="/terms" :title="$t('footer.legal.terms')">{{ $t('footer.legal.terms') }}</a>
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
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
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
  }

  .footer-columns {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1.5rem;
    margin-bottom: 2rem;
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
  }

  .footer-columns {
    grid-template-columns: 1fr;
    gap: 1.2rem;
    margin-bottom: 1.5rem;
  }

  .footer-column {
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .footer-column:last-child {
    border-bottom: none;
  }

  .footer-logo {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }

  .footer-desc {
    margin-bottom: 1rem;
    font-size: 0.85rem;
  }

  .footer-title {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }

  .footer-icon {
    font-size: 1rem;
  }

  .social-link {
    width: 32px;
    height: 32px;
  }

  .copyright {
    font-size: 0.8rem;
  }

  .disclaimer {
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 0.8rem;
  }

  .footer-columns {
    gap: 1rem;
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

  .social-link {
    width: 28px;
    height: 28px;
    font-size: 0.9rem;
  }
}
</style>
