<template>
  <div class="terms-of-service">
    <SeoHead
      pageType="terms"
      customTitle="Terms of Service - Dreamy Room Level"
      customDescription="Terms of Service for Dreamy Room Level - Learn about the rules and guidelines for using our website."
      customKeywords="terms of service, terms and conditions, user agreement, dreamy room level"
    />
    <div class="container">
      <div class="terms-header">
        <h1>Terms of Service</h1>
        <p class="last-updated">Last Updated: {{ currentDate }}</p>
      </div>

      <div class="terms-content">
        <section>
          <h2>Introduction</h2>
          <p>
            Welcome to Dreamy Room Level. These Terms of Service ("Terms") govern your access to and
            use of our website, including any content, functionality, and services offered on or
            through our website.
          </p>
          <p>
            Please read these Terms carefully before using our website. By accessing or using our
            website, you agree to be bound by these Terms. If you do not agree to these Terms, you
            must not access or use our website.
          </p>
        </section>

        <section>
          <h2>Intellectual Property Rights</h2>
          <p>
            The website and its entire contents, features, and functionality (including but not
            limited to all information, software, text, displays, images, video, and audio, and the
            design, selection, and arrangement thereof) are owned by Dreamy Room Level, its
            licensors, or other providers of such material and are protected by copyright,
            trademark, patent, trade secret, and other intellectual property or proprietary rights
            laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display,
            publicly perform, republish, download, store, or transmit any of the material on our
            website, except as follows:
          </p>
          <ul>
            <li>
              Your computer may temporarily store copies of such materials in RAM incidental to your
              accessing and viewing those materials.
            </li>
            <li>
              You may store files that are automatically cached by your Web browser for display
              enhancement purposes.
            </li>
            <li>
              You may print or download one copy of a reasonable number of pages of the website for
              your own personal, non-commercial use and not for further reproduction, publication,
              or distribution.
            </li>
          </ul>
        </section>

        <section>
          <h2>User Contributions</h2>
          <p>
            Our website may contain message boards, chat rooms, personal web pages or profiles,
            forums, bulletin boards, and other interactive features that allow users to post,
            submit, publish, display, or transmit content or materials.
          </p>
          <p>
            All User Contributions must comply with the Content Standards set out in these Terms.
            Any User Contribution you post to the site will be considered non-confidential and
            non-proprietary.
          </p>
        </section>

        <section>
          <h2>Content Standards</h2>
          <p>
            These content standards apply to any and all User Contributions. User Contributions must
            not:
          </p>
          <ul>
            <li>
              Contain any material that is defamatory, obscene, indecent, abusive, offensive,
              harassing, violent, hateful, inflammatory, or otherwise objectionable.
            </li>
            <li>
              Promote sexually explicit or pornographic material, violence, or discrimination based
              on race, sex, religion, nationality, disability, sexual orientation, or age.
            </li>
            <li>
              Infringe any patent, trademark, trade secret, copyright, or other intellectual
              property or other rights of any other person.
            </li>
            <li>
              Violate the legal rights (including the rights of publicity and privacy) of others or
              contain any material that could give rise to any civil or criminal liability under
              applicable laws or regulations.
            </li>
            <li>Be likely to deceive any person.</li>
            <li>Promote any illegal activity, or advocate, promote, or assist any unlawful act.</li>
          </ul>
        </section>

        <section>
          <h2>Disclaimer of Warranties</h2>
          <p>
            Your use of our website, its content, and any services or items obtained through the
            website is at your own risk. The website, its content, and any services or items
            obtained through the website are provided on an "as is" and "as available" basis,
            without any warranties of any kind, either express or implied.
          </p>
        </section>

        <section>
          <h2>Limitation of Liability</h2>
          <p>
            In no event will we, our affiliates, or their licensors, service providers, employees,
            agents, officers, or directors be liable for damages of any kind, under any legal
            theory, arising out of or in connection with your use, or inability to use, the website,
            any websites linked to it, any content on the website or such other websites, including
            any direct, indirect, special, incidental, consequential, or punitive damages.
          </p>
        </section>

        <section>
          <h2>Changes to the Terms</h2>
          <p>
            We may revise and update these Terms from time to time in our sole discretion. All
            changes are effective immediately when we post them, and apply to all access to and use
            of the website thereafter.
          </p>
          <p>
            Your continued use of the website following the posting of revised Terms means that you
            accept and agree to the changes.
          </p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>
            <a href="mailto:terms@dreamy-room-level.com">terms@dreamy-room-level.com</a>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import SeoHead from '@/components/SeoHead.vue'

export default {
  name: 'TermsView',
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
.terms-of-service {
  padding: 5rem 0 2rem 0;
  background-color: #f9f7fe;
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
}

.terms-header {
  text-align: center;
  margin-bottom: 3rem;
}

.terms-header h1 {
  color: #6a4c93;
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.last-updated {
  color: #9370db;
  font-size: 0.9rem;
}

.terms-content {
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
</style>
