import { createI18n } from 'vue-i18n';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';
import type { Locale } from './types';

/**
 * Detect browser language and map to supported locale
 * Maps all Chinese variants to zh-CN, all others to en-US
 */
export const getBrowserLocale = (): Locale => {
  const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en-US';
  
  // Map Chinese variants (zh, zh-CN, zh-TW, zh-HK) to zh-CN
  if (browserLang.startsWith('zh')) {
    return 'zh-CN';
  }
  
  // Default to en-US for all other languages
  return 'en-US';
};

/**
 * Get initial locale from localStorage or browser detection
 * Stored preference takes priority over browser detection
 */
export const getInitialLocale = (): Locale => {
  try {
    const stored = localStorage.getItem('vscode-plugin-locale');
    if (stored && (stored === 'zh-CN' || stored === 'en-US')) {
      return stored as Locale;
    }
  } catch (error) {
    console.warn('localStorage unavailable:', error);
  }
  
  return getBrowserLocale();
};

/**
 * Persist locale preference to localStorage
 * Handles errors gracefully if localStorage is unavailable
 */
export const persistLocale = (locale: Locale): void => {
  try {
    localStorage.setItem('vscode-plugin-locale', locale);
  } catch (error) {
    console.warn('Failed to persist locale:', error);
  }
};

// Create i18n instance with Composition API mode
export const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: getInitialLocale(),
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
  globalInjection: true, // Enable global $t
  missingWarn: false, // Disable missing key warnings in production
  fallbackWarn: false
});
