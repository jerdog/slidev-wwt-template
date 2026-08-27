<script setup lang="ts">
defineProps<{
  value: string;
  label: string;
  caption?: string;
}>();
</script>

<template>
  <article class="wwt-stat">
    <div class="wwt-stat__value">
      {{ value }}
    </div>
    <div class="wwt-stat__label">
      {{ label }}
    </div>
    <p v-if="caption" class="wwt-stat__caption">
      {{ caption }}
    </p>
  </article>
</template>

<style scoped>
.wwt-stat {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-2);
  /* `min-width: 0` is load-bearing, not defensive (see the same fix in
     styles/layout.css): a 1fr grid track defaults to `minmax(auto, 1fr)`,
     and the `auto` floor is the item's min-content width. A long numeral
     has no natural break point, so without this its own width inflates
     the column — and the whole grid — past the slide edge instead of
     wrapping inside the space it was given. `overflow-wrap: anywhere`
     covers the case where nothing forced it to wrap at all (e.g. "10,000+"
     has no space or hyphen to break at). */
  min-width: 0;
  overflow-wrap: anywhere;
}

.wwt-stat__value {
  font-size: 96px;
  font-weight: 300;
  color: var(--wwt-primary-base);
  line-height: 1;
  letter-spacing: -0.02em;
}

.wwt-stat__label {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
  color: var(--wwt-ink-base);
}

.wwt-stat__caption {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
  margin: 0;
}
</style>
