<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
const isDark = computed(() => Boolean($frontmatter?.dark));
</script>

<template>
  <div :class="['wwt-quote slidev-layout', { 'wwt-quote--dark': isDark }]">
    <GraphicDevice v-if="isDark" variant="dark" />
    <GradientRule v-else />
    <div
      v-if="!isDark"
      class="wwt-monogram-mark wwt-quote__monogram"
      role="img"
      aria-label="WWT"
    />
    <blockquote class="wwt-quote__body">
      <p class="wwt-quote__text">
        <slot />
      </p>
      <footer class="wwt-quote__cite">
        <span class="wwt-quote__attribution">{{ $frontmatter?.attribution }}</span>
        <span v-if="$frontmatter?.role" class="wwt-quote__role">{{ $frontmatter.role }}</span>
      </footer>
    </blockquote>
    <Footer v-if="!isDark" />
  </div>
</template>

<style scoped>
.wwt-quote {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 5rem;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.wwt-quote--dark {
  background: var(--wwt-accent7-base);
  color: var(--wwt-ink-white);
}

.wwt-quote__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-quote__body {
  position: relative;
  z-index: 1;
  margin: 0;
  max-width: 75%;
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-6);
}

.wwt-quote__text {
  font-size: var(--wwt-text-quote);
  font-weight: 300;
  line-height: 1.3;
  color: inherit;
  margin: 0;
}

.wwt-quote__text::before {
  content: "\201C";
  color: var(--wwt-primary-base);
  font-size: 1.5em;
  line-height: 0;
  margin-right: 0.1em;
  vertical-align: -0.2em;
}

.wwt-quote__cite {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-1);
}

.wwt-quote__attribution {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
}

.wwt-quote__role {
  font-size: var(--wwt-text-caption);
  opacity: 0.7;
}
</style>
