# Requirements Document

## Introduction

本文档规定了为VSCode截图插件落地页添加国际化（i18n）支持的需求。该系统将支持中文和英文两种语言，允许用户在两种语言之间切换，并根据浏览器语言偏好自动检测默认语言。

## Glossary

- **I18n_System**: 国际化系统，负责管理和提供多语言支持
- **Language_Switcher**: 语言切换器UI组件，允许用户在支持的语言之间切换
- **Translation_Store**: Pinia状态管理存储，管理当前语言和翻译数据
- **Locale**: 语言区域设置，如'zh-CN'（简体中文）或'en-US'（英文）
- **Translation_Key**: 翻译键，用于标识特定文本内容的唯一字符串
- **Landing_Page**: 落地页应用程序

## Requirements

### Requirement 1: Language Detection and Initialization

**User Story:** 作为访问者，我希望页面能够自动检测我的浏览器语言偏好，这样我就能看到我熟悉的语言。

#### Acceptance Criteria

1. WHEN the page loads for the first time, THE I18n_System SHALL detect the user's browser language preference
2. WHEN the browser language is Chinese (zh, zh-CN, zh-TW), THE I18n_System SHALL set the default locale to 'zh-CN'
3. WHEN the browser language is not Chinese, THE I18n_System SHALL set the default locale to 'en-US'
4. WHEN a stored language preference exists in localStorage, THE I18n_System SHALL use the stored preference instead of browser detection
5. THE I18n_System SHALL initialize before any components render to prevent content flashing

### Requirement 2: Language Switching

**User Story:** 作为用户，我希望能够手动切换语言，这样我就可以选择我偏好的语言阅读内容。

#### Acceptance Criteria

1. WHEN a user clicks the language switcher, THE Language_Switcher SHALL display available language options (中文, English)
2. WHEN a user selects a language, THE I18n_System SHALL update all displayed text to the selected language immediately
3. WHEN the language changes, THE I18n_System SHALL persist the user's choice to localStorage
4. WHEN a user returns to the page, THE Landing_Page SHALL load their previously selected language from localStorage
5. THE Language_Switcher SHALL display the current language name in its native form (中文 for Chinese, English for English)

### Requirement 3: Translation Coverage

**User Story:** 作为内容维护者，我希望所有用户可见的文本都能被翻译，这样用户就能获得完整的多语言体验。

#### Acceptance Criteria

1. THE I18n_System SHALL provide translations for all HeroSection content (headline, subheadline, CTA buttons)
2. THE I18n_System SHALL provide translations for all FeaturesSection content (section title, description, feature titles, feature descriptions)
3. THE I18n_System SHALL provide translations for all NavBar content (brand name, navigation links)
4. THE I18n_System SHALL provide translations for all Footer content (links, copyright text)
5. THE I18n_System SHALL provide translations for all button labels and interactive elements
6. THE I18n_System SHALL provide translations for all ARIA labels for accessibility
7. WHEN a translation key is missing, THE I18n_System SHALL display the translation key itself as fallback text

### Requirement 4: Translation Data Structure

**User Story:** 作为开发者，我希望翻译数据结构清晰且易于维护，这样添加新翻译或修改现有翻译就会很简单。

#### Acceptance Criteria

1. THE I18n_System SHALL organize translations in separate JSON files per locale (zh-CN.json, en-US.json)
2. THE I18n_System SHALL use nested object structure for organizing related translations
3. THE I18n_System SHALL use dot notation for accessing nested translation keys (e.g., 'hero.title')
4. THE I18n_System SHALL support interpolation for dynamic values in translations
5. THE I18n_System SHALL support pluralization rules for count-based translations

### Requirement 5: State Management Integration

**User Story:** 作为开发者，我希望语言状态通过Pinia集中管理，这样状态变化就能在所有组件中响应式更新。

#### Acceptance Criteria

1. THE Translation_Store SHALL manage current locale state
2. THE Translation_Store SHALL provide actions for changing locale
3. THE Translation_Store SHALL provide getters for accessing current locale and translations
4. WHEN the locale changes in the store, THE Landing_Page SHALL reactively update all components
5. THE Translation_Store SHALL persist locale preference using localStorage

### Requirement 6: Language Switcher Component

**User Story:** 作为用户，我希望语言切换器易于找到和使用，这样我就能快速切换语言。

#### Acceptance Criteria

1. THE Language_Switcher SHALL be located in the NavBar component next to the theme toggle
2. THE Language_Switcher SHALL display the current language code or icon
3. WHEN clicked, THE Language_Switcher SHALL show a dropdown or toggle between languages
4. THE Language_Switcher SHALL provide visual feedback on hover and focus
5. THE Language_Switcher SHALL include proper ARIA labels for accessibility
6. THE Language_Switcher SHALL support keyboard navigation

### Requirement 7: Translation Helper Functions

**User Story:** 作为开发者，我希望有便捷的辅助函数来访问翻译，这样在组件中使用翻译就会很简单。

#### Acceptance Criteria

1. THE I18n_System SHALL provide a composable function (useI18n) for accessing translations in components
2. THE useI18n composable SHALL return a translation function (t) that accepts translation keys
3. THE useI18n composable SHALL return the current locale
4. THE useI18n composable SHALL return a function to change locale
5. THE translation function SHALL support nested key access with dot notation
6. THE translation function SHALL support parameter interpolation

### Requirement 8: URL and Routing Integration

**User Story:** 作为用户，我希望URL能够反映当前语言，这样我就可以分享特定语言的页面链接。

#### Acceptance Criteria

1. THE I18n_System SHALL support optional locale parameter in URL (e.g., /?lang=zh-CN)
2. WHEN a locale parameter exists in URL, THE I18n_System SHALL use it as the initial locale
3. WHEN the locale changes, THE I18n_System SHALL update the URL parameter without page reload
4. THE I18n_System SHALL maintain URL locale parameter during navigation

### Requirement 9: Performance and Loading

**User Story:** 作为用户，我希望语言切换是即时的，不会影响页面性能。

#### Acceptance Criteria

1. THE I18n_System SHALL load all translation files at application initialization
2. WHEN switching languages, THE Landing_Page SHALL update content within 100ms
3. THE I18n_System SHALL not cause layout shifts during language switching
4. THE I18n_System SHALL bundle translation files with the main application bundle

### Requirement 10: Accessibility and Semantics

**User Story:** 作为有辅助功能需求的用户，我希望语言切换功能是可访问的，这样我就能使用屏幕阅读器等辅助技术。

#### Acceptance Criteria

1. THE Landing_Page SHALL set the HTML lang attribute to match the current locale
2. WHEN the locale changes, THE Landing_Page SHALL update the HTML lang attribute
3. THE Language_Switcher SHALL include proper ARIA labels in the current language
4. THE Language_Switcher SHALL announce language changes to screen readers
5. THE I18n_System SHALL maintain proper text direction (LTR for both Chinese and English)
