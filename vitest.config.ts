import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // @slidev/client only exists inside a running Slidev app (see
      // env.d.ts) — it isn't a real dependency of this package, so Vite's
      // import-analysis has nothing to resolve at test time. See
      // test/mocks/slidev-client.ts for why vi.mock() alone isn't enough.
      "@slidev/client": fileURLToPath(new URL("./test/mocks/slidev-client.ts", import.meta.url)),
    },
  },
  test: {
    environment: "happy-dom",
    globals: false,
  },
});
