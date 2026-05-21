<script setup lang="ts">
defineProps<{
  height?: number;
}>();
</script>

<template>
  <div
    class="wwt-gradient-rule"
    :style="{ height: `${$props.height ?? 4}px` }"
    role="presentation"
    aria-hidden="true"
  />
</template>

<style scoped>
.wwt-gradient-rule {
  width: 100%;
  background-image: url("/wwt-gradient-rule.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
