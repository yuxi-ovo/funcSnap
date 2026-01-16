<template>
  <div class="animated-background-container">
    <!-- Gradient Mesh Background -->
    <div class="gradient-mesh">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
    
    <!-- Grid Pattern Overlay -->
    <div class="grid-pattern"></div>
    
    <!-- Floating Particles -->
    <div class="particles">
      <div v-for="i in 20" :key="i" class="particle" :style="getParticleStyle(i)"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * AnimatedBackground Component
 * 
 * Creates a tech-inspired animated background with:
 * - Flowing gradient mesh (Aurora effect)
 * - Grid pattern overlay
 * - Floating particles
 */

const getParticleStyle = (index: number) => {
  const size = Math.random() * 4 + 2;
  const left = Math.random() * 100;
  const animationDuration = Math.random() * 20 + 10;
  const animationDelay = Math.random() * 5;
  
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${left}%`,
    animationDuration: `${animationDuration}s`,
    animationDelay: `${animationDelay}s`
  };
};
</script>

<style scoped>
.animated-background-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

/* Gradient Mesh Background */
.gradient-mesh {
  position: absolute;
  inset: 0;
  opacity: 0.6;
  filter: blur(80px);
}

.gradient-orb {
  position: absolute;
  border-radius: 50%;
  mix-blend-mode: screen;
  animation: float 20s ease-in-out infinite;
}

.orb-1 {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%);
  top: -10%;
  left: -10%;
  animation-duration: 25s;
}

.orb-2 {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
  top: 40%;
  right: -10%;
  animation-duration: 30s;
  animation-delay: -5s;
}

.orb-3 {
  width: 450px;
  height: 450px;
  background: radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%);
  bottom: -10%;
  left: 30%;
  animation-duration: 35s;
  animation-delay: -10s;
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

/* Grid Pattern */
.grid-pattern {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 50% at 50% 50%, black 40%, transparent 100%);
}

/* Dark mode adjustments - use darker grid lines */
:global(.dark) .grid-pattern {
  background-image: 
    linear-gradient(rgba(71, 85, 105, 0.3) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71, 85, 105, 0.3) 1px, transparent 1px);
}

/* Floating Particles */
.particles {
  position: absolute;
  inset: 0;
}

.particle {
  position: absolute;
  background: rgba(59, 130, 246, 0.6);
  border-radius: 50%;
  animation: rise linear infinite;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
}

@keyframes rise {
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(1);
    opacity: 0;
  }
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  .gradient-orb,
  .particle {
    animation: none !important;
  }
  
  .gradient-mesh {
    filter: blur(60px);
  }
}
</style>
