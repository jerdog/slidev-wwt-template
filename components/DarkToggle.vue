<script setup lang="ts">
import { useDarkMode } from "@slidev/client";

const { isDark, toggleDark } = useDarkMode();
</script>

<template>
  <button
    type="button"
    class="wwt-dark-toggle"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    :aria-pressed="isDark"
    @click="toggleDark"
  >
    <span v-if="isDark" aria-hidden="true">☀</span>
    <span v-else aria-hidden="true">☾</span>
  </button>
</template>

<style scoped>
.wwt-dark-toggle {
  background: transparent;
  border: 1px solid currentColor;
  border-radius: 999px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  font-size: 14px;
  color: inherit;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 120ms ease;
}

.wwt-dark-toggle:hover {
  opacity: 1;
}
</style>
