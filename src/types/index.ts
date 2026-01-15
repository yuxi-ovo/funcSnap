import type { Component } from 'vue';

/**
 * Theme type - represents the two available theme modes
 */
export type Theme = 'dark' | 'light';

/**
 * Theme state interface for the Pinia store
 */
export interface ThemeState {
  isDark: boolean;
  systemPreference: boolean;
}

/**
 * Feature interface for the features section
 */
export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: Component;
  gridClass: string;
  preview?: CodePreviewConfig;
}

/**
 * Code preview configuration interface
 */
export interface CodePreviewConfig {
  code: string;
  language: string;
  filename: string;
  startLine: number;
  animated: boolean;
}

/**
 * Navigation link interface
 */
export interface NavigationLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Component prop types
 */

// ThemeToggle component props (no props needed)
export interface ThemeToggleProps {}

// CodePreview component props
export interface CodePreviewProps {
  code?: string;
  language?: string;
  filename?: string;
  startLine?: number;
  animated?: boolean;
  theme?: Theme;
}

// FeatureCard component props
export interface FeatureCardProps {
  title: string;
  description: string;
  icon: Component;
  gridClass?: string;
  preview?: CodePreviewConfig;
}

// NavBar component props (no props needed)
export interface NavBarProps {}

// HeroSection component props (no props needed)
export interface HeroSectionProps {}

// FeaturesSection component props (no props needed)
export interface FeaturesSectionProps {}

// Footer component props (no props needed)
export interface FooterProps {}
