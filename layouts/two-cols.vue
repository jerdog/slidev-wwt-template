<template>
  <div class="wwt-two-cols slidev-layout">
    <GradientRule />
    <div class="wwt-monogram-mark wwt-two-cols__monogram" role="img" aria-label="WWT" />
    <div class="wwt-two-cols__grid">
      <div class="wwt-two-cols__col">
        <slot name="left" />
      </div>
      <div class="wwt-two-cols__col">
        <slot name="right" />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style scoped>
.wwt-two-cols {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--wwt-bg-base);
  padding: 4.5rem 5rem 4rem;
}

.wwt-two-cols__monogram {
  position: absolute;
  top: 1.5rem;
  left: 2rem;
}

.wwt-two-cols__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--wwt-space-12);
  height: 100%;
  padding-top: var(--wwt-space-8);
}

.wwt-two-cols__col {
  display: flex;
  flex-direction: column;
  gap: var(--wwt-space-4);
}
</style>
