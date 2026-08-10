// Type shims for modules that are only available inside the Slidev runtime.
// @slidev/client source files use Vite define globals (__DEV__, etc.) that are
// not available when running vue-tsc standalone. We declare the module shape
// here so components can import from it without errors.

declare module "@slidev/client" {
  import type { ComputedRef, Ref } from "vue";

  export function useNav(): {
    currentSlideNo: ComputedRef<number>;
    total: ComputedRef<number>;
    currentLayout: ComputedRef<string>;
    // No currentFrontmatter shorthand at this theme's floor version
    // (@slidev/cli >=0.49.0) — go through currentSlideRoute instead, the
    // same path newer Slidev versions use to derive that shorthand
    // internally. Minimally typed: only the fields anything here reads.
    currentSlideRoute: ComputedRef<{
      meta: { slide: { frontmatter: Record<string, unknown> } };
    }>;
    [key: string]: unknown;
  };

  export function useDarkMode(): {
    isDark: import("vue").Ref<boolean>;
    toggleDark: () => void;
    isColorSchemaConfigured: import("vue").Ref<boolean>;
  };

  export function useSlideContext(): {
    $frontmatter: Record<string, unknown>;
    [key: string]: unknown;
  };

  export function defineShikiSetup(fn: () => unknown): void;
  export function defineUnoSetup(fn: () => unknown): void;
  export function defineMonacoSetup(fn: () => unknown): void;
  export function defineMermaidSetup(fn: () => unknown): void;
  export function defineTransition(name: string, transition: unknown): void;
}
