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
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-image: url("/wwt-gradient-rule.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
