<template>
	<section class="hero-section relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 pb-12 overflow-hidden" aria-labelledby="hero-heading">
		<!-- Animated Background -->
		<AnimatedBackground />

		<!-- Content Container -->
		<div class="relative z-10 max-w-7xl mx-auto w-full mt-20">
			<!-- Vertical layout: Text on top, comparison below -->
			<div class="space-y-12 lg:space-y-16">
				<!-- Top: Text Content (Centered) with animations -->
				<div class="text-center space-y-6 max-w-4xl mx-auto">
					<!-- Badge with glow effect -->
					<div v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 600 } }">
						<div
							class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-500/20 dark:border-blue-500/30 backdrop-blur-sm shadow-lg shadow-blue-500/10"
						>
							<div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
							<span class="text-sm font-medium text-blue-600 dark:text-blue-400">
								{{ t("hero.badge") }}
							</span>
						</div>
					</div>

					<!-- Headline with Space Grotesk font and stagger animation -->
					<h1
						v-motion
						:initial="{ opacity: 0, y: 20 }"
						:enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
						id="hero-heading"
						class="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-slate-900 dark:text-slate-50 transition-colors duration-300"
					>
						{{ t("hero.title") }}
						<span
							class="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400 mt-2 animate-gradient"
						>
							{{ t("hero.titleHighlight") }}
						</span>
					</h1>

					<!-- Subheadline with DM Sans font -->
					<p
						v-motion
						:initial="{ opacity: 0, y: 20 }"
						:enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
						class="font-body text-lg sm:text-xl text-slate-600 dark:text-slate-400 leading-relaxed transition-colors duration-300 max-w-3xl mx-auto"
					>
						{{ t("hero.subtitle") }}
					</p>

					<!-- Prominent CTA buttons with hover effects -->
					<div v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 600 } }" class="flex flex-wrap gap-4 pt-4 justify-center">
						<button
							class="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
							@click="handleInstallClick"
							:aria-label="t('hero.installAriaLabel')"
							type="button"
						>
							<!-- Shine effect -->
							<span
								class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"
							></span>
							<span class="relative flex items-center gap-2">
								<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
								</svg>
								{{ t("hero.installButton") }}
							</span>
						</button>

						<button
							class="group relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg border border-slate-200 dark:border-slate-700 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900"
							@click="handleLearnMoreClick"
							:aria-label="t('hero.learnMoreAriaLabel')"
							type="button"
						>
							<span class="relative flex items-center gap-2">
								{{ t("hero.learnMoreButton") }}
								<svg class="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
								</svg>
							</span>
						</button>
					</div>
				</div>

				<!-- Bottom: Before-After Comparison with stagger animation -->
				<div v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0, transition: { duration: 1000, delay: 800 } }" class="grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
					<!-- Left: Code Preview -->
					<div class="space-y-3 flex flex-col group">
						<div class="flex items-center gap-2 px-1">
							<div class="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600 group-hover:scale-125 transition-transform duration-300"></div>
							<span class="font-body text-sm font-medium text-slate-700 dark:text-slate-300">
								{{ t("hero.beforeLabel") }}
							</span>
						</div>
						<div class="flex-1 flex">
							<CodePreview :code="exampleCode" language="typescript" filename="index.ts" :start-line="1" :animated="false" class="w-full h-full" />
						</div>
					</div>

					<!-- Right: Generated Screenshot -->
					<div class="space-y-3 flex flex-col group">
						<div class="flex items-center gap-2 px-1">
							<div class="w-2 h-2 rounded-full bg-blue-500 animate-pulse group-hover:scale-125 transition-transform duration-300"></div>
							<span class="font-body text-sm font-medium text-slate-700 dark:text-slate-300">
								{{ t("hero.afterLabel") }}
							</span>
						</div>
						<div class="flex-1 flex flex-col">
							<div
								class="relative rounded-lg overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 transition-all duration-500 h-full flex items-center hover:scale-[1.02] hover:shadow-blue-500/20 hover:shadow-2xl group-hover:border-blue-500/50"
							>
								<!-- Glow effect on hover -->
								<div class="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
								<img src="../../assets/images/image.png" :alt="t('hero.screenshotAlt')" class="relative w-full h-full object-contain" />
							</div>
							<!-- <p class="font-body text-sm text-slate-600 dark:text-slate-400 text-center px-4 mt-3">
                {{ t('hero.screenshotCaption') }}
              </p> -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import CodePreview from "@/components/ui/CodePreview.vue";
import AnimatedBackground from "@/components/ui/AnimatedBackground.vue";
import type { HeroSectionProps } from "@/types";

/**
 * HeroSection Component
 *
 * Enhanced primary hero section with:
 * - Animated gradient background
 * - VueUse Motion animations
 * - Interactive hover effects
 * - Tech-inspired visual design
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
	window.open("https://marketplace.visualstudio.com/items?itemName=yuxi-ovo.funcsnap", "_blank");
};

/**
 * Handle learn more button click
 */
const handleLearnMoreClick = () => {
	// Scroll to features section
	const featuresSection = document.getElementById("features");
	if (featuresSection) {
		featuresSection.scrollIntoView({ behavior: "smooth" });
	}
};
</script>

<style>
/* Hero Section Styles - unscoped to access parent .dark class */
.hero-section {
	background: linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(248, 250, 252, 1) 100%);
}

.dark .hero-section {
	background: linear-gradient(to bottom, rgba(15, 23, 42, 1) 0%, rgba(2, 6, 23, 1) 100%);
}
</style>

<style scoped>
/* Animated Gradient Text */
@keyframes gradient {
	0%,
	100% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
}

.animate-gradient {
	background-size: 200% 200%;
	animation: gradient 3s ease infinite;
}

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

	.animate-gradient {
		animation: none !important;
	}
}
</style>
