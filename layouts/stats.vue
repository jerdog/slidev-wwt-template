<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type StatItem = { value: string; label: string; caption?: string };
const stats = computed<StatItem[]>(() => ($frontmatter?.stats ?? []) as StatItem[]);
</script>

<template>
  <div class="wwt-stats slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-stats__monogram" role="img" aria-label="WWT" />
    <h1 v-if="$frontmatter?.title">
      {{ $frontmatter.title }}
    </h1>
    <div v-auto-animate class="wwt-stats__grid" :data-count="stats.length">
      <v-clicks>
        <Stat
          v-for="(s, i) in stats"
          :key="i"
          :value="s.value"
          :label="s.label"
          :caption="s.caption"
        />
      </v-clicks>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-stats {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-stats__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-stats__grid {
  display: grid;
  gap: var(--wwt-space-12);
  margin-top: var(--wwt-space-8);
}

.wwt-stats__grid[data-count="1"] {
  grid-template-columns: 1fr;
}

.wwt-stats__grid[data-count="2"] {
  grid-template-columns: repeat(2, 1fr);
}

.wwt-stats__grid[data-count="3"] {
  grid-template-columns: repeat(3, 1fr);
}

.wwt-stats__grid[data-count="4"] {
  grid-template-columns: repeat(4, 1fr);
}
</style>
