<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type Event = { date: string; label: string; detail?: string };
const events = ($frontmatter?.events ?? []) as Event[];
</script>

<template>
  <div class="wwt-timeline slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-timeline__monogram" role="img" aria-label="WWT" />
    <h1 v-if="$frontmatter?.title">{{ $frontmatter.title }}</h1>
    <ol class="wwt-timeline__line" v-auto-animate>
      <v-clicks>
        <li v-for="(e, i) in events" :key="i" class="wwt-timeline__event">
          <div class="wwt-timeline__dot" />
          <div class="wwt-timeline__date">{{ e.date }}</div>
          <div class="wwt-timeline__label">{{ e.label }}</div>
          <p v-if="e.detail" class="wwt-timeline__detail">{{ e.detail }}</p>
        </li>
      </v-clicks>
    </ol>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-timeline {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-timeline__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-timeline__line {
  list-style: none;
  padding: 0;
  margin: var(--wwt-space-12) 0 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: var(--wwt-space-6);
  position: relative;
}

.wwt-timeline__line::before {
  content: "";
  position: absolute;
  top: 8px;
  left: 0;
  right: 0;
  height: 4px;
  background-image: url("/wwt-gradient-rule.png");
  background-size: 100% 100%;
}

.wwt-timeline__event {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-2);
  padding-top: var(--wwt-space-6);
  position: relative;
}

.wwt-timeline__dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--wwt-primary-base);
  border: 3px solid var(--wwt-bg-base);
}

.wwt-timeline__date {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-primary-base);
  font-weight: 600;
}

.wwt-timeline__label {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
}

.wwt-timeline__detail {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
  margin: 0;
}
</style>
