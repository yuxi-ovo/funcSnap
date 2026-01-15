<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import ThemeToggle from '@/components/ui/ThemeToggle.vue';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher.vue';
import type { NavigationLink } from '@/types';

/**
 * NavBar Component
 * 
 * Fixed navigation bar with glass morphism effect and responsive mobile menu.
 * 
 * Requirements:
 * - 5.1: Fixed at the top with floating style (top-4 spacing)
 * - 5.2: Include plugin name/logo and theme toggle button
 * - 5.3: Glass morphism effect (backdrop-blur with transparency)
 * - 5.5: Consistent max-width containers (max-w-7xl)
 * - 9.7: cursor-pointer on interactive elements
 * - 3.3: Translate navigation link labels
 * - 3.6: Translate ARIA labels for accessibility
 */

// Import i18n composable
const { t } = useI18n();

// Mobile menu state
const isMobileMenuOpen = ref(false);

// Navigation links with translation keys
const navigationLinks = computed<NavigationLink[]>(() => [
  { label: t('nav.features'), href: '#features', external: false },
  { label: t('nav.demo'), href: '#demo', external: false },
  { label: t('nav.install'), href: '#install', external: false }
]);

// Toggle mobile menu
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Close mobile menu when a link is clicked
const handleLinkClick = () => {
  isMobileMenuOpen.value = false;
};
</script>

<template>
  <nav class="fixed top-4 left-4 right-4 z-50" :aria-label="t('nav.mainNavigation')">
    <div class="max-w-7xl mx-auto">
      <!-- Glass morphism container -->
      <div 
        class="backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 
               rounded-2xl border border-gray-200 dark:border-slate-700 
               px-6 py-4 shadow-lg transition-colors duration-200"
      >
        <div class="flex items-center justify-between">
          <!-- Logo/Brand -->
          <div class="flex items-center space-x-2">
            <div 
              class="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 
                     rounded-lg flex items-center justify-center"
            >
              <svg 
                class="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path 
                  stroke-linecap="round" 
                  stroke-linejoin="round" 
                  stroke-width="2" 
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <span 
              class="font-heading font-bold text-lg text-slate-900 dark:text-slate-100"
            >
              {{ t('nav.brand') }}
            </span>
          </div>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:flex items-center space-x-8">
            <a
              v-for="link in navigationLinks"
              :key="link.href"
              :href="link.href"
              :target="link.external ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              class="text-slate-600 dark:text-slate-300 
                     hover:text-blue-600 dark:hover:text-blue-400
                     transition-colors duration-200 cursor-pointer
                     font-body text-sm font-medium
                     focus-visible:outline-none focus-visible:ring-2 
                     focus-visible:ring-blue-500 focus-visible:ring-offset-2
                     dark:focus-visible:ring-offset-slate-900 rounded-md px-2 py-1"
            >
              {{ link.label }}
            </a>
          </div>

          <!-- Right side: Language Switcher + Theme Toggle + Mobile Menu Button -->
          <div class="flex items-center space-x-3">
            <!-- Language Switcher -->
            <LanguageSwitcher />
            
            <!-- Theme Toggle -->
            <ThemeToggle />

            <!-- Mobile Menu Button (visible on < 768px) -->
            <button
              @click="toggleMobileMenu"
              :aria-label="isMobileMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')"
              :aria-expanded="isMobileMenuOpen"
              class="md:hidden p-2 rounded-lg 
                     bg-slate-200 dark:bg-slate-700 
                     hover:bg-slate-300 dark:hover:bg-slate-600
                     transition-colors duration-200 cursor-pointer
                     focus-visible:outline-none focus-visible:ring-2 
                     focus-visible:ring-blue-500 focus-visible:ring-offset-2
                     dark:focus-visible:ring-offset-slate-900"
              type="button"
            >
              <Bars3Icon 
                v-if="!isMobileMenuOpen"
                class="w-5 h-5 text-slate-700 dark:text-slate-300"
                aria-hidden="true"
              />
              <XMarkIcon 
                v-else
                class="w-5 h-5 text-slate-700 dark:text-slate-300"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        <!-- Mobile Menu (visible when open on < 768px) -->
        <transition
          enter-active-class="transition-all duration-200 ease-out"
          enter-from-class="opacity-0 -translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-2"
        >
          <div 
            v-if="isMobileMenuOpen"
            class="md:hidden mt-4 pt-4 border-t border-gray-200 dark:border-slate-700"
          >
            <div class="flex flex-col space-y-3">
              <a
                v-for="link in navigationLinks"
                :key="link.href"
                :href="link.href"
                :target="link.external ? '_blank' : undefined"
                :rel="link.external ? 'noopener noreferrer' : undefined"
                @click="handleLinkClick"
                class="text-slate-600 dark:text-slate-300 
                       hover:text-blue-600 dark:hover:text-blue-400
                       transition-colors duration-200 cursor-pointer
                       font-body text-sm font-medium px-2 py-2 rounded-lg
                       hover:bg-slate-100 dark:hover:bg-slate-800
                       focus-visible:outline-none focus-visible:ring-2 
                       focus-visible:ring-blue-500 focus-visible:ring-offset-2
                       dark:focus-visible:ring-offset-slate-900"
              >
                {{ link.label }}
              </a>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/**
 * Respects prefers-reduced-motion accessibility preference
 * Disables transitions for users who prefer reduced motion
 */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
