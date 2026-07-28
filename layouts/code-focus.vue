<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-code slidev-layout">
    <header v-if="$frontmatter?.title" class="wwt-code__header">
      <h1>{{ $frontmatter.title }}</h1>
    </header>
    <div class="wwt-code__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.wwt-code {
  width: 100%;
  height: 100%;
  background: var(--wwt-accent7-base);
  color: var(--wwt-ink-white);
  padding: 3rem 5rem;
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-6);
}

.wwt-code__header h1 {
  color: var(--wwt-primary-light);
  font-size: var(--wwt-text-h1);
  margin: 0;
}

.wwt-code__body {
  flex: 1;
  font-size: 22px;
  line-height: 1.5;
}

.wwt-code__body :deep(pre) {
  background: rgba(0, 0, 0, 0.25);
  padding: var(--wwt-space-6);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
}
</style>
