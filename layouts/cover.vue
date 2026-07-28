<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-cover slidev-layout">
    <GraphicDevice variant="dark" />
    <WwtLogo variant="white" :height="56" class="wwt-cover__logo" />

    <div class="wwt-cover__body">
      <h1 class="wwt-cover__title">
        {{ $frontmatter?.title ?? "Title goes here" }}
      </h1>
      <p v-if="$frontmatter?.subtitle" class="wwt-cover__subtitle">
        {{ $frontmatter.subtitle }}
      </p>
      <div v-if="$frontmatter?.presenter || $frontmatter?.date" class="wwt-cover__meta">
        <span v-if="$frontmatter?.presenter">
          {{ $frontmatter.presenter }}
          <template v-if="$frontmatter?.presenterRole">
            — {{ $frontmatter.presenterRole }}</template
          >
        </span>
        <span v-if="$frontmatter?.date">{{ $frontmatter.date }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wwt-cover {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-accent7-base);
  color: var(--wwt-ink-white);
  padding: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
}

.wwt-cover__logo {
  position: absolute;
  top: 3rem;
  right: 3rem;
  z-index: 2;
}

.wwt-cover__body {
  position: relative;
  z-index: 1;
  max-width: 75%;
}

.wwt-cover__title {
  font-size: var(--wwt-text-cover);
  font-weight: 300;
  color: var(--wwt-ink-white);
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0 0 var(--wwt-space-6);
}

.wwt-cover__subtitle {
  font-size: 32px;
  font-weight: 400;
  color: var(--wwt-primary-light);
  margin: 0 0 var(--wwt-space-8);
  max-width: 60%;
}

.wwt-cover__meta {
  display: flex;
  gap: var(--wwt-space-6);
  font-size: var(--wwt-text-body);
  color: var(--wwt-ink-white);
  opacity: 0.85;
}
</style>
