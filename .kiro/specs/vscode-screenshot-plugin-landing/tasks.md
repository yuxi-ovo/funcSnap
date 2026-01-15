# Implementation Plan: VSCode Screenshot Plugin Landing Page

## Overview

This implementation plan breaks down the development of a modern, tech-focused landing page for a VSCode screenshot extension. The page will be built incrementally, starting with project setup and core infrastructure, then building out components, implementing the theme system, and finally adding polish with animations and accessibility features.

## Tasks

- [x] 1. Project setup and configuration
  - Initialize Vite + Vue 3 + TypeScript project
  - Install dependencies: vue-router, pinia, tailwindcss, @heroicons/vue
  - Configure Tailwind CSS with dark mode support (class strategy)
  - Configure TypeScript with strict mode
  - Set up project directory structure (components/layout, components/sections, components/ui, stores, router, types)
  - Add Google Fonts imports for Space Grotesk and DM Sans
  - Configure Tailwind theme with custom colors and fonts
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

- [x] 2. TypeScript interfaces and type definitions
  - Create types/index.ts with Theme, ThemeState, Feature, CodePreviewConfig, and NavigationLink interfaces
  - Define prop types for all components
  - _Requirements: 10.2_

- [-] 3. Implement Pinia theme store
  - [x] 3.1 Create theme store with state, getters, and actions
    - Implement isDark ref, systemPreference ref, and currentTheme computed
    - Implement initTheme() action with localStorage and system preference detection
    - Implement toggleTheme() and setTheme() actions
    - Implement applyTheme() helper to update DOM and localStorage
    - Add error handling for localStorage unavailability
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 7.1, 7.2, 7.4_

  - [ ]* 3.2 Write property test for theme persistence round-trip
    - **Property 3: Theme persistence round-trip**
    - **Validates: Requirements 1.3, 1.4**

  - [ ]* 3.3 Write property test for theme toggle state transition
    - **Property 2: Theme toggle state transition**
    - **Validates: Requirements 1.2**

  - [ ]* 3.4 Write property test for system theme detection
    - **Property 1: System theme detection on initialization**
    - **Validates: Requirements 1.1**

  - [ ]* 3.5 Write unit tests for theme store error handling
    - Test localStorage unavailable scenario
    - Test matchMedia unsupported scenario
    - _Requirements: 1.1, 1.3_

- [x] 4. Implement Vue Router configuration
  - Create router/index.ts with home route
  - Configure scrollBehavior for smooth scrolling with hash navigation
  - Add error handling for invalid hash targets
  - _Requirements: 8.1, 8.2, 8.3_

- [ ]* 4.1 Write property test for smooth scroll navigation
  - **Property 15: Smooth scroll navigation**
  - **Validates: Requirements 8.3**

- [x] 5. Create ThemeToggle component
  - [x] 5.1 Implement ThemeToggle.vue with sun/moon icons from Heroicons
    - Use theme store to get current theme and toggle function
    - Add smooth rotation animation on toggle
    - Add tooltip showing current mode
    - Respect prefers-reduced-motion for animations
    - Include proper ARIA labels
    - _Requirements: 1.2, 6.1, 6.3_

  - [ ]* 5.2 Write property test for reduced motion accessibility
    - **Property 11: Reduced motion accessibility**
    - **Validates: Requirements 6.1**

  - [ ]* 5.3 Write unit test for ThemeToggle rendering
    - Test icon changes based on theme
    - Test click handler calls toggleTheme
    - _Requirements: 1.2_

- [-] 6. Create NavBar component
  - [x] 6.1 Implement NavBar.vue with fixed positioning and glass morphism
    - Add fixed positioning with top-4 spacing
    - Implement glass morphism effect (backdrop-blur-lg, semi-transparent background)
    - Include plugin name/logo and ThemeToggle component
    - Add responsive mobile menu (hamburger on < 768px)
    - Use consistent max-width container (max-w-7xl)
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 9.7_

  - [ ]* 6.2 Write property test for fixed navigation visibility
    - **Property 9: Fixed navigation visibility**
    - **Validates: Requirements 5.4**

  - [ ]* 6.3 Write property test for interactive element accessibility
    - **Property 13: Interactive element accessibility**
    - **Validates: Requirements 6.3, 6.4**

  - [ ]* 6.4 Write unit test for NavBar rendering
    - Test logo and ThemeToggle are present
    - Test glass morphism classes are applied
    - _Requirements: 5.2, 5.3_

- [x] 7. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [-] 8. Create CodePreview component
  - [x] 8.1 Implement CodePreview.vue with props and syntax highlighting
    - Define props: code, language, filename, startLine, animated, theme
    - Implement header with filename display
    - Implement line numbers column
    - Implement code content area with syntax highlighting
    - Apply theme-specific colors (dark: #0D1117 bg, light: #FFFFFF bg)
    - Add horizontal scroll for long lines
    - _Requirements: 4.1, 4.2, 4.3, 4.5, 4.6_

  - [ ]* 8.2 Write property test for code preview structure completeness
    - **Property 7: Code preview structure completeness**
    - **Validates: Requirements 3.5, 4.1, 4.2**

  - [ ]* 8.3 Write property test for theme-aware syntax highlighting
    - **Property 8: Theme-aware syntax highlighting**
    - **Validates: Requirements 4.3**

  - [ ]* 8.4 Write unit tests for CodePreview rendering
    - Test with various props combinations
    - Test default prop values
    - _Requirements: 4.1, 4.2_

- [x] 9. Create FeatureCard component
  - [x] 9.1 Implement FeatureCard.vue with hover effects
    - Define props: title, description, icon, gridClass, preview
    - Implement card layout with icon, title, and description
    - Add hover effects (shadow, scale transform)
    - Include CodePreview if preview prop provided
    - Add cursor-pointer and smooth transitions
    - _Requirements: 3.4, 3.7, 9.6, 9.7_

  - [ ]* 9.2 Write property test for hover interaction feedback
    - **Property 4: Hover interaction feedback**
    - **Validates: Requirements 2.5, 3.7**

  - [ ]* 9.3 Write property test for SVG icon usage
    - **Property 6: SVG icon usage**
    - **Validates: Requirements 3.4**

  - [ ]* 9.4 Write property test for design system consistency
    - **Property 17: Design system consistency**
    - **Validates: Requirements 9.4, 9.5, 9.6, 9.7**

- [x] 10. Create HeroSection component
  - [x] 10.1 Implement HeroSection.vue with headline, subheadline, and CTA
    - Create two-column grid layout (text left, preview right)
    - Add headline with Space Grotesk font (text-5xl lg:text-7xl)
    - Add subheadline with DM Sans font (text-xl)
    - Add prominent CTA button with hover effects
    - Include animated CodePreview component
    - Make responsive (stack vertically on mobile)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

  - [ ]* 10.2 Write property test for responsive layout adaptation
    - **Property 5: Responsive layout adaptation**
    - **Validates: Requirements 2.7, 3.3, 5.7, 6.6**

  - [ ]* 10.3 Write unit tests for HeroSection content
    - Test headline, subheadline, and CTA are rendered
    - Test fonts are applied correctly
    - _Requirements: 2.1, 2.2, 2.3, 2.6_

- [x] 11. Create FeaturesSection component
  - [x] 11.1 Implement FeaturesSection.vue with bento grid layout
    - Define features array with 3+ core features (function screenshot, selection screenshot, copy function)
    - Implement CSS Grid layout (grid-cols-3 on desktop, grid-cols-1 on mobile)
    - Use FeatureCard component for each feature
    - Include mention of future customization capabilities
    - Add appropriate icons from Heroicons (CameraIcon, DocumentDuplicateIcon, ClipboardIcon)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ]* 11.2 Write unit tests for FeaturesSection rendering
    - Test at least 3 feature cards are rendered
    - Test grid layout classes are applied
    - Test future customization text is present
    - _Requirements: 3.1, 3.2, 3.6_

- [x] 12. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 13. Create Footer component
  - Implement Footer.vue with links and copyright
  - Add social links or documentation links
  - Use consistent styling with rest of page
  - _Requirements: 5.5, 9.4_

- [x] 14. Create main App.vue and HomeView
  - [x] 14.1 Implement App.vue with router-view and theme initialization
    - Initialize theme store on mount
    - Add router-view for page content
    - Apply theme classes to root element
    - _Requirements: 1.1, 7.3_

  - [x] 14.2 Implement HomeView.vue composing all sections
    - Include NavBar component
    - Include HeroSection component
    - Include FeaturesSection component
    - Include Footer component
    - Add section IDs for hash navigation
    - _Requirements: 5.6, 8.2, 8.4_

  - [ ]* 14.3 Write property test for reactive theme state propagation
    - **Property 14: Reactive theme state propagation**
    - **Validates: Requirements 7.3**

  - [ ]* 14.4 Write property test for URL hash synchronization
    - **Property 16: URL hash synchronization**
    - **Validates: Requirements 8.4**

- [x] 15. Implement accessibility features
  - [x] 15.1 Add ARIA labels to all interactive elements
    - Add aria-label to theme toggle
    - Add aria-label to navigation links
    - Add aria-label to CTA buttons
    - _Requirements: 6.3_

  - [x] 15.2 Implement visible focus states
    - Add focus-visible styles to all focusable elements
    - Use ring utilities for focus indication
    - _Requirements: 6.4_

  - [x] 15.3 Add prefers-reduced-motion support
    - Wrap animations in @media (prefers-reduced-motion: reduce) queries
    - Disable or reduce transitions when user prefers reduced motion
    - _Requirements: 6.1_

  - [ ]* 15.4 Write property test for color contrast compliance
    - **Property 12: Color contrast compliance**
    - **Validates: Requirements 6.2**

- [x] 16. Polish and optimization
  - [x] 16.1 Add smooth scroll behavior globally
    - Configure CSS scroll-behavior: smooth
    - Ensure router scrollBehavior accounts for fixed navbar height
    - _Requirements: 5.6, 8.3_

  - [x] 16.2 Verify responsive design at all breakpoints
    - Test at 320px, 768px, 1024px, 1440px
    - Ensure no horizontal scroll
    - Verify proper stacking on mobile
    - _Requirements: 5.7, 6.6_

  - [ ]* 16.3 Write property test for container width consistency
    - **Property 10: Container width consistency**
    - **Validates: Requirements 5.5**

  - [ ]* 16.4 Write property test for TypeScript interface coverage
    - **Property 18: TypeScript interface coverage**
    - **Validates: Requirements 10.2**

- [ ] 17. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties with 100+ iterations
- Unit tests validate specific examples and edge cases
- Components should be built incrementally and tested before moving to the next
- Theme system is foundational and should be completed early
- Focus on core functionality first, then add polish and accessibility features
