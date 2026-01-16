<template>
  <article 
    :class="[
      'feature-card group relative',
      'rounded-xl overflow-hidden',
      'border transition-all duration-500 cursor-pointer',
      'bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm',
      'border-slate-200 dark:border-slate-700',
      'hover:shadow-2xl hover:shadow-blue-500/10 dark:hover:shadow-blue-500/20',
      'hover:scale-[1.02] hover:-translate-y-1',
      'hover:border-blue-300 dark:hover:border-blue-500/50',
      gridClass
    ]"
    :aria-label="`Feature: ${title}`"
    role="article"
  >
    <!-- Gradient overlay on hover -->
    <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-blue-500/0 
                opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none"></div>
    
    <!-- Shine effect -->
    <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                  transform -skew-x-12 -translate-x-full group-hover:translate-x-full 
                  transition-transform duration-1000"></div>
    </div>
    
    <div class="relative p-6">
      <!-- Icon and Text Content -->
      <div class="flex flex-col gap-4">
        <!-- Icon with glow effect -->
        <div 
          class="w-12 h-12 rounded-lg flex items-center justify-center 
                 bg-gradient-to-br from-blue-50 to-blue-100 
                 dark:from-blue-500/10 dark:to-purple-500/10 
                 text-blue-600 dark:text-blue-400 
                 transition-all duration-300
                 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/30"
          aria-hidden="true"
        >
          <component :is="icon" class="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
        </div>
        
        <!-- Title and Description -->
        <div>
          <h3 
            class="text-xl font-bold mb-2 font-heading 
                   text-slate-900 dark:text-slate-100 
                   transition-colors duration-300
                   group-hover:text-blue-600 dark:group-hover:text-blue-400"
          >
            {{ title }}
          </h3>
          <p 
            class="text-base font-body text-slate-600 dark:text-slate-400 
                   transition-colors duration-300 leading-relaxed"
          >
            {{ description }}
          </p>
        </div>
      </div>
      
      <!-- Code Preview (if provided) -->
      <div v-if="preview" class="mt-6 transform transition-transform duration-300 group-hover:scale-[1.01]">
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
    transition: none !important;
    transform: none !important;
  }
}

/* Respect reduced motion for all animations */
@media (prefers-reduced-motion: reduce) {
  .feature-card:hover {
    transform: none !important;
  }
  
  .feature-card * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
