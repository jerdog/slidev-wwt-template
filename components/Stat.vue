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
