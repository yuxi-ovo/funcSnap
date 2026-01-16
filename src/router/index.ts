import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
	history: createWebHashHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: () => import("../views/HomeView.vue"),
		},
	],
	scrollBehavior(to, _from, savedPosition) {
		// Handle hash navigation with smooth scrolling
		if (to.hash) {
			// Validate that the hash target exists before scrolling
			const element = document.querySelector(to.hash);
			if (element) {
				return {
					el: to.hash,
					behavior: "smooth",
					top: 100, // Account for fixed navbar height
				};
			}
			// If hash target doesn't exist, scroll to top instead of throwing error
			console.warn(`Navigation target ${to.hash} not found, scrolling to top`);
			return { top: 0, behavior: "smooth" };
		}

		// Handle browser back/forward navigation
		if (savedPosition) {
			return savedPosition;
		}

		// Default: scroll to top
		return { top: 0, behavior: "smooth" };
	},
});

export default router;
