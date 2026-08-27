<script setup lang="ts">
defineProps<{
  title: string;
  detail?: string;
}>();
</script>

<template>
  <article class="wwt-box-card">
    <header class="wwt-box-card__header">
      {{ title }}
    </header>
    <p v-if="detail" class="wwt-box-card__body">
      {{ detail }}
    </p>
  </article>
</template>

<style scoped>
.wwt-box-card {
  border: 1px solid var(--wwt-primary-lightest);
  border-radius: 12px;
  overflow: hidden;
}

.wwt-box-card__header {
  background: var(--wwt-primary-base);
  color: var(--wwt-ink-white);
  padding: var(--wwt-space-3) var(--wwt-space-4);
  font-weight: 600;
}

.wwt-box-card__body {
  padding: var(--wwt-space-4);
  margin: 0;
  color: var(--wwt-ink-muted);
}
</style>
