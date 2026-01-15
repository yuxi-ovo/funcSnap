<template>
  <div id="app" :class="{ 'dark': themeStore.isDark }" class="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/stores/theme';
import { persistLocale } from '@/i18n';
import type { Locale } from '@/i18n/types';

/**
 * App Component
 * 
 * Root component that initializes the theme system, i18n, and provides router-view
 * 
 * Requirements:
 * - 1.1: Detect system theme preference on initialization
 * - 7.3: Update reactively across all components when theme changes
 * - 10.1: Set HTML lang attribute to match current locale
 * - 10.2: Update HTML lang attribute when locale changes
 */

// Initialize theme store
const themeStore = useThemeStore();

// Initialize i18n
const { locale } = useI18n();

/**
 * Initialize theme and i18n on component mount
 * This ensures the theme and language are applied before the page is visible
 */
onMounted(() => {
  themeStore.initTheme();
  
  // Set initial HTML lang attribute
  document.documentElement.setAttribute('lang', locale.value);
});

/**
 * Watch for locale changes and update HTML lang attribute
 * Also persist the locale preference to localStorage
 * 
 * Requirements:
 * - 10.1: HTML lang attribute matches current locale
 * - 10.2: HTML lang attribute updates reactively when locale changes
 */
watch(locale, (newLocale) => {
  document.documentElement.setAttribute('lang', newLocale);
  persistLocale(newLocale as Locale);
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  #app {
    transition: none !important;
  }
}
</style>
