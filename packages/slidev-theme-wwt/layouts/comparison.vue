<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type Side = { title: string; points: string[] };
const left = ($frontmatter?.left ?? { title: "", points: [] }) as Side;
const right = ($frontmatter?.right ?? { title: "", points: [] }) as Side;
</script>

<template>
  <div class="wwt-comparison slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-comparison__monogram" role="img" aria-label="WWT" />
    <h1 v-if="$frontmatter?.title">{{ $frontmatter.title }}</h1>
    <div class="wwt-comparison__grid">
      <section class="wwt-comparison__card">
        <header class="wwt-comparison__header">{{ left.title }}</header>
        <ul>
          <li v-for="p in left.points" :key="p">{{ p }}</li>
        </ul>
      </section>
      <section class="wwt-comparison__card">
        <header class="wwt-comparison__header">{{ right.title }}</header>
        <ul>
          <li v-for="p in right.points" :key="p">{{ p }}</li>
        </ul>
      </section>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-comparison {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-comparison__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-comparison__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--wwt-space-8);
  margin-top: var(--wwt-space-6);
}

.wwt-comparison__card {
  border: 1px solid var(--wwt-primary-lightest);
  border-radius: 12px;
  overflow: hidden;
}

.wwt-comparison__header {
  background: var(--wwt-primary-base);
  color: var(--wwt-ink-white);
  padding: var(--wwt-space-3) var(--wwt-space-4);
  font-weight: 600;
}

.wwt-comparison__card ul {
  padding: var(--wwt-space-4) var(--wwt-space-6);
  margin: 0;
}
</style>
