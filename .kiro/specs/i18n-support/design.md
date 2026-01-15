# Design Document: Internationalization Support (i18n)

## Overview

This design document outlines the architecture and implementation approach for adding internationalization (i18n) support to the VSCode Screenshot Plugin landing page. The system will support Chinese (Simplified) and English languages, allowing users to switch between them seamlessly while maintaining their language preference across sessions.

The implementation will use **vue-i18n v9**, the official internationalization plugin for Vue 3, which provides robust support for the Composition API, TypeScript, and reactive translations. The design emphasizes performance, accessibility, and developer experience with a clear translation key structure and type-safe translation access.

## Architecture

### Technology Stack

- **I18n Library**: vue-i18n v9.x (official Vue 3 i18n plugin)
- **State Management**: Pinia store for locale state
- **Storage**: localStorage for persistence
- **Translation Format**: JSON files per locale
- **Type Safety**: TypeScript interfaces for translation keys

### Project Structure

```
src/
├── i18n/
│   ├── index.ts              # i18n instance configuration
│   ├── locales/
│   │   ├── zh-CN.json        # Chinese translations
│   │   └── en-US.json        # English translations
│   └── types.ts              # TypeScript types for translations
├── stores/
│   └── locale.ts             # Pinia locale store (optional, for additional state)
├── components/
│   └── ui/
│       └── LanguageSwitcher.vue  # Language switcher component
└── main.ts                   # App entry with i18n plugin registration
```

### Architecture Decisions

**1. vue-i18n Integration Strategy**:
- Use Composition API mode (`legacy: false`) for better Vue 3 integration
- Global i18n instance for app-wide translations
- Component-level `useI18n()` composable for accessing translations

**2. State Management**:
- vue-i18n manages locale state internally
- Optional Pinia store for additional UI state (e.g., dropdown open/closed)
- localStorage for persistence handled by custom plugin

**3. Translation Loading**:
- Eager loading: all translations bundled with app (small size, only 2 locales)
- No lazy loading needed for this use case

## Components and Interfaces

### Core Components

#### 1. I18n Configuration (`src/i18n/index.ts`)

**Purpose**: Create and configure the vue-i18n instance

**Implementation**:
```typescript
import { createI18n } from 'vue-i18n';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

// Detect browser language
const getBrowserLocale = (): string => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en-US';
  
  // Map Chinese variants to zh-CN
  if (browserLang.startsWith('zh')) {
    return 'zh-CN';
  }
  
  // Default to en-US for all other languages
  return 'en-US';
};

// Get stored locale or detect from browser
const getInitialLocale = (): string => {
  try {
    const stored = localStorage.getItem('vscode-plugin-locale');
    if (stored && ['zh-CN', 'en-US'].includes(stored)) {
      return stored;
    }
  } catch (error) {
    console.warn('localStorage unavailable:', error);
  }
  
  return getBrowserLocale();
};

// Create i18n instance
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

// Persist locale changes to localStorage
export const persistLocale = (locale: string): void => {
  try {
    localStorage.setItem('vscode-plugin-locale', locale);
  } catch (error) {
    console.warn('Failed to persist locale:', error);
  }
};
```

**Key Features**:
- Browser language detection with Chinese variant mapping
- localStorage persistence with error handling
- Composition API mode for Vue 3
- Global injection for template usage

#### 2. LanguageSwitcher Component

**Purpose**: UI component for switching between languages

**Props**: None (uses global i18n instance)

**Template Structure**:
```vue
<template>
  <div class="language-switcher">
    <button
      @click="toggleDropdown"
      :aria-label="t('common.switchLanguage')"
      :aria-expanded="isOpen"
      class="switcher-button"
      type="button"
    >
      <span class="current-locale">{{ currentLocaleName }}</span>
      <ChevronDownIcon class="w-4 h-4" aria-hidden="true" />
    </button>
    
    <transition name="dropdown">
      <div v-if="isOpen" class="dropdown-menu" role="menu">
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="changeLocale(locale.code)"
          :class="{ 'active': currentLocale === locale.code }"
          class="dropdown-item"
          role="menuitem"
          type="button"
        >
          {{ locale.name }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { persistLocale } from '@/i18n';

interface LocaleOption {
  code: string;
  name: string;
}

const { locale, t } = useI18n();
const isOpen = ref(false);

const availableLocales: LocaleOption[] = [
  { code: 'zh-CN', name: '中文' },
  { code: 'en-US', name: 'English' }
];

const currentLocale = computed(() => locale.value);

const currentLocaleName = computed(() => {
  return availableLocales.find(l => l.code === currentLocale.value)?.name || 'English';
});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const changeLocale = (newLocale: string) => {
  locale.value = newLocale;
  persistLocale(newLocale);
  isOpen.value = false;
  
  // Update HTML lang attribute
  document.documentElement.setAttribute('lang', newLocale);
  
  // Announce to screen readers
  announceLocaleChange(newLocale);
};

const announceLocaleChange = (newLocale: string) => {
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
  if (!target.closest('.language-switcher')) {
    isOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
```

**Visual Design**:
- Dropdown button showing current language name
- Dropdown menu with language options
- Active state for current language
- Smooth transitions
- Keyboard navigation support


#### 3. Translation Files Structure

**Chinese Translations (`src/i18n/locales/zh-CN.json`)**:
```json
{
  "common": {
    "switchLanguage": "切换语言",
    "languageChanged": "语言已切换至{language}"
  },
  "nav": {
    "brand": "CodeSnap",
    "features": "功能特性",
    "demo": "演示",
    "install": "安装"
  },
  "hero": {
    "title": "精美的代码截图",
    "titleHighlight": "瞬间完成",
    "subtitle": "捕获令人惊艳的代码截图，完美的语法高亮、行号和可自定义主题。精美地分享您的作品。",
    "installButton": "安装扩展",
    "learnMoreButton": "了解更多",
    "installAriaLabel": "从VS Code市场安装CodeSnap扩展",
    "learnMoreAriaLabel": "了解更多关于CodeSnap的功能"
  },
  "features": {
    "title": "强大功能",
    "subtitle": "轻松捕获精美的代码截图。更多自定义选项即将推出。",
    "listAriaLabel": "CodeSnap功能列表",
    "captureFunction": {
      "title": "捕获函数",
      "description": "选择代码中的任何函数，生成带有语法高亮和行号的精美可分享截图。"
    },
    "selectionScreenshot": {
      "title": "选区截图",
      "description": "高亮代码的任何部分并立即捕获。非常适合文档、教程和代码审查。"
    },
    "copyFunction": {
      "title": "复制函数内容",
      "description": "快速将整个函数体复制到剪贴板。简化分享代码片段的工作流程。"
    },
    "customizableSettings": {
      "title": "可自定义设置",
      "description": "使用自定义主题、字体、内边距和背景颜色调整截图外观。定制每个细节以匹配您的风格。"
    },
    "vscodeIntegration": {
      "title": "VS Code集成",
      "description": "无缝集成到Visual Studio Code中。通过键盘快捷键和命令直接从编辑器访问所有功能。"
    }
  },
  "footer": {
    "copyright": "© 2024 CodeSnap. 保留所有权利。"
  }
}
```

**English Translations (`src/i18n/locales/en-US.json`)**:
```json
{
  "common": {
    "switchLanguage": "Switch Language",
    "languageChanged": "Language changed to {language}"
  },
  "nav": {
    "brand": "CodeSnap",
    "features": "Features",
    "demo": "Demo",
    "install": "Install"
  },
  "hero": {
    "title": "Beautiful Code Screenshots",
    "titleHighlight": "In Seconds",
    "subtitle": "Capture stunning screenshots of your code with perfect syntax highlighting, line numbers, and customizable themes. Share your work beautifully.",
    "installButton": "Install Extension",
    "learnMoreButton": "Learn More",
    "installAriaLabel": "Install CodeSnap extension from VS Code Marketplace",
    "learnMoreAriaLabel": "Learn more about CodeSnap features"
  },
  "features": {
    "title": "Powerful Features",
    "subtitle": "Capture beautiful code screenshots with ease. More customization options coming soon.",
    "listAriaLabel": "List of CodeSnap features",
    "captureFunction": {
      "title": "Capture Functions",
      "description": "Select any function in your code and generate a beautiful, shareable screenshot with syntax highlighting and line numbers."
    },
    "selectionScreenshot": {
      "title": "Selection Screenshots",
      "description": "Highlight any portion of your code and capture it instantly. Perfect for documentation, tutorials, and code reviews."
    },
    "copyFunction": {
      "title": "Copy Function Content",
      "description": "Quickly copy entire function bodies to your clipboard. Streamline your workflow when sharing code snippets."
    },
    "customizableSettings": {
      "title": "Customizable Settings",
      "description": "Adjust screenshot appearance with custom themes, fonts, padding, and background colors. Tailor every detail to match your style."
    },
    "vscodeIntegration": {
      "title": "VS Code Integration",
      "description": "Seamlessly integrated into Visual Studio Code. Access all features directly from your editor with keyboard shortcuts and commands."
    }
  },
  "footer": {
    "copyright": "© 2024 CodeSnap. All rights reserved."
  }
}
```

**Translation Key Structure**:
- Organized by component/section (common, nav, hero, features, footer)
- Nested structure for related translations
- Dot notation access (e.g., `t('hero.title')`)
- Interpolation support with curly braces (e.g., `{language}`)

### TypeScript Interfaces

```typescript
// src/i18n/types.ts

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
```

## Data Models

### I18n Instance Model

The vue-i18n instance manages the following state:

```typescript
interface I18nInstance {
  global: {
    locale: Ref<string>;
    fallbackLocale: Ref<string>;
    messages: Record<string, any>;
    t: (key: string, params?: Record<string, any>) => string;
    te: (key: string) => boolean; // Check if translation exists
  };
}
```

### Component Usage Pattern

```typescript
// In any component using <script setup>
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

// Access translations
const title = t('hero.title');

// With interpolation
const message = t('common.languageChanged', { language: '中文' });

// Change locale
locale.value = 'zh-CN';
```

### App.vue Integration

```typescript
// src/App.vue
import { watch, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { persistLocale } from '@/i18n';

const { locale } = useI18n();

// Set initial HTML lang attribute
onMounted(() => {
  document.documentElement.setAttribute('lang', locale.value);
});

// Watch for locale changes and update HTML lang attribute
watch(locale, (newLocale) => {
  document.documentElement.setAttribute('lang', newLocale);
  persistLocale(newLocale);
});
```

### Router Integration (Optional)

```typescript
// src/router/index.ts
import { i18n } from '@/i18n';

router.beforeEach((to, from, next) => {
  // Check for lang query parameter
  const langParam = to.query.lang as string;
  
  if (langParam && ['zh-CN', 'en-US'].includes(langParam)) {
    i18n.global.locale.value = langParam;
    persistLocale(langParam);
  }
  
  next();
});

// Update URL when locale changes
watch(() => i18n.global.locale.value, (newLocale) => {
  const currentRoute = router.currentRoute.value;
  if (currentRoute.query.lang !== newLocale) {
    router.replace({
      ...currentRoute,
      query: { ...currentRoute.query, lang: newLocale }
    });
  }
});
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property Reflection

After analyzing all acceptance criteria, I've identified the following consolidations to eliminate redundancy:

**Consolidations:**
1. Properties 1.2 and 1.3 (Chinese vs non-Chinese detection) can be combined into a single property about browser language mapping
2. Properties 2.3 and 2.4 (localStorage persistence) can be combined into a round-trip property
3. Properties 3.1-3.6 (translation coverage) are all examples of checking specific keys exist - can be verified through unit tests rather than properties
4. Properties 4.3, 7.5 (dot notation) are duplicates - keep one
5. Properties 4.4, 7.6 (interpolation) are duplicates - keep one
6. Properties 5.4 and 2.2 (reactive updates) are testing the same behavior
7. Properties 8.2, 8.3, 8.4 (URL parameter handling) can be combined into comprehensive URL integration property
8. Properties 10.1 and 10.2 (HTML lang attribute) can be combined into a single reactive property

**Unique Properties Retained:**
- Browser language detection and mapping
- localStorage priority over browser detection
- Reactive text updates on locale change
- Translation key fallback behavior
- Dot notation access
- Parameter interpolation
- Pluralization support
- Locale persistence round-trip
- URL parameter integration
- Performance (language switch timing)
- HTML lang attribute reactivity
- ARIA label translation
- Keyboard navigation

### Correctness Properties

Property 1: Browser language detection and mapping
*For any* browser language setting, when the page initializes without stored preference, the system should map Chinese language variants (zh, zh-CN, zh-TW) to 'zh-CN' and all other languages to 'en-US'
**Validates: Requirements 1.1, 1.2, 1.3**

Property 2: Stored preference priority
*For any* combination of stored locale and browser language, when both exist, the system should use the stored locale preference from localStorage instead of browser detection
**Validates: Requirements 1.4**

Property 3: Reactive locale updates
*For any* locale change, all displayed text content across all components should update to the new language immediately
**Validates: Requirements 2.2, 5.4**

Property 4: Locale persistence round-trip
*For any* locale selection, storing the locale to localStorage and then reinitializing the application should restore the same locale
**Validates: Requirements 2.3, 2.4, 5.5**

Property 5: Missing translation key fallback
*For any* non-existent translation key, the translation function should return the key itself as fallback text
**Validates: Requirements 3.7**

Property 6: Dot notation access
*For any* nested translation key using dot notation (e.g., 'hero.title'), the translation function should correctly access and return the nested value
**Validates: Requirements 4.3, 7.5**

Property 7: Parameter interpolation
*For any* translation with parameter placeholders and any parameter values, the translation function should correctly interpolate the parameters into the output string
**Validates: Requirements 4.4, 7.6**

Property 8: Pluralization support
*For any* translation with pluralization rules and any count value, the translation function should return the correct plural form based on the count
**Validates: Requirements 4.5**

Property 9: URL parameter integration
*For any* URL with a valid locale parameter, the system should initialize with that locale, update the URL when locale changes, and maintain the parameter during navigation
**Validates: Requirements 8.1, 8.2, 8.3, 8.4**

Property 10: Language switch performance
*For any* locale change, the content update should complete within 100ms
**Validates: Requirements 9.2**

Property 11: HTML lang attribute reactivity
*For any* locale value, the HTML document's lang attribute should match the current locale and update reactively when locale changes
**Validates: Requirements 10.1, 10.2**

Property 12: ARIA label translation
*For any* interactive element with ARIA labels, the labels should be translated to the current locale
**Validates: Requirements 10.3**

Property 13: Keyboard navigation support
*For any* keyboard navigation event (Tab, Enter, Escape) on the language switcher, the component should respond appropriately (navigate, select, close)
**Validates: Requirements 6.6**

## Error Handling

### localStorage Unavailability

**Scenario**: localStorage is blocked or unavailable (private browsing, security settings)
- **Handling**: Gracefully fall back to browser language detection
- **Implementation**: Wrap all localStorage access in try-catch blocks
```typescript
const getStoredLocale = (): string | null => {
  try {
    return localStorage.getItem('vscode-plugin-locale');
  } catch (error) {
    console.warn('localStorage unavailable, using browser detection');
    return null;
  }
};

const persistLocale = (locale: string): void => {
  try {
    localStorage.setItem('vscode-plugin-locale', locale);
  } catch (error) {
    console.warn('Failed to persist locale:', error);
  }
};
```

### Missing Translation Keys

**Scenario**: Translation key doesn't exist in current locale
- **Handling**: Return the key itself as fallback (vue-i18n default behavior)
- **Implementation**: Configure vue-i18n with fallback locale
```typescript
createI18n({
  fallbackLocale: 'en-US',
  missingWarn: process.env.NODE_ENV === 'development',
  fallbackWarn: process.env.NODE_ENV === 'development'
});
```

### Invalid Locale Parameter

**Scenario**: URL contains invalid locale parameter (e.g., `?lang=fr-FR`)
- **Handling**: Ignore invalid parameter and use stored preference or browser detection
- **Implementation**: Validate locale parameter before applying
```typescript
const langParam = to.query.lang as string;
const validLocales = ['zh-CN', 'en-US'];

if (langParam && validLocales.includes(langParam)) {
  i18n.global.locale.value = langParam;
} else if (langParam) {
  console.warn(`Invalid locale parameter: ${langParam}`);
}
```

### Component Rendering Before I18n Initialization

**Scenario**: Components try to access translations before i18n is initialized
- **Handling**: Initialize i18n before mounting Vue app
- **Implementation**: Create i18n instance before createApp
```typescript
// main.ts
import { createApp } from 'vue';
import { i18n } from './i18n';
import App from './App.vue';

const app = createApp(App);
app.use(i18n); // Register i18n before mounting
app.mount('#app');
```

### Browser Language Detection Failure

**Scenario**: navigator.language is undefined or unavailable
- **Handling**: Default to 'en-US'
- **Implementation**: Provide fallback in detection logic
```typescript
const getBrowserLocale = (): string => {
  const browserLang = navigator.language || navigator.languages?.[0] || 'en-US';
  return browserLang.startsWith('zh') ? 'zh-CN' : 'en-US';
};
```

## Testing Strategy

### Dual Testing Approach

This feature will use both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, and error conditions
- Language switcher renders with correct current language
- Clicking language option changes locale
- Specific translation keys exist in both locales
- ARIA labels are present and translated
- Error handling for localStorage unavailability

**Property-Based Tests**: Verify universal properties across all inputs
- Browser language detection works for any language code
- Locale persistence round-trip works for any locale
- Reactive updates work for any locale change
- URL parameter integration works for any valid locale
- Performance requirements met for any locale switch

### Property-Based Testing Configuration

**Library**: We will use `@fast-check/vitest` for property-based testing in Vue/TypeScript projects.

**Configuration**: Each property test will run a minimum of 100 iterations to ensure thorough coverage through randomization.

**Test Tagging**: Each property-based test will include a comment referencing its design document property:
```typescript
// Feature: i18n-support, Property 1: Browser language detection and mapping
```

### Unit Testing Focus

Unit tests should focus on:
1. **Specific Examples**: Verify hero section displays Chinese text when locale is zh-CN
2. **Edge Cases**: Test localStorage blocked scenario
3. **Integration Points**: Test i18n plugin integration with Vue app
4. **Error Conditions**: Test invalid locale parameter handling
5. **Component Behavior**: Test language switcher dropdown opens/closes

### Property Testing Focus

Property tests should focus on:
1. **Universal Properties**: Locale persistence works for any locale value
2. **Comprehensive Input Coverage**: Browser detection works for any language code
3. **Invariants**: HTML lang attribute always matches current locale
4. **State Transitions**: Locale change always triggers reactive updates

### Test Organization

```
src/
├── i18n/
│   ├── index.test.ts              # Unit tests for i18n config
│   ├── index.property.test.ts     # Property tests for i18n
│   └── locales/
│       └── translations.test.ts   # Unit tests for translation coverage
├── components/
│   └── ui/
│       ├── LanguageSwitcher.test.ts
│       └── LanguageSwitcher.property.test.ts
```

### Example Property Test Structure

```typescript
import { describe, it, expect } from 'vitest';
import { fc, test } from '@fast-check/vitest';
import { i18n, persistLocale, getInitialLocale } from '@/i18n';

describe('I18n Properties', () => {
  // Feature: i18n-support, Property 4: Locale persistence round-trip
  test.prop([fc.constantFrom('zh-CN', 'en-US')])('locale persistence round-trip', (locale) => {
    // Store locale
    persistLocale(locale);
    
    // Simulate page reload by getting initial locale
    const restoredLocale = getInitialLocale();
    
    // Verify locale persisted
    expect(restoredLocale).toBe(locale);
  }, { numRuns: 100 });
  
  // Feature: i18n-support, Property 1: Browser language detection and mapping
  test.prop([
    fc.constantFrom('zh', 'zh-CN', 'zh-TW', 'zh-HK', 'en', 'en-US', 'fr', 'de', 'ja', 'ko')
  ])('browser language detection and mapping', (browserLang) => {
    // Mock navigator.language
    Object.defineProperty(navigator, 'language', {
      value: browserLang,
      configurable: true
    });
    
    const detectedLocale = getBrowserLocale();
    
    // Verify mapping
    if (browserLang.startsWith('zh')) {
      expect(detectedLocale).toBe('zh-CN');
    } else {
      expect(detectedLocale).toBe('en-US');
    }
  }, { numRuns: 100 });
});
```

### Testing Checklist

Before considering implementation complete:
- [ ] All unit tests pass
- [ ] All property tests pass (minimum 100 iterations each)
- [ ] Each correctness property has a corresponding property test
- [ ] Translation coverage verified for all components
- [ ] Error handling tested (localStorage unavailable, invalid locale)
- [ ] Accessibility features tested (ARIA labels, keyboard navigation, screen reader announcements)
- [ ] Performance requirement verified (< 100ms language switch)
- [ ] URL parameter integration tested
- [ ] HTML lang attribute updates tested
