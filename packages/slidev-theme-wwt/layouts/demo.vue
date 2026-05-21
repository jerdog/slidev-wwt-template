<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-demo slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-demo__monogram" role="img" aria-label="WWT" />
    <h1 v-if="$frontmatter?.title">{{ $frontmatter.title }}</h1>
    <figure class="wwt-demo__frame">
      <img
        v-if="$frontmatter?.src && !$frontmatter?.iframe"
        :src="String($frontmatter.src)"
        :alt="String($frontmatter?.caption ?? '')"
        class="wwt-demo__media"
      />
      <iframe
        v-else-if="$frontmatter?.src && $frontmatter?.iframe"
        :src="String($frontmatter.src)"
        class="wwt-demo__media"
        :title="String($frontmatter?.caption ?? 'demo')"
      />
      <figcaption v-if="$frontmatter?.caption" class="wwt-demo__caption">
        {{ $frontmatter.caption }}
      </figcaption>
    </figure>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-demo {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-demo__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-demo__frame {
  margin: var(--wwt-space-6) 0 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 24px 48px rgba(28, 0, 135, 0.16);
  border: 1px solid var(--wwt-primary-lightest);
  background: var(--wwt-primary-lightest);
}

.wwt-demo__media {
  display: block;
  width: 100%;
  height: 540px;
  object-fit: cover;
  border: 0;
}

.wwt-demo__caption {
  padding: var(--wwt-space-3) var(--wwt-space-4);
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
  background: var(--wwt-bg-base);
}
</style>
