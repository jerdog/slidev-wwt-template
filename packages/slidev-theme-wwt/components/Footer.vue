<script setup lang="ts">
import { useNav, useSlideContext } from "@slidev/client";

const { currentSlideNo, total } = useNav();
const { $frontmatter } = useSlideContext();
</script>

<template>
  <footer class="wwt-footer">
    <img src="/wwt-monogram.png" alt="WWT" width="24" height="24" class="wwt-footer__monogram" />
    <span class="wwt-footer__title">{{ $frontmatter?.title ?? "World Wide Technology" }}</span>
    <span class="wwt-footer__page">{{ currentSlideNo }} / {{ total }}</span>
  </footer>
</template>

<style scoped>
.wwt-footer {
  position: absolute;
  bottom: 1.25rem;
  left: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: var(--wwt-space-3);
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
}

.wwt-footer__monogram {
  display: block;
}

.wwt-footer__title {
  flex: 1;
}

.wwt-footer__page {
  font-variant-numeric: tabular-nums;
}
</style>
