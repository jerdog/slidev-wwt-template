// Test-only stand-in for `@slidev/client`, aliased in vitest.config.ts.
//
// `@slidev/client` only exists inside a running Slidev app (see env.d.ts's
// module shim) — it isn't a real dependency of this package, so Vite's own
// import-analysis has nothing on disk to resolve at test time and fails
// before vitest's `vi.mock()` factory interception ever gets a chance
// (confirmed: this fails the same way regardless of any per-test vi.mock).
// Aliasing the bare specifier to this real file is what fixes it.
//
// Individual tests import `frontmatter` directly to control what
// useNav().currentSlideRoute.value.meta.slide.frontmatter resolves to.
import { ref, computed, type Ref } from "vue";

export const frontmatter: Ref<Record<string, unknown>> = ref({});

export function useNav() {
  return {
    currentSlideRoute: computed(() => ({
      meta: { slide: { frontmatter: frontmatter.value } },
    })),
  };
}
