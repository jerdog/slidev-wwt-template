<script setup lang="ts">
defineProps<{
  name: string;
  role: string;
  photo?: string;
}>();
</script>

<template>
  <article class="wwt-person">
    <div class="wwt-person__photo">
      <img v-if="photo" :src="photo" :alt="name" />
      <span v-else class="wwt-person__initials">{{ name.charAt(0) }}</span>
    </div>
    <div class="wwt-person__meta">
      <div class="wwt-person__name">
        {{ name }}
      </div>
      <div class="wwt-person__role">
        {{ role }}
      </div>
    </div>
  </article>
</template>

<style scoped>
.wwt-person {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-3);
  align-items: flex-start;
}

.wwt-person__photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: var(--wwt-primary-lightest);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.wwt-person__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wwt-person__initials {
  font-size: 48px;
  font-weight: 300;
  color: var(--wwt-secondary-base);
}

.wwt-person__name {
  font-size: var(--wwt-text-h2);
  font-weight: 600;
  color: var(--wwt-ink-base);
}

.wwt-person__role {
  font-size: var(--wwt-text-caption);
  color: var(--wwt-ink-muted);
}
</style>
