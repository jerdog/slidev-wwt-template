<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
const items = ($frontmatter?.items ?? []) as string[];
</script>

<template>
  <div class="wwt-agenda slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-agenda__monogram" role="img" aria-label="WWT" />
    <div class="wwt-agenda__body">
      <h1>Agenda</h1>
      <ol class="wwt-agenda__list">
        <li v-for="(item, index) in items" :key="index" class="wwt-agenda__item">
          <span class="wwt-agenda__number">{{ String(index + 1).padStart(2, "0") }}</span>
          <span class="wwt-agenda__label">{{ item }}</span>
        </li>
      </ol>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-agenda {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-agenda__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-agenda__list {
  list-style: none;
  padding: 0;
  margin: var(--wwt-space-8) 0 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--wwt-space-6) var(--wwt-space-12);
}

.wwt-agenda__item {
  display: flex;
  align-items: baseline;
  gap: var(--wwt-space-4);
}

.wwt-agenda__number {
  font-size: var(--wwt-text-h1);
  font-weight: 300;
  color: var(--wwt-primary-base);
  min-width: 4ch;
}

.wwt-agenda__label {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
  color: var(--wwt-ink-base);
}
</style>
