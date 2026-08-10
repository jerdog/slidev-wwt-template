<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
import type { SocialValue } from "../components/socialPlatforms";

type Org = string | { name: string; logo?: string; url?: string };

interface Speaker {
  name: string;
  role?: string;
  company?: string;
  photo?: string;
  socials?: Record<string, SocialValue>;
  orgs?: Org[];
}

const { $frontmatter } = useSlideContext();
const speakers = computed<Speaker[]>(() => ($frontmatter?.speakers ?? []) as Speaker[]);
</script>

<template>
  <div class="wwt-speaker slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-speaker__monogram" role="img" aria-label="WWT" />
    <h1 v-if="$frontmatter?.title" class="wwt-speaker__heading">
      {{ $frontmatter.title }}
    </h1>
    <div class="wwt-speaker__grid" :data-count="speakers.length">
      <SpeakerCard
        v-for="s in speakers"
        :key="s.name"
        :name="s.name"
        :role="s.role"
        :company="s.company"
        :photo="s.photo"
        :socials="s.socials"
        :orgs="s.orgs"
      />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-speaker {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
  display: flex;
  flex-direction: column;
}

.wwt-speaker__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-speaker__heading {
  margin: 0 0 var(--wwt-space-8);
}

.wwt-speaker__grid {
  display: grid;
  gap: var(--wwt-space-12);
  flex: 1;
  align-content: center;
}

/* One speaker gets a single, generously wide column instead of stretching
   full-bleed — a lone SpeakerCard filling the whole slide width reads as
   an accident, not a design choice. */
.wwt-speaker__grid[data-count="1"] {
  grid-template-columns: minmax(0, 44rem);
  justify-content: center;
}

.wwt-speaker__grid[data-count="2"] {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
</style>
