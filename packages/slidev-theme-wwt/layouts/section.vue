<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-section slidev-layout">
    <GraphicDevice variant="dark" />
    <div class="wwt-section__body">
      <SectionNumber v-if="$frontmatter?.number" :n="$frontmatter.number" />
      <h1 class="wwt-section__title">
        {{ $frontmatter?.title ?? "Section title" }}
      </h1>
    </div>
  </div>
</template>

<style scoped>
.wwt-section {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-accent7-base);
  color: var(--wwt-ink-white);
  padding: 5rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.wwt-section__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-4);
  max-width: 75%;
}

.wwt-section__title {
  font-size: var(--wwt-text-section);
  font-weight: 300;
  color: var(--wwt-ink-white);
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0;
}
</style>
