<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { NavigationLink, FooterProps } from '@/types';

/**
 * Footer Component
 * 
 * Footer with links and copyright information
 * 
 * Requirements:
 * - 5.5: Use consistent max-width containers (max-w-7xl)
 * - 9.4: Apply consistent spacing using Tailwind's spacing scale
 * - 3.4: Provide translations for all Footer content
 */

defineProps<FooterProps>();

const { t } = useI18n();

// Footer navigation links - use computed for reactivity
const footerLinks = computed<NavigationLink[]>(() => [
  { label: t('footer.documentation'), href: '#docs', external: false },
  { label: t('footer.github'), href: 'https://github.com', external: true },
  { label: t('footer.marketplace'), href: 'https://marketplace.visualstudio.com/', external: true },
  { label: t('footer.support'), href: '#support', external: false }
]);

// Social/community links - use computed for reactivity
const socialLinks = computed<NavigationLink[]>(() => [
  { label: t('footer.twitter'), href: 'https://twitter.com', external: true },
  { label: t('footer.discord'), href: 'https://discord.com', external: true }
]);
</script>

<template>
  <footer 
    class="border-t border-gray-200 dark:border-slate-700 
           bg-white dark:bg-slate-900 
           transition-colors duration-200"
    aria-label="Site footer"
  >
    <div class="max-w-7xl mx-auto px-4 py-12">
      <!-- Footer content grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Brand section -->
        <div class="space-y-4">
          <div class="flex items-center space-x-2">
              <img src="../../assets/images/logo.png" class="w-9">

            <span 
              class="font-heading font-bold text-lg text-slate-900 dark:text-slate-100"
            >
              {{ t('footer.brand') }}
            </span>
          </div>
          <p class="font-body text-sm text-slate-600 dark:text-slate-400">
            {{ t('footer.brandDescription') }}
          </p>
        </div>

        <!-- Links section -->
        <div class="space-y-4">
          <h3 class="font-heading font-semibold text-sm uppercase tracking-wider 
                     text-slate-900 dark:text-slate-100">
            {{ t('footer.resources') }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in footerLinks" :key="link.href">
              <a
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="font-body text-sm text-slate-600 dark:text-slate-400 
                       hover:text-blue-600 dark:hover:text-blue-400
                       transition-colors duration-200 cursor-pointer
                       focus-visible:outline-none focus-visible:ring-2 
                       focus-visible:ring-blue-500 focus-visible:ring-offset-2
                       dark:focus-visible:ring-offset-slate-900 rounded-md"
              >
                {{ link.label }}
                <span v-if="link.external" class="sr-only">(opens in new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <!-- Social/Community section -->
        <div class="space-y-4">
          <h3 class="font-heading font-semibold text-sm uppercase tracking-wider 
                     text-slate-900 dark:text-slate-100">
            {{ t('footer.community') }}
          </h3>
          <ul class="space-y-2">
            <li v-for="link in socialLinks" :key="link.href">
              <a
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                class="font-body text-sm text-slate-600 dark:text-slate-400 
                       hover:text-blue-600 dark:hover:text-blue-400
                       transition-colors duration-200 cursor-pointer
                       focus-visible:outline-none focus-visible:ring-2 
                       focus-visible:ring-blue-500 focus-visible:ring-offset-2
                       dark:focus-visible:ring-offset-slate-900 rounded-md"
              >
                {{ link.label }}
                <span v-if="link.external" class="sr-only">(opens in new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright section -->
      <div 
        class="pt-8 border-t border-gray-200 dark:border-slate-700 
               flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="font-body text-sm text-slate-600 dark:text-slate-400">
          {{ t('footer.copyright') }}
        </p>
        
        <!-- Additional legal links -->
        <div class="flex items-center space-x-6">
          <a
            href="#privacy"
            class="font-body text-sm text-slate-600 dark:text-slate-400 
                   hover:text-blue-600 dark:hover:text-blue-400
                   transition-colors duration-200 cursor-pointer
                   focus-visible:outline-none focus-visible:ring-2 
                   focus-visible:ring-blue-500 focus-visible:ring-offset-2
                   dark:focus-visible:ring-offset-slate-900 rounded-md"
          >
            {{ t('footer.privacy') }}
          </a>
          <a
            href="#terms"
            class="font-body text-sm text-slate-600 dark:text-slate-400 
                   hover:text-blue-600 dark:hover:text-blue-400
                   transition-colors duration-200 cursor-pointer
                   focus-visible:outline-none focus-visible:ring-2 
                   focus-visible:ring-blue-500 focus-visible:ring-offset-2
                   dark:focus-visible:ring-offset-slate-900 rounded-md"
          >
            {{ t('footer.terms') }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/**
 * Respects prefers-reduced-motion accessibility preference
 * Disables transitions for users who prefer reduced motion
 */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
  }
}
</style>
