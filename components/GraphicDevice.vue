<script setup lang="ts">
type Variant = "dark" | "light";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
  }>(),
  { variant: "dark" },
);

const SRC: Record<Variant, string> = {
  dark: "/bg-cover-gradient.png",
  light: "/bg-section-gradient.jpeg",
};
</script>

<template>
  <div
    class="wwt-graphic-device"
    :style="{ backgroundImage: `url(${SRC[variant]})` }"
    role="presentation"
    aria-hidden="true"
  />
</template>

<style scoped>
.wwt-graphic-device {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}
</style>
