<template>
  <section 
    class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 bg-white dark:bg-slate-900 transition-colors duration-300"
    aria-labelledby="hero-heading"
  >
    <div class="max-w-7xl mx-auto w-full">
      <!-- Vertical layout: Text on top, comparison below -->
      <div class="space-y-12 lg:space-y-16">
        
        <!-- Top: Text Content (Centered) -->
        <div class="text-center space-y-6 max-w-4xl mx-auto">
          <!-- Headline with Space Grotesk font -->
          <h1 
            id="hero-heading"
            class="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight
                     text-slate-900 dark:text-slate-50
                     transition-colors duration-300"
          >
            {{ t('hero.title') }}
            <span class="block text-blue-600 dark:text-blue-500 mt-2">
              {{ t('hero.titleHighlight') }}
            </span>
          </h1>
          
          <!-- Subheadline with DM Sans font -->
          <p class="font-body text-lg sm:text-xl text-slate-600 dark:text-slate-400
                    leading-relaxed transition-colors duration-300 max-w-3xl mx-auto">
            {{ t('hero.subtitle') }}
          </p>
          
          <!-- Prominent CTA buttons with hover effects -->
          <div class="flex flex-wrap gap-4 pt-4 justify-center">
            <button 
              class="bg-blue-600 hover:bg-blue-700 text-white font-semibold
                     px-8 py-4 rounded-lg shadow-lg hover:shadow-xl
                     transition-all duration-300 transform hover:scale-105
                     cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500/50
                     focus-visible:outline-none focus-visible:ring-2 
                     focus-visible:ring-blue-500 focus-visible:ring-offset-2
                     dark:focus-visible:ring-offset-slate-900"
              @click="handleInstallClick"
              :aria-label="t('hero.installAriaLabel')"
              type="button"
            >
              {{ t('hero.installButton') }}
            </button>
            
            <button 
              class="bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700
                     text-slate-900 dark:text-slate-100 font-semibold
                     px-8 py-4 rounded-lg shadow-md hover:shadow-lg
                     transition-all duration-300 cursor-pointer
                     focus:outline-none focus:ring-4 focus:ring-slate-500/50
                     focus-visible:outline-none focus-visible:ring-2 
                     focus-visible:ring-slate-500 focus-visible:ring-offset-2
                     dark:focus-visible:ring-offset-slate-900"
              @click="handleLearnMoreClick"
              :aria-label="t('hero.learnMoreAriaLabel')"
              type="button"
            >
              {{ t('hero.learnMoreButton') }}
            </button>
          </div>
        </div>
        
        <!-- Bottom: Before-After Comparison (Code left, Screenshot right) -->
        <div class="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <!-- Left: Code Preview -->
          <div class="space-y-3 flex flex-col">
            <div class="flex items-center gap-2 px-1">
              <div class="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600"></div>
              <span class="font-body text-sm font-medium text-slate-700 dark:text-slate-300">
                {{ t('hero.beforeLabel') }}
              </span>
            </div>
            <div class="flex-1">
              <CodePreview
                :code="exampleCode"
                language="typescript"
                filename="example.ts"
                :start-line="1"
                :animated="false"
              />
            </div>
          </div>
          
          <!-- Right: Generated Screenshot -->
          <div class="space-y-3 flex flex-col">
            <div class="flex items-center gap-2 px-1">
              <div class="w-2 h-2 rounded-full bg-blue-500"></div>
              <span class="font-body text-sm font-medium text-slate-700 dark:text-slate-300">
                {{ t('hero.afterLabel') }}
              </span>
            </div>
            <div class="flex-1 flex flex-col">
              <div class="rounded-lg overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 transition-colors duration-300 h-full flex items-center">
                <img 
                  src="../../assets/images/image.png" 
                  :alt="t('hero.screenshotAlt')"
                  class="w-full h-full object-contain"
                />
              </div>
              <p class="font-body text-sm text-slate-600 dark:text-slate-400 text-center px-4 mt-3">
                {{ t('hero.screenshotCaption') }}
              </p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import CodePreview from '@/components/ui/CodePreview.vue';
import type { HeroSectionProps } from '@/types';

/**
 * HeroSection Component
 * 
 * Primary above-the-fold section with value proposition
 * 
 * Requirements:
 * - 2.1: Display clear headline describing plugin's primary value proposition
 * - 2.2: Include subheadline explaining key benefits
 * - 2.3: Feature prominent call-to-action button for installation
 * - 2.4: Display animated code preview demonstrating plugin in action
 * - 2.5: Provide visual feedback on CTA button hover with color transition
 * - 2.6: Use Space Grotesk font for headings and DM Sans for body text
 * - 2.7: Be responsive and stack vertically on mobile devices (< 768px)
 */

// Define props (none needed for this component)
defineProps<HeroSectionProps>();

// Initialize i18n
const { t } = useI18n();

// Example code to display in the preview
const exampleCode = ref(`type Task = {
	id: string;
	priority: number;
	createdAt: number;
};

export class TaskScheduler {
	private queue: Task[] = [];

	add(task: Task) {
		this.queue.push(task);
        this.queue.sort(
            (a, b) =>
                b.priority - a.priority ||
                a.createdAt - b.createdAt
            )
	}

	next(): Task | null {
		return this.queue.shift() ?? null;
	}

	get size() {
		return this.queue.length;
	}
}

// demo
const scheduler = new TaskScheduler();

scheduler.add({ id: "A", priority: 2, createdAt: 3 });
scheduler.add({ id: "B", priority: 3, createdAt: 1 });
scheduler.add({ id: "C", priority: 3, createdAt: 2 });

scheduler.next();`);

/**
 * Handle install button click
 */
const handleInstallClick = () => {
  // In a real implementation, this would link to VS Code marketplace
  window.open('https://marketplace.visualstudio.com/', '_blank');
};

/**
 * Handle learn more button click
 */
const handleLearnMoreClick = () => {
  // Scroll to features section
  const featuresSection = document.getElementById('features');
  if (featuresSection) {
    featuresSection.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style scoped>
/* Additional responsive adjustments if needed */
@media (max-width: 768px) {
  .order-first {
    margin-bottom: 2rem;
  }
}

/* Ensure smooth transitions respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  button {
    transition-duration: 0.01ms !important;
    transform: none !important;
  }
}
</style>
