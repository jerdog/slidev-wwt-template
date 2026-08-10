<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
import { resolveSocial, type SocialValue } from "../components/socialPlatforms";

interface Speaker {
  name: string;
  socials?: Record<string, SocialValue>;
}

const { $frontmatter } = useSlideContext();

const speakers = computed(() => {
  const list = ($frontmatter?.speakers ?? []) as Speaker[];
  return list.map((s) => ({
    name: s.name,
    socials: Object.entries(s.socials ?? {}).map(([key, value]) => resolveSocial(key, value)),
  }));
});
</script>

<template>
  <div class="wwt-thank-you slidev-layout">
    <GraphicDevice variant="dark" />
    <div class="wwt-thank-you__body">
      <p class="wwt-thank-you__heading">
        {{ $frontmatter?.heading ?? "Thank You" }}
      </p>

      <div class="wwt-thank-you__speakers">
        <div v-for="s in speakers" :key="s.name" class="wwt-thank-you__speaker">
          <div class="wwt-thank-you__name">
            {{ s.name }}
          </div>
          <ul v-if="s.socials.length" class="wwt-thank-you__socials">
            <li v-for="social in s.socials" :key="`${social.platform}-${social.label}`">
              <a v-if="social.url" :href="social.url" target="_blank" rel="noopener noreferrer">
                <SocialIcon :platform="social.platform" aria-hidden="true" />
                <span>{{ social.label }}</span>
              </a>
              <span v-else class="wwt-thank-you__social-text">
                <SocialIcon :platform="social.platform" aria-hidden="true" />
                <span>{{ social.label }}</span>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="$frontmatter?.slidesUrl" class="wwt-thank-you__slides">
        <img
          v-if="$frontmatter?.qr"
          :src="String($frontmatter.qr)"
          alt="QR code linking to the slides"
          class="wwt-thank-you__qr"
        />
        <p class="wwt-thank-you__slides-text">
          Slides:
          <a :href="String($frontmatter.slidesUrl)" target="_blank" rel="noopener noreferrer">{{
            $frontmatter.slidesUrl
          }}</a>
        </p>
      </div>

      <WwtLogo variant="white" :height="56" />
    </div>
  </div>
</template>

<style scoped>
.wwt-thank-you {
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

.wwt-thank-you__body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--wwt-space-8);
}

.wwt-thank-you__heading {
  font-size: var(--wwt-text-cover);
  font-weight: 300;
  color: var(--wwt-ink-white);
  letter-spacing: -0.02em;
  margin: 0;
}

.wwt-thank-you__speakers {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--wwt-space-16);
}

.wwt-thank-you__speaker {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--wwt-space-3);
  max-width: 32rem;
  /* Same rationale as SpeakerCard.vue: a handle with no spaces (e.g. a
     mastodon "@user@instance.tld") has no natural break point otherwise. */
  overflow-wrap: anywhere;
}

.wwt-thank-you__name {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
  color: var(--wwt-ink-white);
}

.wwt-thank-you__socials {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--wwt-space-4);
  padding: 0;
  margin: 0;
}

.wwt-thank-you__socials li {
  margin: 0;
}

.wwt-thank-you__socials a,
.wwt-thank-you__social-text {
  display: inline-flex;
  align-items: center;
  gap: var(--wwt-space-2);
  font-size: var(--wwt-text-caption);
}

/* Dark background: the theme's default link color (--wwt-primary-base)
   is tuned for light backgrounds. --wwt-primary-light matches the
   existing dark-layout convention (see end.vue's "wwt.com" site line). */
.wwt-thank-you__socials a {
  color: var(--wwt-primary-light);
}

.wwt-thank-you__social-text {
  color: var(--wwt-ink-white);
  opacity: 0.7;
  border-bottom: none;
}

.wwt-thank-you__slides {
  display: flex;
  align-items: center;
  gap: var(--wwt-space-4);
}

.wwt-thank-you__qr {
  height: 96px;
  width: 96px;
  border-radius: 8px;
  background: var(--wwt-ink-white);
  padding: var(--wwt-space-1);
}

.wwt-thank-you__slides-text {
  font-size: var(--wwt-text-body);
  color: var(--wwt-ink-white);
  margin: 0;
}

.wwt-thank-you__slides-text a {
  color: var(--wwt-primary-light);
}

/* center alignment exception, same rationale as end.vue: this is a brand
   sign-off moment, not left-aligned body content. */
.wwt-thank-you,
.wwt-thank-you * {
  text-align: center;
}
</style>
