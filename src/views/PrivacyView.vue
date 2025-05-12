<template>
  <div class="privacy-policy">
    <SeoHead
      pageType="privacy"
      customTitle="Privacy Policy - Dreamy Room Level"
      customDescription="Privacy Policy for Dreamy Room Level - Learn how we collect, use, and protect your information."
      customKeywords="privacy policy, data protection, personal information, dreamy room level"
    />
    <div class="container">
      <div class="policy-header">
        <h1>Privacy Policy</h1>
        <p class="last-updated">Last Updated: {{ currentDate }}</p>
      </div>

      <div class="policy-content">
        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to Dreamy Room Level ("we," "our," or "us"). We respect your privacy and are
            committed to protecting your personal information. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our website.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this
            Privacy Policy, please do not access the site.
          </p>
        </section>

        <section>
          <h2>Information We Collect</h2>
          <p>We may collect information about you in various ways, including:</p>
          <h3>Information You Provide to Us</h3>
          <p>
            We may collect information that you voluntarily provide when using our website, such as
            when you contact us or subscribe to our newsletter.
          </p>
          <h3>Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your
            device, including information about your web browser, IP address, time zone, and some of
            the cookies that are installed on your device.
          </p>
        </section>

        <section>
          <h2>How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including:</p>
          <ul>
            <li>To provide and maintain our website</li>
            <li>To improve our website and user experience</li>
            <li>To understand how visitors use our website</li>
            <li>To respond to your inquiries and fulfill your requests</li>
            <li>To send you updates, newsletters, and marketing communications</li>
          </ul>
        </section>

        <section>
          <h2>Cookies and Tracking Technologies</h2>
          <p>
            We may use cookies and similar tracking technologies to track activity on our website
            and hold certain information. Cookies are files with a small amount of data that may
            include an anonymous unique identifier. You can instruct your browser to refuse all
            cookies or to indicate when a cookie is being sent.
          </p>
        </section>

        <section>
          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services, such as Google Analytics, to help us understand how
            visitors use our website. These third-party service providers have their own privacy
            policies addressing how they use such information.
          </p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>
            We have implemented appropriate technical and organizational security measures designed
            to protect the security of any personal information we process. However, please note
            that no method of transmission over the Internet or method of electronic storage is 100%
            secure.
          </p>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>
            Our website is not intended for children under 13 years of age. We do not knowingly
            collect personal information from children under 13.
          </p>
        </section>

        <section>
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by
            posting the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p>
            <a href="mailto:privacy@dreamy-room-level.com">privacy@dreamy-room-level.com</a>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import SeoHead from '@/components/SeoHead.vue'

export default {
  name: 'PrivacyView',
  components: {
    SeoHead,
  },
  computed: {
    currentDate() {
      const date = new Date()
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    },
  },
}
</script>

<style scoped>
.privacy-policy {
  padding: 5rem 0 2rem 0;
  background-color: #f9f7fe;
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.policy-header {
  text-align: center;
  margin-bottom: 3rem;
}

.policy-header h1 {
  color: #6a4c93;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.last-updated {
  color: #9370db;
  font-size: 0.9rem;
}

.policy-content {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

section {
  margin-bottom: 2rem;
}

h2 {
  color: #6a4c93;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

h3 {
  color: #6a4c93;
  margin: 1.5rem 0 0.8rem;
  font-size: 1.4rem;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

ul {
  margin-left: 1.5rem;
  margin-bottom: 1.5rem;
}

li {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

a {
  color: #9370db;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* --- Responsive Design (Copied from TermsView.vue and adapted) --- */
@media (max-width: 992px) {
  .privacy-policy {
    /* Adapted from .terms-of-service */
    padding: 3rem 0 1.5rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .policy-header h1 {
    /* Adapted from .terms-header h1 */
    font-size: 2.2rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.3rem;
  }

  .policy-content {
    /* Adapted from .terms-content */
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .privacy-policy {
    /* Adapted from .terms-of-service */
    padding: 2rem 0 1rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .policy-header {
    /* Adapted from .terms-header */
    margin-bottom: 2rem;
  }

  .policy-header h1 {
    /* Adapted from .terms-header h1 */
    font-size: 2rem;
  }

  .last-updated {
    font-size: 0.85rem;
  }

  section {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 0.8rem;
  }

  h3 {
    font-size: 1.2rem;
    margin-top: 1.2rem;
    margin-bottom: 0.6rem;
  }

  p,
  li {
    font-size: 0.95rem;
    line-height: 1.7; /* Slightly increase line-height for readability on mobile */
  }

  ul {
    margin-left: 1rem; /* Reduce list indentation */
    margin-bottom: 1rem;
  }
}

@media (max-width: 576px) {
  .privacy-policy {
    /* Adapted from .terms-of-service */
    padding: 3rem 0 1rem 0;
  }

  .policy-header h1 {
    /* Adapted from .terms-header h1 */
    font-size: 1.8rem;
  }

  .last-updated {
    font-size: 0.8rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  p,
  li {
    font-size: 0.9rem;
  }

  .policy-content {
    /* Adapted from .terms-content */
    padding: 1rem;
  }

  ul {
    padding-left: 1.2rem; /* Adjusted from margin-left for better control with list-style-position if needed */
  }
}
</style>
