<template>
  <div class="contact-page">
    <SeoHead
      pageType="contact"
      customTitle="Contact Us - Dreamy Room Level"
      customDescription="Get in touch with the Dreamy Room Level team. We'd love to hear from you!"
      customKeywords="contact us, get in touch, feedback, support, dreamy room level"
    />
    <div class="container">
      <div class="contact-header">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Get in touch with our team.</p>
      </div>

      <div class="contact-content">
        <div class="contact-image">
          <img src="/images/guides_02.webp" alt="Contact Dreamy Room Level" />
        </div>

        <div class="contact-info">
          <div class="info-card">
            <div class="card-icon">❓</div>
            <h3>FAQs</h3>
            <p>Find answers to commonly asked questions:</p>
            <ul>
              <li>
                <strong>How often are guides updated?</strong>
                <p>
                  We update our guides regularly as new information becomes available or game
                  mechanics change.
                </p>
              </li>
              <li>
                <strong>Can I contribute to the guides?</strong>
                <p>
                  Yes! We welcome community contributions. Please email us with your suggestions .
                </p>
              </li>
              <li>
                <strong>Are your guides official?</strong>
                <p>
                  Our guides are created by passionate gamers and are not officially affiliated with
                  game developers.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SeoHead from '@/components/SeoHead.vue'

export default {
  name: 'ContactView',
  components: {
    SeoHead,
  },
}
</script>

<style scoped>
.contact-page {
  padding: 5rem 0 2rem 0;
  background-color: #f9f7fe;
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.contact-header {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-header h1 {
  color: #6a4c93;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.contact-header p {
  color: #666;
  font-size: 1.1rem;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.contact-image {
  width: 100%;
  margin-bottom: 1rem;
}

.contact-image img {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.contact-info {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.info-card {
  flex: 1;
  min-width: 300px;
  background: white;
  border-radius: 15px;
  padding: 1.5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.card-icon {
  font-size: 2rem;
  color: #9370db;
  margin-bottom: 1rem;
  text-align: center;
}

.info-card h3 {
  color: #6a4c93;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  text-align: center;
}

.info-card p {
  margin-bottom: 0.5rem;
}

.info-card a {
  color: #9370db;
  text-decoration: none;
}

.info-card a:hover {
  text-decoration: underline;
}

.social-links p {
  margin-bottom: 0.5rem;
}

.info-card ul {
  list-style: none;
  padding: 0;
}

.info-card li {
  margin-bottom: 1rem;
}

.info-card li strong {
  display: block;
  margin-bottom: 0.3rem;
  color: #6a4c93;
}

/* --- Responsive Design --- */
@media (max-width: 992px) {
  .contact-page {
    padding: 3rem 0 1.5rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .contact-header h1 {
    font-size: 2.2rem;
  }

  .contact-header p {
    font-size: 1rem;
  }

  .info-card h3 {
    font-size: 1.3rem;
  }

  .info-card {
    padding: 1.2rem;
  }
}

@media (max-width: 768px) {
  .contact-page {
    padding: 2rem 0 1rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .contact-header {
    margin-bottom: 2rem;
  }

  .contact-header h1 {
    font-size: 2rem;
  }

  .contact-header p {
    font-size: 0.95rem;
  }

  .contact-content {
    gap: 1.5rem;
  }

  .info-card h3 {
    font-size: 1.2rem;
  }

  .info-card p,
  .info-card li {
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .contact-page {
    padding: 3rem 0 1rem 0;
  }

  .contact-header h1 {
    font-size: 1.8rem;
  }

  .contact-header p {
    font-size: 0.9rem;
  }

  .info-card h3 {
    font-size: 1.1rem;
  }

  .info-card {
    padding: 1rem;
    min-width: 0; /* Allow card to shrink fully if it's the only one */
  }

  .info-card p,
  .info-card li {
    font-size: 0.85rem;
  }

  .card-icon {
    font-size: 1.8rem;
  }
}
</style>
