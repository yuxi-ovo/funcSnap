<template>
  <article 
    :class="[
      'feature-card',
      'rounded-xl overflow-hidden',
      'border transition-all duration-300 cursor-pointer',
      'bg-white dark:bg-slate-800/50',
      'border-slate-200 dark:border-slate-600',
      'hover:shadow-2xl hover:scale-[1.02]',
      'hover:border-slate-300 dark:hover:border-slate-500',
      gridClass
    ]"
    :aria-label="`Feature: ${title}`"
    role="article"
  >
    <div class="p-6">
      <!-- Icon and Text Content -->
      <div class="flex flex-col gap-4">
        <!-- Icon -->
        <div 
          class="w-12 h-12 rounded-lg flex items-center justify-center bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 transition-colors duration-300"
          aria-hidden="true"
        >
          <component :is="icon" class="w-6 h-6" />
        </div>
        
        <!-- Title and Description -->
        <div>
          <h3 
            class="text-xl font-bold mb-2 font-heading text-slate-900 dark:text-slate-100 transition-colors duration-300"
          >
            {{ title }}
          </h3>
          <p 
            class="text-base font-body text-slate-600 dark:text-slate-400 transition-colors duration-300"
          >
            {{ description }}
          </p>
        </div>
      </div>
      
      <!-- Code Preview (if provided) -->
      <div v-if="preview" class="mt-6">
        <CodePreview
          :code="preview.code"
          :language="preview.language"
          :filename="preview.filename"
          :startLine="preview.startLine"
          :animated="preview.animated"
        />
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { FeatureCardProps } from '@/types';
import CodePreview from './CodePreview.vue';

/**
 * FeatureCard Component
 * 
 * Displays individual feature cards with icon, title, description, and optional code preview
 * 
 * Requirements:
 * - 3.4: Include visual icons for each feature using SVG
 * - 3.7: Hover over feature card elevates with shadow and scale
 * - 9.6: Include subtle hover transitions (duration-200 or duration-300)
 * - 9.7: Use cursor-pointer on all interactive elements
 */

withDefaults(defineProps<FeatureCardProps>(), {
  gridClass: ''
});
</script>

<style scoped>
.feature-card {
  /* Ensure smooth transitions respect prefers-reduced-motion */
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    transform: none !important;
  }
}

/* Additional hover effect refinement */
.feature-card:hover {
  /* Subtle lift effect */
  transform: translateY(-2px) scale(1.02);
}

@media (prefers-reduced-motion: reduce) {
  .feature-card:hover {
    transform: none;
  }
}
</style>
