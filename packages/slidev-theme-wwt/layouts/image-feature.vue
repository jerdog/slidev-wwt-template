<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div
    :class="[
      'wwt-image-feature slidev-layout',
      `wwt-image-feature--${$frontmatter?.side ?? 'right'}`,
    ]"
  >
    <GradientRule />
    <div class="wwt-monogram-mark wwt-image-feature__monogram" role="img" aria-label="WWT" />
    <div class="wwt-image-feature__grid">
      <div class="wwt-image-feature__copy">
        <slot />
      </div>
      <div
        class="wwt-image-feature__image"
        :style="{
          backgroundImage: `url(${String($frontmatter?.image ?? '/wwt-gradient-rule.png')})`,
        }"
        role="img"
        :aria-label="String($frontmatter?.imageAlt ?? '')"
      />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-image-feature {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-image-feature__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-image-feature__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--wwt-space-12);
  height: 100%;
  padding-top: var(--wwt-space-8);
}

.wwt-image-feature--left .wwt-image-feature__grid {
  grid-template-areas: "image copy";
}

.wwt-image-feature--right .wwt-image-feature__grid {
  grid-template-areas: "copy image";
}

.wwt-image-feature__copy {
  grid-area: copy;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--wwt-space-4);
}

.wwt-image-feature__image {
  grid-area: image;
  background-size: cover;
  background-position: center;
  border-radius: 8px;
}
</style>
