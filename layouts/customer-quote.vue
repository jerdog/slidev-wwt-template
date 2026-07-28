<script setup lang="ts">
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();
</script>

<template>
  <div class="wwt-customer slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-customer__monogram" role="img" aria-label="WWT" />
    <div class="wwt-customer__layout">
      <figure v-if="$frontmatter?.photo" class="wwt-customer__photo">
        <img :src="String($frontmatter.photo)" :alt="String($frontmatter?.name ?? '')" />
      </figure>
      <blockquote class="wwt-customer__body">
        <p class="wwt-customer__quote">
          {{ $frontmatter?.quote }}
        </p>
        <footer class="wwt-customer__cite">
          <div class="wwt-customer__name">
            {{ $frontmatter?.name }}
          </div>
          <div class="wwt-customer__role">
            {{ $frontmatter?.role }}
          </div>
          <img
            v-if="$frontmatter?.logo"
            :src="String($frontmatter.logo)"
            :alt="String($frontmatter?.name ?? '')"
            class="wwt-customer__logo"
          />
        </footer>
      </blockquote>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-customer {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
  display: flex;
  align-items: center;
}

.wwt-customer__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-customer__layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: var(--wwt-space-12);
  align-items: center;
}

.wwt-customer__photo {
  margin: 0;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50%;
  background: var(--wwt-primary-lightest);
}

.wwt-customer__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wwt-customer__body {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-6);
}

.wwt-customer__quote {
  font-size: var(--wwt-text-quote);
  font-weight: 300;
  line-height: 1.3;
  margin: 0;
}

.wwt-customer__quote::before {
  content: "\201C";
  color: var(--wwt-primary-base);
  font-size: 1.5em;
  vertical-align: -0.2em;
  margin-right: 0.1em;
}

.wwt-customer__cite {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-2);
}

.wwt-customer__name {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
}

.wwt-customer__role {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
}

.wwt-customer__logo {
  height: 32px;
  width: auto;
  margin-top: var(--wwt-space-2);
}
</style>
