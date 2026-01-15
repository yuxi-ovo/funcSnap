<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronDownIcon, LanguageIcon } from '@heroicons/vue/24/outline';
import { persistLocale } from '@/i18n';
import type { Locale } from '@/i18n/types';

/**
 * LanguageSwitcher Component
 * 
 * A dropdown component that allows users to switch between supported languages.
 * Persists language preference to localStorage and updates HTML lang attribute.
 * 
 * Requirements:
 * - 2.1: Display available language options (中文, English)
 * - 2.2: Update all displayed text immediately on language change
 * - 2.3: Persist user's choice to localStorage
 * - 6.1: Located in NavBar next to theme toggle
 * - 6.2: Display current language code or icon
 * - 6.3: Show dropdown on click
 * - 6.4: Provide visual feedback on hover and focus
 * - 6.5: Include proper ARIA labels for accessibility
 * - 6.6: Support keyboard navigation
 * - 10.1: Update HTML lang attribute
 * - 10.2: Update HTML lang attribute on locale change
 * - 10.4: Announce language changes to screen readers
 */

interface LocaleOption {
  code: Locale;
  name: string;
}

const { locale, t } = useI18n();
const isOpen = ref(false);
const dropdownRef = ref<HTMLDivElement | null>(null);
const buttonRef = ref<HTMLButtonElement | null>(null);
const focusedIndex = ref(-1);

// Available language options
const availableLocales: LocaleOption[] = [
  { code: 'zh-CN', name: '中文' },
  { code: 'en-US', name: 'English' }
];

// Computed properties
const currentLocale = computed(() => locale.value as Locale);

const currentLocaleName = computed(() => {
  return availableLocales.find(l => l.code === currentLocale.value)?.name || 'English';
});

// Toggle dropdown
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    focusedIndex.value = availableLocales.findIndex(l => l.code === currentLocale.value);
  }
};

// Change locale
const changeLocale = (newLocale: Locale) => {
  if (newLocale === currentLocale.value) {
    isOpen.value = false;
    return;
  }

  // Update i18n locale
  locale.value = newLocale;
  
  // Persist to localStorage
  persistLocale(newLocale);
  
  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', newLocale);
  
  // Close dropdown
  isOpen.value = false;
  
  // Announce to screen readers
  announceLocaleChange(newLocale);
};

// Announce locale change to screen readers
const announceLocaleChange = (newLocale: Locale) => {
  const localeName = availableLocales.find(l => l.code === newLocale)?.name;
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = t('common.languageChanged', { language: localeName });
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    isOpen.value = false;
  }
};

// Keyboard navigation
const handleKeyDown = (event: KeyboardEvent) => {
  if (!isOpen.value) {
    // Open dropdown with Enter or Space
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleDropdown();
    }
    return;
  }

  switch (event.key) {
    case 'Escape':
      event.preventDefault();
      isOpen.value = false;
      buttonRef.value?.focus();
      break;
      
    case 'ArrowDown':
      event.preventDefault();
      focusedIndex.value = (focusedIndex.value + 1) % availableLocales.length;
      break;
      
    case 'ArrowUp':
      event.preventDefault();
      focusedIndex.value = focusedIndex.value <= 0 
        ? availableLocales.length - 1 
        : focusedIndex.value - 1;
      break;
      
    case 'Enter':
    case ' ':
      event.preventDefault();
      if (focusedIndex.value >= 0) {
        changeLocale(availableLocales[focusedIndex.value].code);
      }
      break;
      
    case 'Tab':
      // Allow default tab behavior to close dropdown
      isOpen.value = false;
      break;
  }
};

// Handle option click
const handleOptionClick = (localeCode: Locale) => {
  changeLocale(localeCode);
};

// Lifecycle hooks
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
  <div 
    ref="dropdownRef"
    class="language-switcher relative"
  >
    <!-- Dropdown Button -->
    <button
      ref="buttonRef"
      @click="toggleDropdown"
      @keydown="handleKeyDown"
      :aria-label="t('common.switchLanguage')"
      :aria-expanded="isOpen"
      :aria-haspopup="true"
      class="switcher-button relative p-2 rounded-lg 
             bg-slate-200 dark:bg-slate-700 
             hover:bg-slate-300 dark:hover:bg-slate-600
             transition-colors duration-200
             focus-visible:outline-none focus-visible:ring-2 
             focus-visible:ring-blue-500 focus-visible:ring-offset-2
             dark:focus-visible:ring-offset-slate-900
             flex items-center space-x-1"
      type="button"
    >
      <LanguageIcon 
        class="w-5 h-5 text-slate-700 dark:text-slate-300"
        aria-hidden="true"
      />
      <span class="text-xs font-medium text-slate-700 dark:text-slate-300">
        {{ currentLocaleName }}
      </span>
      <ChevronDownIcon 
        class="w-3 h-3 text-slate-700 dark:text-slate-300 transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        aria-hidden="true"
      />
    </button>
    
    <!-- Dropdown Menu -->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-150 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-1"
    >
      <div 
        v-if="isOpen"
        class="dropdown-menu absolute right-0 mt-2 w-32 
               backdrop-blur-lg bg-white/95 dark:bg-slate-800/95
               rounded-lg border border-gray-200 dark:border-slate-700
               shadow-lg overflow-hidden z-50"
        role="menu"
        :aria-label="t('common.switchLanguage')"
      >
        <button
          v-for="(localeOption, index) in availableLocales"
          :key="localeOption.code"
          @click="handleOptionClick(localeOption.code)"
          :class="{
            'bg-blue-50 dark:bg-blue-900/30': currentLocale === localeOption.code,
            'bg-slate-100 dark:bg-slate-700': focusedIndex === index && currentLocale !== localeOption.code
          }"
          class="dropdown-item w-full px-4 py-2 text-left text-sm
                 text-slate-700 dark:text-slate-300
                 hover:bg-slate-100 dark:hover:bg-slate-700
                 transition-colors duration-150
                 focus-visible:outline-none focus-visible:bg-slate-100 dark:focus-visible:bg-slate-700
                 cursor-pointer"
          role="menuitem"
          type="button"
          :tabindex="isOpen ? 0 : -1"
        >
          <span class="flex items-center justify-between">
            <span>{{ localeOption.name }}</span>
            <span 
              v-if="currentLocale === localeOption.code"
              class="text-blue-600 dark:text-blue-400"
              aria-label="Current language"
            >
              ✓
            </span>
          </span>
        </button>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/**
 * Screen reader only utility class for announcements
 */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/**
 * Respects prefers-reduced-motion accessibility preference
 */
@media (prefers-reduced-motion: reduce) {
  .switcher-button,
  .dropdown-menu,
  .dropdown-item {
    transition: none !important;
  }
}
</style>
