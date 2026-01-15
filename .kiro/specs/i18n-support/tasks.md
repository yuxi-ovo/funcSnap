# Implementation Plan: Internationalization Support (i18n)

## Overview

This implementation plan breaks down the development of internationalization support for the VSCode Screenshot Plugin landing page. The implementation will be built incrementally, starting with vue-i18n setup and configuration, then creating translation files, implementing the language switcher component, and finally integrating i18n throughout all existing components.

## Tasks

- [x] 1. Install dependencies and setup i18n infrastructure
  - Install vue-i18n package: `npm install vue-i18n@9`
  - Create i18n directory structure (i18n/, i18n/locales/)
  - Create TypeScript types file for i18n (i18n/types.ts)
  - _Requirements: 4.1, 7.1_

- [x] 2. Create translation files
  - [x] 2.1 Create Chinese translation file (zh-CN.json)
    - Add common translations (switchLanguage, languageChanged)
    - Add navigation translations (brand, features, demo, install)
    - Add hero section translations (title, subtitle, buttons, ARIA labels)
    - Add features section translations (title, subtitle, all feature cards)
    - Add footer translations (copyright)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 2.2 Create English translation file (en-US.json)
    - Add common translations (switchLanguage, languageChanged)
    - Add navigation translations (brand, features, demo, install)
    - Add hero section translations (title, subtitle, buttons, ARIA labels)
    - Add features section translations (title, subtitle, all feature cards)
    - Add footer translations (copyright)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ]* 2.3 Write unit tests for translation coverage
    - Test all required translation keys exist in both locales
    - Test translation structure matches between locales
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

- [-] 3. Implement i18n configuration
  - [x] 3.1 Create i18n instance configuration (i18n/index.ts)
    - Implement getBrowserLocale() function with Chinese variant mapping
    - Implement getInitialLocale() function with localStorage check
    - Create i18n instance with Composition API mode (legacy: false)
    - Implement persistLocale() function with error handling
    - Configure fallback locale and missing key handling
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 4.1, 4.2, 4.3, 7.1, 7.2_

  - [ ]* 3.2 Write property test for browser language detection
    - **Property 1: Browser language detection and mapping**
    - **Validates: Requirements 1.1, 1.2, 1.3**

  - [ ]* 3.3 Write property test for stored preference priority
    - **Property 2: Stored preference priority**
    - **Validates: Requirements 1.4**

  - [ ]* 3.4 Write unit tests for i18n configuration
    - Test localStorage unavailable scenario
    - Test invalid locale handling
    - Test fallback locale behavior
    - _Requirements: 1.1, 1.4_

- [x] 4. Register i18n plugin in main application
  - Import i18n instance in main.ts
  - Register i18n plugin before app.mount()
  - Ensure i18n initializes before any components render
  - _Requirements: 1.5, 7.1_

- [ ] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Create LanguageSwitcher component
  - [x] 6.1 Implement LanguageSwitcher.vue with dropdown UI
    - Import useI18n composable from vue-i18n
    - Create dropdown button showing current language name
    - Implement dropdown menu with language options (中文, English)
    - Add click handler to toggle dropdown
    - Add click handler to change locale
    - Implement click-outside handler to close dropdown
    - Add proper ARIA labels and roles
    - Style with Tailwind CSS matching existing design system
    - _Requirements: 2.1, 2.2, 6.1, 6.2, 6.3, 6.4, 6.5_

  - [x] 6.2 Implement locale change logic
    - Update i18n locale value
    - Call persistLocale() to save to localStorage
    - Update HTML lang attribute
    - Implement screen reader announcement for locale changes
    - _Requirements: 2.2, 2.3, 10.1, 10.2, 10.4_

  - [x] 6.3 Add keyboard navigation support
    - Handle Tab key for focus navigation
    - Handle Enter/Space to open dropdown and select options
    - Handle Escape to close dropdown
    - Handle Arrow keys for option navigation
    - _Requirements: 6.6_

  - [ ]* 6.4 Write property test for keyboard navigation
    - **Property 13: Keyboard navigation support**
    - **Validates: Requirements 6.6**

  - [ ]* 6.5 Write unit tests for LanguageSwitcher
    - Test component renders with current language
    - Test dropdown opens on click
    - Test locale changes on option selection
    - Test ARIA labels are present
    - _Requirements: 2.1, 6.2, 6.3, 6.5_

- [x] 7. Integrate LanguageSwitcher into NavBar
  - Import LanguageSwitcher component in NavBar.vue
  - Add LanguageSwitcher next to ThemeToggle in NavBar
  - Ensure proper spacing and alignment
  - Test responsive behavior on mobile
  - _Requirements: 6.1_

- [x] 8. Update App.vue with i18n integration
  - [x] 8.1 Add locale watcher to update HTML lang attribute
    - Import useI18n composable
    - Set initial HTML lang attribute on mount
    - Watch locale changes and update HTML lang attribute
    - Call persistLocale() on locale changes
    - _Requirements: 10.1, 10.2_

  - [ ]* 8.2 Write property test for HTML lang attribute reactivity
    - **Property 11: HTML lang attribute reactivity**
    - **Validates: Requirements 10.1, 10.2**

- [ ] 9. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Update HeroSection component with translations
  - [x] 10.1 Replace hardcoded text with translation keys
    - Import useI18n composable
    - Replace headline with t('hero.title') and t('hero.titleHighlight')
    - Replace subtitle with t('hero.subtitle')
    - Replace button labels with t('hero.installButton') and t('hero.learnMoreButton')
    - Replace ARIA labels with translated versions
    - _Requirements: 3.1, 3.6_

  - [ ]* 10.2 Write property test for reactive locale updates
    - **Property 3: Reactive locale updates**
    - **Validates: Requirements 2.2, 5.4**

- [x] 11. Update FeaturesSection component with translations
  - Import useI18n composable
  - Replace section title with t('features.title')
  - Replace section subtitle with t('features.subtitle')
  - Replace feature card titles and descriptions with translation keys
  - Replace ARIA label with t('features.listAriaLabel')
  - _Requirements: 3.2, 3.6_

- [x] 12. Update NavBar component with translations
  - Import useI18n composable
  - Replace navigation link labels with translation keys
  - Update ARIA labels with translated versions
  - _Requirements: 3.3, 3.6_

- [x] 13. Update Footer component with translations
  - Import useI18n composable
  - Replace copyright text with t('footer.copyright')
  - _Requirements: 3.4_

- [ ] 14. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 15. Implement advanced i18n features
  - [x] 15.1 Add parameter interpolation support
    - Test interpolation in languageChanged message
    - Ensure curly brace syntax works correctly
    - _Requirements: 4.4, 7.6_

  - [ ]* 15.2 Write property test for parameter interpolation
    - **Property 7: Parameter interpolation**
    - **Validates: Requirements 4.4, 7.6**

  - [x] 15.3 Add pluralization support (if needed)
    - Configure pluralization rules in i18n
    - Add example plural translations
    - _Requirements: 4.5_

  - [ ]* 15.4 Write property test for pluralization
    - **Property 8: Pluralization support**
    - **Validates: Requirements 4.5**

  - [ ]* 15.5 Write property test for dot notation access
    - **Property 6: Dot notation access**
    - **Validates: Requirements 4.3, 7.5**

  - [ ]* 15.6 Write property test for missing key fallback
    - **Property 5: Missing translation key fallback**
    - **Validates: Requirements 3.7**

- [ ] 16. Implement URL parameter integration (optional)
  - [ ] 16.1 Add router beforeEach hook for lang parameter
    - Check for lang query parameter in URL
    - Validate and apply locale from URL parameter
    - Update URL when locale changes
    - _Requirements: 8.1, 8.2, 8.3, 8.4_

  - [ ]* 16.2 Write property test for URL parameter integration
    - **Property 9: URL parameter integration**
    - **Validates: Requirements 8.1, 8.2, 8.3, 8.4**

- [ ] 17. Performance optimization and testing
  - [ ] 17.1 Verify language switch performance
    - Measure time for locale change to complete
    - Ensure updates complete within 100ms
    - _Requirements: 9.2_

  - [ ]* 17.2 Write property test for language switch performance
    - **Property 10: Language switch performance**
    - **Validates: Requirements 9.2**

  - [ ] 17.3 Test for layout shifts during language switching
    - Verify no content jumping or layout shifts
    - Test with both short and long translations
    - _Requirements: 9.3_

- [ ] 18. Accessibility verification
  - [ ] 18.1 Verify ARIA label translations
    - Test all interactive elements have translated ARIA labels
    - Test screen reader announcements work
    - _Requirements: 10.3, 10.4_

  - [ ]* 18.2 Write property test for ARIA label translation
    - **Property 12: ARIA label translation**
    - **Validates: Requirements 10.3**

  - [ ] 18.3 Verify text direction (LTR)
    - Ensure both Chinese and English display left-to-right
    - Test no RTL issues
    - _Requirements: 10.5_

- [ ] 19. Final integration testing
  - [ ]* 19.1 Write property test for locale persistence round-trip
    - **Property 4: Locale persistence round-trip**
    - **Validates: Requirements 2.3, 2.4, 5.5**

  - [ ] 19.2 Test complete user flow
    - Test initial page load with browser detection
    - Test language switching via UI
    - Test page reload preserves language
    - Test URL parameter override
    - Test all components display correct translations

- [ ] 20. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- Translation files should be created before implementing components
- i18n configuration must be completed before integrating into components
- Test language switching thoroughly across all components
- Ensure accessibility features work correctly with translations
