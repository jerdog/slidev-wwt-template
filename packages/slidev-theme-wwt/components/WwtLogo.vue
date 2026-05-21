<script setup lang="ts">
import { computed } from "vue";

type Variant = "color" | "white" | "black" | "monogram-color" | "monogram-white";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    height?: number;
    width?: number;
  }>(),
  { variant: "color", height: 60 },
);

// Intrinsic aspect ratios (width / height) measured from the PNG dimensions
// in packages/slidev-theme-wwt/public/. Update if assets are replaced.
// wwt-logo.png:         6251 × 1305  → 4.79
// wwt-logo-white.png:   6251 × 1306  → 4.79
// wwt-logo-black.png:   6251 × 1305  → 4.79
// wwt-monogram.png:     3543 × 1790  → 1.98
// wwt-monogram-white.png: 2362 × 1193 → 1.98
const RATIOS: Record<Variant, number> = {
  color: 4.79,
  white: 4.79,
  black: 4.79,
  "monogram-color": 1.98,
  "monogram-white": 1.98,
};

const SRC: Record<Variant, string> = {
  color: "/wwt-logo.png",
  white: "/wwt-logo-white.png",
  black: "/wwt-logo-black.png",
  "monogram-color": "/wwt-monogram.png",
  "monogram-white": "/wwt-monogram-white.png",
};

const resolvedWidth = computed(() =>
  props.width ?? Math.round(props.height * RATIOS[props.variant]),
);
</script>

<template>
  <img
    :src="SRC[variant]"
    :width="resolvedWidth"
    :height="height"
    alt="World Wide Technology"
    class="wwt-logo"
  />
</template>

<style scoped>
.wwt-logo {
  display: block;
}
</style>
