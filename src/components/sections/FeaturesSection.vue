<template>
  <section 
    id="features" 
    class="relative py-24 px-4 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden"
    aria-labelledby="features-heading"
  >
    <!-- Subtle background pattern -->
    <div class="absolute inset-0 opacity-30 dark:opacity-20">
      <div class="absolute inset-0 dot-pattern"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto">
      <!-- Section Header with animation -->
      <div 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
        class="text-center mb-16"
      >
        <h2 
          id="features-heading"
          class="text-4xl lg:text-5xl font-bold font-heading mb-4 text-slate-900 dark:text-slate-100 transition-colors duration-300"
        >
          {{ t('features.title') }}
        </h2>
        <p 
          class="text-xl font-body max-w-2xl mx-auto text-slate-600 dark:text-slate-400 transition-colors duration-300"
        >
          {{ t('features.subtitle') }}
        </p>
      </div>

      <!-- Bento Grid Layout with stagger animation -->
      <div 
        class="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        role="list"
        :aria-label="t('features.listAriaLabel')"
      >
        <div
          v-for="(feature, index) in features"
          :key="feature.id"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 500, delay: index * 100 } }"
          :class="feature.gridClass"
        >
          <FeatureCard
            :title="feature.title"
            :description="feature.description"
            :icon="feature.icon"
            :gridClass="feature.gridClass"
            :preview="feature.preview"
            role="listitem"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { CameraIcon, DocumentDuplicateIcon, ClipboardIcon, Cog6ToothIcon, CommandLineIcon } from '@heroicons/vue/24/outline';
import FeatureCard from '@/components/ui/FeatureCard.vue';
import type { Feature } from '@/types';

/**
 * FeaturesSection Component
 * 
 * Displays plugin features in a bento grid layout
 * 
 * Requirements:
 * - 3.1: Display at least three core features (function screenshot, selection screenshot, copy function)
 * - 3.2: Use bento grid layout on desktop (≥ 1024px)
 * - 3.3: Stack features vertically on mobile
 * - 3.4: Include visual icons for each feature using SVG (not emojis)
 * - 3.5: Show example screenshots with line numbers and file names
 * - 3.6: Mention future customization capabilities
 */

const { t } = useI18n();

const features = computed<Feature[]>(() => [
  {
    id: 'function-screenshot',
    title: t('features.captureFunction.title'),
    description: t('features.captureFunction.description'),
    icon: CameraIcon,
    gridClass: 'lg:col-span-2',
    preview: {
      code: `function calculateTotal(items: Item[]): number {
  return items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
}`,
      language: 'typescript',
      filename: 'utils.ts',
      startLine: 15,
      animated: false
    }
  },
  {
    id: 'selection-screenshot',
    title: t('features.selectionScreenshot.title'),
    description: t('features.selectionScreenshot.description'),
    icon: DocumentDuplicateIcon,
    gridClass: '',
    preview: {
      code: `const user = await db.users.findOne({
  email: userEmail
});`,
      language: 'typescript',
      filename: 'auth.ts',
      startLine: 42,
      animated: false
    }
  },
  {
    id: 'copy-function',
    title: t('features.copyFunction.title'),
    description: t('features.copyFunction.description'),
    icon: ClipboardIcon,
    gridClass: '',
    preview: undefined
  },
  {
    id: 'customizable-settings',
    title: t('features.customizableSettings.title'),
    description: t('features.customizableSettings.description'),
    icon: Cog6ToothIcon,
    gridClass: '',
    preview: undefined
  },
  {
    id: 'vscode-integration',
    title: t('features.vscodeIntegration.title'),
    description: t('features.vscodeIntegration.description'),
    icon: CommandLineIcon,
    gridClass: '',
    preview: undefined
  }
]);
</script>

<style scoped>
/* Dot pattern background */
.dot-pattern {
  background-image: radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.15) 1px, transparent 0);
  background-size: 40px 40px;
}

/* Dark mode dot pattern - use darker dots on dark background */
:global(.dark) .dot-pattern {
  background-image: radial-gradient(circle at 1px 1px, rgb(71 85 105 / 0.4) 1px, transparent 0);
}

/* Ensure grid respects responsive breakpoints */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
