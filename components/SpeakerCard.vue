<script setup lang="ts">
import { computed } from "vue";
import { resolveSocial, type SocialValue } from "./socialPlatforms";

type Org = string | { name: string; logo?: string; url?: string };

const props = defineProps<{
  name: string;
  role?: string;
  company?: string;
  photo?: string;
  socials?: Record<string, SocialValue>;
  orgs?: Org[];
}>();

const titleLine = computed(() => [props.role, props.company].filter(Boolean).join(" · "));

const socialLinks = computed(() =>
  Object.entries(props.socials ?? {}).map(([key, value]) => resolveSocial(key, value)),
);

const orgList = computed(() =>
  (props.orgs ?? []).map((org) => (typeof org === "string" ? { name: org } : org)),
);
</script>

<template>
  <article class="wwt-speaker-card">
    <div class="wwt-speaker-card__photo">
      <img v-if="photo" :src="photo" :alt="name" />
      <span v-else class="wwt-speaker-card__initials">{{ name.charAt(0) }}</span>
    </div>
    <div class="wwt-speaker-card__meta">
      <div class="wwt-speaker-card__name">
        {{ name }}
      </div>
      <div v-if="titleLine" class="wwt-speaker-card__title">
        {{ titleLine }}
      </div>
      <ul v-if="socialLinks.length" class="wwt-speaker-card__socials">
        <li v-for="s in socialLinks" :key="`${s.platform}-${s.label}`">
          <a v-if="s.url" :href="s.url" target="_blank" rel="noopener noreferrer">
            <SocialIcon :platform="s.platform" aria-hidden="true" />
            <span>{{ s.label }}</span>
          </a>
          <span v-else class="wwt-speaker-card__social-text">
            <SocialIcon :platform="s.platform" aria-hidden="true" />
            <span>{{ s.label }}</span>
          </span>
        </li>
      </ul>
      <ul v-if="orgList.length" class="wwt-speaker-card__orgs">
        <li v-for="org in orgList" :key="org.name">
          <img v-if="org.logo" :src="org.logo" :alt="org.name" class="wwt-speaker-card__org-logo" />
          <a v-if="org.url" :href="org.url" target="_blank" rel="noopener noreferrer">{{
            org.name
          }}</a>
          <span v-else>{{ org.name }}</span>
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.wwt-speaker-card {
  display: flex;
  gap: var(--wwt-space-8);
  align-items: flex-start;
}

.wwt-speaker-card__photo {
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: var(--wwt-primary-lightest);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.wwt-speaker-card__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wwt-speaker-card__initials {
  font-size: 72px;
  font-weight: 300;
  color: var(--wwt-secondary-base);
}

.wwt-speaker-card__meta {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-3);
  padding-top: var(--wwt-space-2);
  min-width: 0;
  /* A handle with no spaces (e.g. a mastodon "@user@instance.tld") has no
     natural break point — without this, `min-width: 0` alone still lets
     the unbroken string overflow the column instead of wrapping. */
  overflow-wrap: anywhere;
}

.wwt-speaker-card__name {
  font-size: var(--wwt-text-h1);
  font-weight: 600;
  color: var(--wwt-ink-base);
  line-height: 1.15;
}

.wwt-speaker-card__title {
  font-size: var(--wwt-text-body);
  color: var(--wwt-ink-muted);
}

.wwt-speaker-card__socials,
.wwt-speaker-card__orgs {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: var(--wwt-space-4);
  padding: 0;
  margin: var(--wwt-space-2) 0 0;
}

.wwt-speaker-card__socials li,
.wwt-speaker-card__orgs li {
  margin: 0;
}

.wwt-speaker-card__socials a,
.wwt-speaker-card__social-text {
  display: inline-flex;
  align-items: center;
  gap: var(--wwt-space-2);
  font-size: var(--wwt-text-caption);
}

/* Non-linking socials (e.g. a discord/slack handle with no URL supplied)
   read as plain text — no underline, no primary-color link styling. */
.wwt-speaker-card__social-text {
  color: var(--wwt-ink-muted);
  border-bottom: none;
}

.wwt-speaker-card__orgs {
  margin-top: var(--wwt-space-3);
}

.wwt-speaker-card__orgs li {
  display: inline-flex;
  align-items: center;
  gap: var(--wwt-space-2);
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
  background: var(--wwt-primary-lightest);
  border-radius: 999px;
  padding: var(--wwt-space-1) var(--wwt-space-3);
}

.wwt-speaker-card__org-logo {
  height: 16px;
  width: auto;
}

/* Org pills stay muted and un-underlined whether or not the org has a
   `url:` — the global `.slidev-layout a` rule would otherwise turn a
   linked org into primary-blue underlined text inside the pill. */
.wwt-speaker-card__orgs a {
  color: inherit;
  border-bottom: none;
}
</style>
