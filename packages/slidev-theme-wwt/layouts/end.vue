<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-end slidev-layout">
    <GraphicDevice variant="dark" />
    <div class="wwt-end__body">
      <p class="wwt-end__signoff">
        {{ $frontmatter?.signoff ?? "Make a new world happen" }}
      </p>
      <WwtLogo variant="white" :height="80" />
      <p class="wwt-end__site">wwt.com</p>
    </div>
  </div>
</template>

<style scoped>
.wwt-end {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-accent7-base);
  color: var(--wwt-ink-white);
  padding: 5rem;
  display: grid;
  place-items: center;
  overflow: hidden;
}

.wwt-end__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--wwt-space-8);
  text-align: center;
}

.wwt-end__signoff {
  font-size: 56px;
  font-weight: 300;
  color: var(--wwt-ink-white);
  letter-spacing: -0.01em;
  margin: 0;
}

.wwt-end__site {
  font-size: var(--wwt-text-body);
  color: var(--wwt-primary-light);
  margin: 0;
}

/* center alignment exception: end slide is centered for brand sign-off */
.wwt-end,
.wwt-end * {
  text-align: center;
}
</style>
