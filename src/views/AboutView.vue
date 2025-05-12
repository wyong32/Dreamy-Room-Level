<template>
  <div class="about-page">
    <SeoHead
      pageType="about"
      customTitle="About Us - Dreamy Room Game Guides"
      customDescription="Learn about Dreamy Room Game Guides - Your ultimate resource for mastering every level with detailed guides, decoration tips, and gaming strategies."
      customKeywords="about us, dreamy room, game guides, decoration game, room design, gaming community"
    />
    <div class="container">
      <div class="about-header">
        <h1>About Us</h1>
      </div>

      <div class="about-content">
        <section class="about-intro">
          <div class="about-image">
            <img src="/images/guides_01.webp" alt="Dreamy Room Level Game" />
          </div>
          <div class="about-text">
            <h2>Welcome to Dreamy Room Game Guides!</h2>
            <p>
              We are a community of players passionate about casual decoration games, dedicated to
              providing the most detailed and practical level guides, gaming tips, and decoration
              inspiration for every player of "Dreamy Room".
            </p>
            <p>
              Whether you're looking for the perfect placement of key decorative items or need
              inspiration to create a perfectly dreamy space, we aim to be your most reliable gaming
              companion.
            </p>
          </div>
        </section>

        <section class="our-mission">
          <h2>Our Mission</h2>
          <p>
            Our goal is to help you easily complete every level. We strive to be your trusted gaming
            partner, offering support whether you're searching for the placement of key decorative
            items or seeking inspiration to create a perfect dreamy space.
          </p>
        </section>

        <section class="our-services">
          <h2>What We Offer</h2>
          <p>
            ✅ <strong>Detailed Level Guides:</strong> Step-by-step tutorials with images to help
            you achieve 100% perfect completion
          </p>
          <p>
            ✅ <strong>Decorative Item Guides:</strong> Names, functions, and placement suggestions
            for every item
          </p>
          <p>
            ✅ <strong>Gaming Tips:</strong> Efficient strategies and hidden easter egg analysis
          </p>
        </section>

        <section class="join-community">
          <h2>Join Our Community</h2>
          <p>
            We encourage every player to share their creativity and discoveries. If you have unique
            insights about a particular level or want to contribute your room design, please contact
            us!
          </p>
          <p>
            📧 Contact: maieldilmie223321@gmail.com<br />
            🌐 Official Website: dreamyroomguides.com
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import SeoHead from '@/components/SeoHead.vue'

export default {
  name: 'AboutView',
  components: {
    SeoHead,
  },
}
</script>

<style scoped>
.about-page {
  padding: 5rem 0 2rem 0;
  background-color: #f9f7fe;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.about-header {
  text-align: center;
  margin-bottom: 3rem;
}

.about-header h1 {
  color: #6a4c93;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.about-content {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

section {
  margin-bottom: 3rem;
}

h2 {
  color: #6a4c93;
  margin-bottom: 1.5rem;
  font-size: 2rem;
  text-align: center;
}

h3 {
  color: #6a4c93;
  margin: 1rem 0;
  font-size: 1.4rem;
}

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

.about-intro {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
}

.about-image {
  flex: 1;
  min-width: 300px;
}

.about-image img {
  width: 100%;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.about-text {
  flex: 1;
  min-width: 300px;
}

.join-community {
  text-align: center;
}

/* --- Responsive Design --- */
@media (max-width: 992px) {
  .about-page {
    padding: 3rem 0 1.5rem 0;
  }

  .container {
    padding: 0 1.5rem;
  }

  .about-header h1 {
    font-size: 2.2rem;
  }

  h2 {
    font-size: 1.8rem;
  }

  h3 {
    font-size: 1.3rem;
  }

  .about-content {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .about-page {
    padding: 2rem 0 1rem 0;
  }

  .container {
    padding: 0 1rem;
  }

  .about-header {
    margin-bottom: 2rem;
  }

  .about-header h1 {
    font-size: 2rem;
  }

  section {
    margin-bottom: 2rem;
  }

  h2 {
    font-size: 1.6rem;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  p {
    font-size: 0.95rem;
  }

  .about-intro {
    gap: 1.5rem; /* Reduce gap when items might stack */
  }

  /* Since .about-image and .about-text use min-width: 300px and flex-wrap,
     they will stack naturally. We might not need to change their flex properties explicitly.
     Ensure the image itself is responsive if it isn't already (it is via width: 100%). */
}

@media (max-width: 576px) {
  .about-page {
    padding: 3rem 0 1rem 0;
  }

  .about-header h1 {
    font-size: 1.8rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.1rem;
  }

  p {
    font-size: 0.9rem;
  }

  .about-content {
    padding: 1rem;
  }
}
</style>
