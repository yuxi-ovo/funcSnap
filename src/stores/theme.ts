import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { Theme } from '@/types';

/**
 * Theme store for managing dark/light mode
 * 
 * Requirements:
 * - 1.1: Detect system theme preference on initialization
 * - 1.2: Toggle between dark and light modes
 * - 1.3: Persist theme preference to localStorage
 * - 1.4: Load persisted theme on page load
 * - 7.1: Use Pinia for theme state management
 * - 7.2: Use Pinia for UI interaction state
 * - 7.4: Persist theme preference using localStorage
 */
export const useThemeStore = defineStore('theme', () => {
  // State
  const isDark = ref<boolean>(false);
  const systemPreference = ref<boolean>(false);
  
  // Getters
  const currentTheme = computed<Theme>(() => isDark.value ? 'dark' : 'light');
  
  /**
   * Get stored theme from localStorage with error handling
   * Returns null if localStorage is unavailable or no theme is stored
   */
  const getStoredTheme = (): Theme | null => {
    try {
      const stored = localStorage.getItem('vscode-plugin-theme');
      if (stored === 'dark' || stored === 'light') {
        return stored;
      }
      return null;
    } catch (error) {
      console.warn('localStorage unavailable, using system preference:', error);
      return null;
    }
  };
  
  /**
   * Get system theme preference with error handling
   * Returns false (light mode) if matchMedia is not supported
   */
  const getSystemPreference = (): boolean => {
    if (!window.matchMedia) {
      console.warn('matchMedia not supported, defaulting to light mode');
      return false;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };
  
  /**
   * Apply theme to DOM and persist to localStorage
   * Updates the 'dark' class on document.documentElement
   * Saves preference to localStorage with error handling
   */
  const applyTheme = () => {
    // Update DOM
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Persist to localStorage with error handling
    try {
      localStorage.setItem('vscode-plugin-theme', currentTheme.value);
    } catch (error) {
      console.warn('Failed to persist theme to localStorage:', error);
    }
  };
  
  /**
   * Initialize theme on app startup
   * Priority: localStorage > system preference > default (light)
   * 
   * Requirements:
   * - 1.1: Detect system theme preference
   * - 1.4: Load persisted theme from localStorage
   */
  const initTheme = () => {
    // Check localStorage first
    const stored = getStoredTheme();
    if (stored) {
      isDark.value = stored === 'dark';
      systemPreference.value = false;
    } else {
      // Fall back to system preference
      isDark.value = getSystemPreference();
      systemPreference.value = true;
    }
    applyTheme();
  };
  
  /**
   * Toggle between dark and light themes
   * Disables system preference tracking when manually toggled
   * 
   * Requirements:
   * - 1.2: Toggle between dark and light modes
   * - 1.3: Persist theme preference
   */
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    systemPreference.value = false;
    applyTheme();
  };
  
  /**
   * Set theme to a specific value
   * Disables system preference tracking when manually set
   * 
   * Requirements:
   * - 1.3: Persist theme preference
   */
  const setTheme = (theme: Theme) => {
    isDark.value = theme === 'dark';
    systemPreference.value = false;
    applyTheme();
  };
  
  // Watch for system preference changes when using system preference
  watch(() => systemPreference.value, (usesSystem) => {
    if (usesSystem && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        isDark.value = e.matches;
        applyTheme();
      };
      mediaQuery.addEventListener('change', handler);
      
      // Return cleanup function
      return () => {
        mediaQuery.removeEventListener('change', handler);
      };
    }
  });
  
  return {
    // State
    isDark,
    systemPreference,
    // Getters
    currentTheme,
    // Actions
    initTheme,
    toggleTheme,
    setTheme
  };
});
