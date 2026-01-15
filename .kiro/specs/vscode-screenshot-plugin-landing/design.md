# Design Document: VSCode Screenshot Plugin Landing Page

## Overview

This design document outlines the architecture and implementation approach for a modern, tech-focused landing page showcasing a VSCode screenshot extension. The application will be built using Vue 3 with TypeScript, featuring a sophisticated dark/light theme system, responsive bento grid layouts, and smooth animations that respect accessibility preferences.

The landing page follows a developer tool aesthetic with dark mode as the primary experience, using syntax-inspired colors and clean typography. The design emphasizes visual demonstrations of the plugin's capabilities through realistic code preview components.

## Architecture

### Technology Stack

- **Framework**: Vue 3.4+ with Composition API (`<script setup>` syntax)
- **Language**: TypeScript 5.0+ (strict mode)
- **Build Tool**: Vite 5.0+
- **Routing**: Vue Router 4.0+
- **State Management**: Pinia 2.0+
- **Styling**: Tailwind CSS 3.4+
- **Icons**: Heroicons (SVG)

### Project Structure

```
src/
├── assets/
│   └── styles/
│       └── main.css          # Tailwind imports and custom styles
├── components/
│   ├── layout/
│   │   ├── NavBar.vue        # Fixed navigation with theme toggle
│   │   └── Footer.vue        # Footer with links
│   ├── sections/
│   │   ├── HeroSection.vue   # Hero with headline and CTA
│   │   ├── FeaturesSection.vue # Bento grid feature showcase
│   │   └── DemoSection.vue   # Code preview demonstrations
│   ├── ui/
│   │   ├── ThemeToggle.vue   # Theme switcher button
│   │   ├── CodePreview.vue   # Mock screenshot component
│   │   └── FeatureCard.vue   # Individual feature card
│   └── icons/
│       └── (SVG icon components)
├── stores/
│   └── theme.ts              # Pinia theme store
├── router/
│   └── index.ts              # Vue Router configuration
├── types/
│   └── index.ts              # TypeScript interfaces
├── App.vue                   # Root component
└── main.ts                   # Application entry point
```

### State Management Architecture

The application uses Pinia for centralized state management with the following stores:

**Theme Store** (`stores/theme.ts`):
- State: `isDark: boolean`, `systemPreference: boolean`
- Actions: `toggleTheme()`, `setTheme(mode: 'dark' | 'light')`, `initTheme()`
- Getters: `currentTheme: 'dark' | 'light'`
- Persistence: Uses localStorage with key `vscode-plugin-theme`

## Components and Interfaces

### Core Components

#### 1. NavBar Component

**Purpose**: Fixed navigation bar with glass morphism effect and theme toggle

**Props**: None

**Emits**: None

**Template Structure**:
```vue
<nav class="fixed top-4 left-4 right-4 z-50">
  <div class="max-w-7xl mx-auto">
    <div class="backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 
                rounded-2xl border border-gray-200 dark:border-slate-700 
                px-6 py-4">
      <!-- Logo/Brand -->
      <!-- Navigation Links -->
      <!-- Theme Toggle -->
    </div>
  </div>
</nav>
```

**Key Features**:
- Floating design with top-4 spacing
- Glass morphism: `backdrop-blur-lg` with semi-transparent background
- Smooth theme transitions
- Responsive: collapses to mobile menu on < 768px

#### 2. ThemeToggle Component

**Purpose**: Button to switch between dark and light themes

**Props**: None

**Emits**: None (uses Pinia store directly)

**Implementation**:
```typescript
interface ThemeToggleState {
  isTransitioning: boolean;
}

const themeStore = useThemeStore();
const toggleTheme = () => {
  themeStore.toggleTheme();
};
```

**Visual Design**:
- Icon-based toggle (sun/moon icons from Heroicons)
- Smooth rotation animation on toggle
- Tooltip showing current mode
- Respects `prefers-reduced-motion`

#### 3. HeroSection Component

**Purpose**: Primary above-the-fold section with value proposition

**Props**: None

**Template Structure**:
```vue
<section class="min-h-screen flex items-center justify-center px-4 pt-24">
  <div class="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
    <!-- Left: Text Content -->
    <div>
      <h1 class="font-heading text-5xl lg:text-7xl font-bold">
        <!-- Headline -->
      </h1>
      <p class="font-body text-xl text-slate-600 dark:text-slate-400">
        <!-- Subheadline -->
      </p>
      <button class="bg-blue-600 hover:bg-blue-700 transition-colors">
        <!-- CTA -->
      </button>
    </div>
    
    <!-- Right: Animated Code Preview -->
    <div>
      <CodePreview :animated="true" />
    </div>
  </div>
</section>
```

**Typography**:
- Heading: Space Grotesk, 700 weight, 3rem-7rem responsive
- Body: DM Sans, 400 weight, 1.25rem
- Color: Dark mode #F1F5F9, Light mode #1E293B

#### 4. FeaturesSection Component

**Purpose**: Showcase plugin features in bento grid layout

**Props**: None

**Data Structure**:
```typescript
interface Feature {
  id: string;
  title: string;
  description: string;
  icon: Component; // Heroicons component
  gridClass: string; // Tailwind grid positioning
  preview?: CodePreviewConfig;
}

const features: Feature[] = [
  {
    id: 'function-screenshot',
    title: 'Capture Functions',
    description: 'Select any function and generate a beautiful screenshot',
    icon: CameraIcon,
    gridClass: 'lg:col-span-2 lg:row-span-2',
    preview: { /* ... */ }
  },
  // ... more features
];
```

**Layout**:
- Desktop (≥ 1024px): CSS Grid with `grid-cols-3` and varying row spans
- Tablet (768px-1023px): `grid-cols-2`
- Mobile (< 768px): `grid-cols-1` (stacked)

**Card Interaction**:
```css
.feature-card {
  @apply transition-all duration-300 cursor-pointer;
  @apply hover:shadow-2xl hover:scale-[1.02];
  @apply dark:bg-slate-800/50 bg-white;
  @apply border border-slate-700 dark:border-slate-600;
}
```

#### 5. CodePreview Component

**Purpose**: Display realistic mock screenshots of plugin output

**Props**:
```typescript
interface CodePreviewProps {
  code: string;
  language: string;
  filename: string;
  startLine?: number;
  animated?: boolean;
  theme?: 'dark' | 'light';
}
```

**Visual Structure**:
```vue
<div class="code-preview rounded-lg overflow-hidden shadow-xl">
  <!-- Header: Filename -->
  <div class="px-4 py-2 bg-slate-800 dark:bg-slate-900 
              border-b border-slate-700">
    <span class="text-sm text-slate-300">{{ filename }}</span>
  </div>
  
  <!-- Code Content with Line Numbers -->
  <div class="flex bg-slate-900 dark:bg-black">
    <!-- Line Numbers -->
    <div class="px-3 py-4 text-slate-500 text-right select-none">
      <div v-for="n in lineCount" :key="n">{{ startLine + n - 1 }}</div>
    </div>
    
    <!-- Code -->
    <div class="flex-1 px-4 py-4 overflow-x-auto">
      <pre><code class="syntax-highlighted">{{ code }}</code></pre>
    </div>
  </div>
</div>
```

**Syntax Highlighting**:
- Dark theme: Background #0D1117, text #C9D1D9
- Light theme: Background #FFFFFF, text #24292F
- Keywords: #FF7B72 (dark) / #CF222E (light)
- Strings: #A5D6FF (dark) / #0A3069 (light)
- Comments: #8B949E (dark) / #6E7781 (light)

### TypeScript Interfaces

```typescript
// types/index.ts

export type Theme = 'dark' | 'light';

export interface ThemeState {
  isDark: boolean;
  systemPreference: boolean;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: Component;
  gridClass: string;
  preview?: CodePreviewConfig;
}

export interface CodePreviewConfig {
  code: string;
  language: string;
  filename: string;
  startLine: number;
  animated: boolean;
}

export interface NavigationLink {
  label: string;
  href: string;
  external?: boolean;
}
```

## Data Models

### Theme Store Model

```typescript
// stores/theme.ts
import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  // State
  const isDark = ref<boolean>(false);
  const systemPreference = ref<boolean>(false);
  
  // Getters
  const currentTheme = computed<Theme>(() => isDark.value ? 'dark' : 'light');
  
  // Actions
  const initTheme = () => {
    // Check localStorage first
    const stored = localStorage.getItem('vscode-plugin-theme');
    if (stored) {
      isDark.value = stored === 'dark';
    } else {
      // Fall back to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      isDark.value = prefersDark;
      systemPreference.value = true;
    }
    applyTheme();
  };
  
  const toggleTheme = () => {
    isDark.value = !isDark.value;
    systemPreference.value = false;
    applyTheme();
  };
  
  const setTheme = (theme: Theme) => {
    isDark.value = theme === 'dark';
    systemPreference.value = false;
    applyTheme();
  };
  
  const applyTheme = () => {
    // Update DOM
    if (isDark.value) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Persist to localStorage
    localStorage.setItem('vscode-plugin-theme', currentTheme.value);
  };
  
  // Watch for system preference changes
  watch(() => systemPreference.value, (usesSystem) => {
    if (usesSystem) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = (e: MediaQueryListEvent) => {
        isDark.value = e.matches;
        applyTheme();
      };
      mediaQuery.addEventListener('change', handler);
    }
  });
  
  return {
    isDark,
    systemPreference,
    currentTheme,
    initTheme,
    toggleTheme,
    setTheme
  };
});
```

### Router Configuration

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 100 // Account for fixed navbar
      };
    }
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  }
});

export default router;
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*


### Property Reflection

After analyzing all acceptance criteria, I've identified the following consolidations to eliminate redundancy:

**Consolidations:**
1. Properties 1.3 and 1.4 (theme persistence) can be combined into a single round-trip property
2. Properties 2.7, 3.3, and 5.7 (responsive layout) can be combined into a comprehensive responsive design property
3. Properties 3.4, 4.1, and 4.2 (code preview elements) can be combined into a single property about code preview structure
4. Properties 9.4, 9.5, 9.6, and 9.7 (consistent styling) can be combined into a comprehensive design system consistency property
5. Properties 6.3 and 6.4 (accessibility) can be combined into a comprehensive interactive element accessibility property

**Unique Properties Retained:**
- Theme detection and application (1.1, 1.2)
- Theme-specific color application (examples for verification)
- Code preview syntax highlighting (4.3)
- Navigation visibility during scroll (5.4)
- Reduced motion support (6.1)
- Color contrast compliance (6.2)
- Reactive state updates (7.3)
- Router navigation behavior (8.3, 8.4)
- TypeScript interface coverage (10.2)

### Correctness Properties

Property 1: System theme detection on initialization
*For any* system theme preference (dark or light), when the page initializes without a stored preference, the Landing_Page should apply the theme matching the system preference
**Validates: Requirements 1.1**

Property 2: Theme toggle state transition
*For any* current theme state (dark or light), clicking the theme toggle should transition to the opposite theme state
**Validates: Requirements 1.2**

Property 3: Theme persistence round-trip
*For any* theme selection (dark or light), storing the theme to localStorage and then reinitializing the page should restore the same theme
**Validates: Requirements 1.3, 1.4**

Property 4: Hover interaction feedback
*For any* interactive element (buttons, cards, links), hovering should apply visual feedback through CSS transitions (color, shadow, or transform)
**Validates: Requirements 2.5, 3.7**

Property 5: Responsive layout adaptation
*For any* viewport width at standard breakpoints (320px, 768px, 1024px, 1440px), the layout should adapt appropriately without horizontal scroll and with proper stacking on mobile
**Validates: Requirements 2.7, 3.3, 5.7, 6.6**

Property 6: SVG icon usage
*For any* feature card icon, the icon element should be an SVG component (not text emoji)
**Validates: Requirements 3.4**

Property 7: Code preview structure completeness
*For any* CodePreview component instance, the rendered output should contain line numbers, filename, and syntax-highlighted code
**Validates: Requirements 3.5, 4.1, 4.2**

Property 8: Theme-aware syntax highlighting
*For any* CodePreview component, when the theme changes, the syntax highlighting colors should update to match the new theme's color palette
**Validates: Requirements 4.3**

Property 9: Fixed navigation visibility
*For any* scroll position on the page, the Navigation_Bar should remain visible and accessible (position: fixed)
**Validates: Requirements 5.4**

Property 10: Container width consistency
*For any* main content container element, the max-width class should be consistent (either max-w-6xl or max-w-7xl throughout)
**Validates: Requirements 5.5**

Property 11: Reduced motion accessibility
*For any* component with animations, when prefers-reduced-motion is enabled, animations should be disabled or significantly reduced
**Validates: Requirements 6.1**

Property 12: Color contrast compliance
*For any* text element in any theme (dark or light), the color contrast ratio between text and background should meet WCAG AA standards (minimum 4.5:1)
**Validates: Requirements 6.2**

Property 13: Interactive element accessibility
*For any* interactive element (buttons, links, inputs), the element should have proper ARIA labels and visible focus states for keyboard navigation
**Validates: Requirements 6.3, 6.4**

Property 14: Reactive theme state propagation
*For any* component consuming theme state from Pinia, when the theme changes in the store, the component should reactively update its rendered output
**Validates: Requirements 7.3**

Property 15: Smooth scroll navigation
*For any* hash-based navigation to a section anchor, the page should scroll smoothly to that section with appropriate offset for the fixed navbar
**Validates: Requirements 8.3**

Property 16: URL hash synchronization
*For any* section that becomes visible in the viewport, the URL hash should update to reflect the current section
**Validates: Requirements 8.4**

Property 17: Design system consistency
*For any* styled element, spacing should use Tailwind's scale, border-radius should be consistent (rounded-lg or rounded-xl), hover transitions should be 200-300ms, and interactive elements should have cursor-pointer
**Validates: Requirements 9.4, 9.5, 9.6, 9.7**

Property 18: TypeScript interface coverage
*For any* data structure or component props, there should be a corresponding TypeScript interface defined
**Validates: Requirements 10.2**

## Error Handling

### Theme Initialization Errors

**Scenario**: localStorage is unavailable or blocked
- **Handling**: Gracefully fall back to system preference detection
- **Implementation**: Wrap localStorage access in try-catch blocks
```typescript
const getStoredTheme = (): Theme | null => {
  try {
    return localStorage.getItem('vscode-plugin-theme') as Theme | null;
  } catch (error) {
    console.warn('localStorage unavailable, using system preference');
    return null;
  }
};
```

### Media Query Errors

**Scenario**: matchMedia API is not supported
- **Handling**: Default to light theme
- **Implementation**: Check for matchMedia existence
```typescript
const getSystemPreference = (): boolean => {
  if (!window.matchMedia) {
    return false; // Default to light
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};
```

### Router Navigation Errors

**Scenario**: Invalid hash navigation or missing section
- **Handling**: Scroll to top of page instead of throwing error
- **Implementation**: Validate hash target exists before scrolling
```typescript
scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    const element = document.querySelector(to.hash);
    if (element) {
      return { el: to.hash, behavior: 'smooth', top: 100 };
    }
  }
  return { top: 0 };
}
```

### Component Rendering Errors

**Scenario**: Missing props or invalid data
- **Handling**: Use default values and log warnings
- **Implementation**: Define prop defaults and validate in development
```typescript
interface CodePreviewProps {
  code?: string;
  language?: string;
  filename?: string;
  startLine?: number;
}

const props = withDefaults(defineProps<CodePreviewProps>(), {
  code: '// No code provided',
  language: 'typescript',
  filename: 'example.ts',
  startLine: 1
});
```

## Testing Strategy

### Dual Testing Approach

This project will use both unit tests and property-based tests to ensure comprehensive coverage:

**Unit Tests**: Verify specific examples, edge cases, and error conditions
- Component rendering with specific props
- Theme toggle button click behavior
- Router navigation to specific sections
- Error handling scenarios (localStorage unavailable, invalid props)

**Property-Based Tests**: Verify universal properties across all inputs
- Theme persistence round-trip with random theme values
- Responsive layout at random viewport widths
- Color contrast for randomly generated color combinations
- Component reactivity with random state changes

### Property-Based Testing Configuration

**Library**: We will use `@fast-check/vitest` for property-based testing in Vue/TypeScript projects.

**Installation**:
```bash
npm install -D @fast-check/vitest vitest @vue/test-utils happy-dom
```

**Configuration**: Each property test will run a minimum of 100 iterations to ensure thorough coverage through randomization.

**Test Tagging**: Each property-based test will include a comment referencing its design document property:
```typescript
// Feature: vscode-screenshot-plugin-landing, Property 3: Theme persistence round-trip
```

### Unit Testing Focus

Unit tests should focus on:
1. **Specific Examples**: Verify hero section renders with expected content
2. **Edge Cases**: Test theme initialization when localStorage is blocked
3. **Integration Points**: Test Pinia store integration with components
4. **Error Conditions**: Test component behavior with missing or invalid props

Avoid writing too many unit tests for scenarios that property-based tests will cover (e.g., don't write 10 unit tests for different viewport widths when a property test can cover all widths).

### Property Testing Focus

Property tests should focus on:
1. **Universal Properties**: Theme round-trip works for any theme value
2. **Comprehensive Input Coverage**: Responsive layout works at any viewport width
3. **Invariants**: Color contrast always meets WCAG standards regardless of theme
4. **State Transitions**: Theme toggle always transitions to opposite state

### Test Organization

```
src/
├── components/
│   ├── layout/
│   │   ├── NavBar.vue
│   │   ├── NavBar.test.ts          # Unit tests
│   │   └── NavBar.property.test.ts # Property tests
│   └── ui/
│       ├── ThemeToggle.vue
│       └── ThemeToggle.test.ts
├── stores/
│   ├── theme.ts
│   ├── theme.test.ts
│   └── theme.property.test.ts
```

### Example Property Test Structure

```typescript
import { describe, it } from 'vitest';
import { fc, test } from '@fast-check/vitest';
import { useThemeStore } from '@/stores/theme';

describe('Theme Store Properties', () => {
  // Feature: vscode-screenshot-plugin-landing, Property 3: Theme persistence round-trip
  test.prop([fc.constantFrom('dark', 'light')])('theme persistence round-trip', (theme) => {
    const store = useThemeStore();
    
    // Set theme
    store.setTheme(theme);
    
    // Simulate page reload by creating new store instance
    const newStore = useThemeStore();
    newStore.initTheme();
    
    // Verify theme persisted
    expect(newStore.currentTheme).toBe(theme);
  }, { numRuns: 100 });
});
```

### Testing Checklist

Before considering implementation complete:
- [ ] All unit tests pass
- [ ] All property tests pass (minimum 100 iterations each)
- [ ] Each correctness property has a corresponding property test
- [ ] Edge cases are covered by unit tests
- [ ] Error handling is tested
- [ ] Accessibility features are tested (ARIA labels, focus states, reduced motion)
- [ ] Responsive behavior is tested at all breakpoints
- [ ] Theme persistence is tested across page reloads
