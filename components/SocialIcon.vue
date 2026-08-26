<script setup lang="ts">
import type { SocialIconKey } from "./socialPlatforms";

defineProps<{
  platform: SocialIconKey;
}>();
</script>

<template>
  <!--
    One literal tag per platform, not a dynamic `:is="iconComponentName"`.
    Slidev's IconsResolver (unplugin-vue-components + unplugin-icons) wires
    up `<carbon-*>` tags at compile time by scanning each SFC's template for
    literal tag names — the same mechanism that lets Slidev's own docs use
    `<carbon-arrow-right />` directly with no import. A runtime string
    picked from data isn't a tag the resolver can see, so it never resolves.
    Keeping this closed-world (one branch per SocialIconKey) is what makes
    the zero-import convention work for a value that's only known at
    render time.
  -->
  <carbon-logo-bluesky v-if="platform === 'bluesky'" class="wwt-social-icon" />
  <carbon-logo-mastodon v-else-if="platform === 'mastodon'" class="wwt-social-icon" />
  <carbon-logo-github v-else-if="platform === 'github'" class="wwt-social-icon" />
  <carbon-logo-gitlab v-else-if="platform === 'gitlab'" class="wwt-social-icon" />
  <carbon-logo-linkedin v-else-if="platform === 'linkedin'" class="wwt-social-icon" />
  <carbon-logo-x v-else-if="platform === 'x'" class="wwt-social-icon" />
  <carbon-logo-youtube v-else-if="platform === 'youtube'" class="wwt-social-icon" />
  <carbon-logo-instagram v-else-if="platform === 'instagram'" class="wwt-social-icon" />
  <carbon-logo-facebook v-else-if="platform === 'facebook'" class="wwt-social-icon" />
  <carbon-logo-medium v-else-if="platform === 'medium'" class="wwt-social-icon" />
  <carbon-logo-discord v-else-if="platform === 'discord'" class="wwt-social-icon" />
  <carbon-logo-slack v-else-if="platform === 'slack'" class="wwt-social-icon" />
  <carbon-email v-else-if="platform === 'email'" class="wwt-social-icon" />
  <carbon-earth v-else-if="platform === 'website'" class="wwt-social-icon" />
  <carbon-link v-else class="wwt-social-icon" />
</template>

<style scoped>
.wwt-social-icon {
  width: 1em;
  height: 1em;
  flex-shrink: 0;
}
</style>
