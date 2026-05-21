import { defineAppSetup } from "@slidev/types";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import "../styles/index";

export default defineAppSetup(({ app }) => {
  app.use(autoAnimatePlugin);
});
