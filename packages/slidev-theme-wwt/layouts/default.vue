<template>
  <div class="wwt-default slidev-layout">
    <GradientRule class="wwt-default__rule" />
    <div class="wwt-monogram-mark wwt-default__monogram" role="img" aria-label="WWT" />
    <div class="wwt-default__content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-default {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
  display: flex;
  flex-direction: column;
}

.wwt-default__rule {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

.wwt-default__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-default__content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-4);
}
</style>
