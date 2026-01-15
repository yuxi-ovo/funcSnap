<script setup lang="ts">
import { computed } from 'vue';
import { SunIcon, MoonIcon } from '@heroicons/vue/24/outline';
import { useThemeStore } from '@/stores/theme';

/**
 * ThemeToggle Component
 * 
 * A button component that toggles between dark and light themes.
 * Uses sun/moon icons from Heroicons to indicate current theme.
 * 
 * Requirements:
 * - 1.2: Toggle between dark and light modes
 * - 6.1: Respect prefers-reduced-motion for animations
 * - 6.3: Include proper ARIA labels
 */

const themeStore = useThemeStore();

// Computed properties for better readability
const isDark = computed(() => themeStore.isDark);
const currentThemeLabel = computed(() => isDark.value ? 'dark' : 'light');
const toggleLabel = computed(() => 
  isDark.value ? 'Switch to light mode' : 'Switch to dark mode'
);

// Toggle handler
const handleToggle = () => {
  themeStore.toggleTheme();
};
</script>

<template>
  <button
    @click="handleToggle"
    :aria-label="toggleLabel"
    :title="toggleLabel"
    class="theme-toggle-button relative p-2 rounded-lg 
           bg-slate-200 dark:bg-slate-700 
           hover:bg-slate-300 dark:hover:bg-slate-600
           transition-colors duration-200
           focus-visible:outline-none focus-visible:ring-2 
           focus-visible:ring-blue-500 focus-visible:ring-offset-2
           dark:focus-visible:ring-offset-slate-900"
    type="button"
  >
    <!-- Sun Icon (visible in dark mode) -->
    <SunIcon 
      v-if="isDark"
      class="theme-icon w-5 h-5 text-yellow-400"
      aria-hidden="true"
    />
    
    <!-- Moon Icon (visible in light mode) -->
    <MoonIcon 
      v-else
      class="theme-icon w-5 h-5 text-slate-600 dark:text-slate-300"
      aria-hidden="true"
    />
    
    <!-- Screen reader only text for current mode -->
    <span class="sr-only">
      Current theme: {{ currentThemeLabel }}
    </span>
  </button>
</template>

<style scoped>
/**
 * Animation for icon rotation on theme toggle
 * Respects prefers-reduced-motion accessibility preference
 */
.theme-icon {
  transition: transform 0.3s ease-in-out;
}

/* Smooth rotation animation when toggling */
.theme-toggle-button:active .theme-icon {
  transform: rotate(180deg);
}

/* Disable animations for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  .theme-icon {
    transition: none;
  }
  
  .theme-toggle-button:active .theme-icon {
    transform: none;
  }
}

/* Screen reader only utility class */
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
</style>
