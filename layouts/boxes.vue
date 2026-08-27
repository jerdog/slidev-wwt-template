<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type BoxItem = { title: string; detail?: string };
const boxes = computed<BoxItem[]>(() => ($frontmatter?.boxes ?? []) as BoxItem[]);
const reveal = computed<boolean>(() => Boolean($frontmatter?.reveal));
</script>

<template>
  <div class="wwt-boxes slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-boxes__monogram" role="img" aria-label="WWT" />
    <h1 v-if="$frontmatter?.title">
      {{ $frontmatter.title }}
    </h1>
    <div v-if="reveal" v-auto-animate class="wwt-boxes__grid" :data-count="boxes.length">
      <v-clicks>
        <BoxCard v-for="(b, i) in boxes" :key="i" :title="b.title" :detail="b.detail" />
      </v-clicks>
    </div>
    <div v-else class="wwt-boxes__grid" :data-count="boxes.length">
      <BoxCard v-for="(b, i) in boxes" :key="i" :title="b.title" :detail="b.detail" />
    </div>
    <div v-if="$slots.default" class="wwt-boxes__footer">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-boxes {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-boxes__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-boxes__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--wwt-space-6);
  margin-top: var(--wwt-space-6);
}

/* One box: don't stretch it across three phantom columns. */
.wwt-boxes__grid[data-count="1"] {
  grid-template-columns: 1fr;
}

.wwt-boxes__grid[data-count="2"] {
  grid-template-columns: repeat(2, 1fr);
}

/* Four boxes: 2x2 gives each card more height than a 4-across row. */
.wwt-boxes__grid[data-count="4"] {
  grid-template-columns: repeat(2, 1fr);
}

/* 3, 5, and 6 boxes need no override — the base 3-column track already
   wraps them into 3x1, 3+2, and 3x2 via CSS grid's own auto-placement. */

.wwt-boxes__footer {
  margin-top: var(--wwt-space-6);
  color: var(--wwt-ink-muted);
  font-size: var(--wwt-text-caption);
}
</style>
