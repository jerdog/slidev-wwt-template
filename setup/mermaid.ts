import { defineMermaidSetup } from "@slidev/types";

// lineColor is a brand blue, not the near-black `--wwt-ink-base` value the
// rest of this config's dark-mode-adjacent colors might suggest. This
// config is static — mermaid renders are cached per Slidev
// (@slidev/client/modules/mermaid.ts) and don't react to the runtime dark
// mode toggle — so lineColor can't flip per color scheme. A near-black
// edge color is invisible against a dark slide background: every
// default-styled arrow in a flowchart disappears, leaving only nodes with
// no visible connectors. An explicit per-edge `linkStyle` override still
// wins over this, so a highlighted edge is unaffected either way. The
// brand blue reads clearly against both light and dark backgrounds
// without needing runtime reactivity.
//
// fontFamily deliberately omits "Inter, Roobert" despite them being the
// theme's actual brand fonts. Mermaid measures each node label's width on
// an offscreen canvas using this font list, then bakes that width into the
// rendered SVG permanently. Neither font is self-hosted by the theme (no
// @font-face — see the README's Typography section), so the browser
// starts that measurement before either has loaded, measures against a
// fallback, then repaints with the real font once it arrives — and the
// SVG's width never gets a second chance to match. Node text visibly
// overflows its box as a result, worse on longer labels. Restricting this
// to fonts the browser already has synchronously makes the measurement
// and the final paint use the identical font, eliminating the race.
export default defineMermaidSetup(() => ({
  theme: "base",
  themeVariables: {
    primaryColor: "#0086EA",
    primaryTextColor: "#FFFFFF",
    primaryBorderColor: "#1C0087",
    secondaryColor: "#1C0087",
    tertiaryColor: "#99CFF7",
    lineColor: "#0086EA",
    fontFamily: "Arial, system-ui, sans-serif",
  },
}));
