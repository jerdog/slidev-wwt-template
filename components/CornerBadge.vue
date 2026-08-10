<script setup lang="ts">
// Deliberately useNav(), not useSlideContext()'s $frontmatter — this
// component is designed to be used from a project's global-top.vue, which
// mounts once, outside any single slide's own component tree.
// useSlideContext() relies on provide/inject up that tree, so from a
// global layer it silently binds to whichever context it can find
// (observed: the badge stayed visible and ignored hideBadge: true on
// every slide) rather than reactively tracking slide navigation. useNav() is a
// shared composable (createSharedComposable in @slidev/client) with no
// such tree dependency, so it works correctly from anywhere in the app.
//
// Reading currentSlideRoute.value.meta.slide.frontmatter directly, rather
// than a currentFrontmatter shorthand: this theme's peerDependency floor is
// @slidev/cli >=0.49.0, and that shorthand doesn't exist yet at 0.49.x's
// useNav() (confirmed against its actual shipped composables/useNav.ts —
// only currentSlideRoute is there). meta.slide.frontmatter is the same
// path newer Slidev versions use to derive currentFrontmatter internally,
// so this works across the whole supported range.
import { computed } from "vue";
import { useNav } from "@slidev/client";

withDefaults(
  defineProps<{
    src: string;
    rotate?: number;
  }>(),
  { rotate: -8 },
);

const { currentSlideRoute } = useNav();
const frontmatter = computed<Record<string, unknown>>(
  () => currentSlideRoute.value?.meta?.slide?.frontmatter ?? {},
);
</script>

<template>
  <div v-if="!frontmatter?.hideBadge" class="wwt-corner-badge-layer" aria-hidden="true">
    <img
      class="wwt-corner-badge"
      :src="src"
      alt=""
      :style="{ transform: `rotate(${rotate}deg)` }"
    />
  </div>
</template>

<style scoped>
.wwt-corner-badge-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 20;
}

.wwt-corner-badge {
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  height: 32px;
  width: auto;
  /* No aspect-ratio/object-fit: those require hardcoding the source image's
     pixel dimensions, and go stale — silently cropping the image — the
     moment a consumer swaps the file for one with a different ratio.
     Natural width at a fixed height needs neither. */
  border-radius: 6px;
  box-shadow:
    0 6px 10px rgba(10, 11, 25, 0.35),
    0 2px 4px rgba(10, 11, 25, 0.25);
}
</style>
