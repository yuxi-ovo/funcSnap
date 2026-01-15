// TypeScript types for i18n

export type Locale = 'zh-CN' | 'en-US';

export interface LocaleOption {
  code: Locale;
  name: string;
  nativeName: string;
}

export interface I18nConfig {
  locale: Locale;
  fallbackLocale: Locale;
  messages: Record<Locale, any>;
}

// Type-safe translation keys (optional, for better DX)
export type TranslationKey = 
  | 'common.switchLanguage'
  | 'common.languageChanged'
  | 'nav.brand'
  | 'nav.features'
  | 'nav.demo'
  | 'nav.install'
  | 'hero.title'
  | 'hero.titleHighlight'
  | 'hero.subtitle'
  | 'hero.installButton'
  | 'hero.learnMoreButton'
  | 'hero.installAriaLabel'
  | 'hero.learnMoreAriaLabel'
  | 'features.title'
  | 'features.subtitle'
  | 'features.listAriaLabel'
  | 'features.captureFunction.title'
  | 'features.captureFunction.description'
  | 'features.selectionScreenshot.title'
  | 'features.selectionScreenshot.description'
  | 'features.copyFunction.title'
  | 'features.copyFunction.description'
  | 'features.customizableSettings.title'
  | 'features.customizableSettings.description'
  | 'features.vscodeIntegration.title'
  | 'features.vscodeIntegration.description'
  | 'footer.copyright';
