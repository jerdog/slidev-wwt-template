<script setup lang="ts">
import { computed } from "vue";
import { useSlideContext } from "@slidev/client";
const { $frontmatter } = useSlideContext();

type Member = { name: string; role: string; photo?: string };
const members = computed<Member[]>(() => ($frontmatter?.members ?? []) as Member[]);
</script>

<template>
  <div class="wwt-team slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-team__monogram" role="img" aria-label="WWT" />
    <h1 v-if="$frontmatter?.title">{{ $frontmatter.title }}</h1>
    <div class="wwt-team__grid" v-auto-animate>
      <v-clicks>
        <PersonCard
          v-for="m in members"
          :key="m.name"
          :name="m.name"
          :role="m.role"
          :photo="m.photo"
        />
      </v-clicks>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-team {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-team__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-team__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--wwt-space-8);
  margin-top: var(--wwt-space-8);
}
</style>
