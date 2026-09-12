<script setup lang="ts">
import birriaImage from '../assets/birria.png'
import koreanImage from '../assets/koreanBBC.png'

withDefaults(defineProps<{
  variant: 'birria' | 'korean'
  alt: string
  priority?: boolean
}>(), { priority: false })

const photos = {
  birria: { src: birriaImage, width: 523, height: 335 },
  korean: { src: koreanImage, width: 467, height: 313 },
} as const
</script>

<template>
  <div class="food-photo" :class="`food-photo-${variant}`">
    <img
      :src="photos[variant].src"
      :alt="alt"
      :width="photos[variant].width"
      :height="photos[variant].height"
      :loading="priority ? 'eager' : 'lazy'"
      :fetchpriority="priority ? 'high' : 'auto'"
      decoding="async"
    >
  </div>
</template>

<style scoped>
.food-photo {
  width: 100%;
  aspect-ratio: 520 / 345;
}

.food-photo img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 16px 14px rgb(11 28 53 / 22%));
}
</style>
