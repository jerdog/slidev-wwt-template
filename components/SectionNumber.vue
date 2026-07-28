<script setup lang="ts">
defineProps<{
  n: number | string;
}>();
</script>

<template>
  <div class="wwt-section-number">
    {{ n }}
  </div>
</template>

<style scoped>
.wwt-section-number {
  font-size: var(--wwt-text-section-number);
  font-weight: 300;
  color: var(--wwt-primary-base);
  line-height: 1;
  letter-spacing: -0.04em;
}
</style>
