<template>
  <div class="home bg-white dark:bg-slate-900 transition-colors duration-300">
    <!-- Fixed Navigation Bar -->
    <NavBar />
    
    <!-- Hero Section -->
    <section id="hero" class="bg-white dark:bg-slate-900 transition-colors duration-300">
      <HeroSection />
    </section>
    
    <!-- Features Section -->
    <section id="features">
      <FeaturesSection />
    </section>
    
    <!-- Demo Section (placeholder for future implementation) -->
    <section id="demo" class="py-24 px-4 bg-white dark:bg-slate-900" aria-labelledby="demo-heading">
      <div class="max-w-7xl mx-auto text-center">
        <h2 id="demo-heading" class="text-4xl font-bold font-heading mb-4 text-slate-900 dark:text-slate-100">
          {{ t('demo.heading') }}
        </h2>
        <p class="text-xl font-body text-slate-600 dark:text-slate-400 mb-8">
          {{ t('demo.subtitle') }}
        </p>
        <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-12 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
          {{ t('demo.comingSoon') }}
        </div>
      </div>
    </section>
    
    <!-- Install Section -->
    <section id="install" class="py-24 px-4 bg-slate-50 dark:bg-slate-800" aria-labelledby="install-heading">
      <div class="max-w-4xl mx-auto text-center">
        <h2 id="install-heading" class="text-4xl font-bold font-heading mb-4 text-slate-900 dark:text-slate-100">
          {{ t('install.heading') }}
        </h2>
        <p class="text-xl font-body text-slate-600 dark:text-slate-400 mb-8">
          {{ t('install.subtitle') }}
        </p>
        <button 
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold
                 px-8 py-4 rounded-lg shadow-lg hover:shadow-xl
                 transition-all duration-300 transform hover:scale-105
                 cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/50
                 focus-visible:outline-none focus-visible:ring-2 
                 focus-visible:ring-blue-500 focus-visible:ring-offset-2
                 dark:focus-visible:ring-offset-slate-800"
          @click="handleInstallClick"
          :aria-label="t('install.buttonAriaLabel')"
          type="button"
        >
          {{ t('install.button') }}
        </button>
      </div>
    </section>
    
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import NavBar from '@/components/layout/NavBar.vue';
import Footer from '@/components/layout/Footer.vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import FeaturesSection from '@/components/sections/FeaturesSection.vue';

/**
 * HomeView Component
 * 
 * Main landing page view that composes all sections
 * 
 * Requirements:
 * - 5.6: Include smooth scroll behavior for anchor links
 * - 8.2: Support hash-based routing for single-page sections
 * - 8.4: Update URL hash when scrolling to different sections
 */

const { t } = useI18n();

/**
 * Handle install button click
 */
const handleInstallClick = () => {
  // In a real implementation, this would link to VS Code marketplace
  window.open('https://marketplace.visualstudio.com/', '_blank');
};
</script>

<style scoped>
.home {
  min-height: 100vh;
}

/* Smooth scroll behavior for the entire page */
html {
  scroll-behavior: smooth;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  
  .home,
  button {
    transition: none !important;
    transform: none !important;
  }
}

/* Ensure sections have proper spacing for fixed navbar */
section {
  scroll-margin-top: 100px;
}
</style>
