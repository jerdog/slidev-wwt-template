<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type Step = { title: string; detail?: string };
const steps = ($frontmatter?.steps ?? []) as Step[];
</script>

<template>
  <div class="wwt-process slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-process__monogram" role="img" aria-label="WWT" />
    <h1 v-if="$frontmatter?.title">
      {{ $frontmatter.title }}
    </h1>
    <ol v-auto-animate class="wwt-process__steps">
      <v-clicks>
        <li v-for="(step, i) in steps" :key="i" class="wwt-process__step">
          <div class="wwt-process__number">
            {{ String(i + 1).padStart(2, "0") }}
          </div>
          <div class="wwt-process__title">
            {{ step.title }}
          </div>
          <p v-if="step.detail" class="wwt-process__detail">
            {{ step.detail }}
          </p>
        </li>
      </v-clicks>
    </ol>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-process {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-process__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-process__steps {
  list-style: none;
  padding: 0;
  margin: var(--wwt-space-8) 0 0;
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: var(--wwt-space-6);
}

.wwt-process__step {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-3);
  padding: var(--wwt-space-6);
  border-top: 4px solid var(--wwt-primary-base);
  background: var(--wwt-bg-base);
}

.wwt-process__number {
  font-size: 48px;
  font-weight: 300;
  color: var(--wwt-primary-base);
  line-height: 1;
}

.wwt-process__title {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
}

.wwt-process__detail {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
  margin: 0;
}
</style>
