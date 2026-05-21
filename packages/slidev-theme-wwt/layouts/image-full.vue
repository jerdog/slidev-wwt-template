<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-image-full slidev-layout">
    <div
      class="wwt-image-full__bg"
      :style="{ backgroundImage: `url(${$frontmatter?.image ?? ''})` }"
      role="img"
      :aria-label="$frontmatter?.imageAlt ?? ''"
    />
    <div class="wwt-image-full__scrim" />
    <h1 v-if="$frontmatter?.headline" class="wwt-image-full__headline">
      {{ $frontmatter.headline }}
    </h1>
  </div>
</template>

<style scoped>
.wwt-image-full {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wwt-image-full__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.wwt-image-full__scrim {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(29, 30, 72, 0.85) 0%,
    rgba(22, 47, 180, 0.6) 100%
  );
}

.wwt-image-full__headline {
  position: relative;
  z-index: 1;
  color: var(--wwt-ink-white);
  font-size: var(--wwt-text-cover);
  font-weight: 300;
  line-height: 1.0;
  max-width: 70%;
  padding: 5rem;
  margin: 0;
}
</style>
