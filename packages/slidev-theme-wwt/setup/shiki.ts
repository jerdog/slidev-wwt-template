import { defineShikiSetup } from "@slidev/types";

export default defineShikiSetup(() => ({
  themes: {
    dark: {
      name: "wwt-dark",
      type: "dark",
      colors: {
        "editor.background": "#1D1E48",
        "editor.foreground": "#FFFFFF",
      },
      tokenColors: [
        { scope: ["comment"], settings: { foreground: "#7766B7", fontStyle: "italic" } },
        { scope: ["keyword", "storage", "storage.type"], settings: { foreground: "#66B6F2" } },
        { scope: ["string", "string.quoted"], settings: { foreground: "#99CFF7" } },
        { scope: ["constant.numeric"], settings: { foreground: "#FB550E" } },
        { scope: ["entity.name.function", "support.function"], settings: { foreground: "#E31C79" } },
        { scope: ["variable", "variable.parameter"], settings: { foreground: "#FFFFFF" } },
        { scope: ["entity.name.type", "support.class"], settings: { foreground: "#A499CF" } },
      ],
    },
    light: {
      name: "wwt-light",
      type: "light",
      colors: {
        "editor.background": "#FFFFFF",
        "editor.foreground": "#0A0B19",
      },
      tokenColors: [
        { scope: ["comment"], settings: { foreground: "#7766B7", fontStyle: "italic" } },
        { scope: ["keyword", "storage", "storage.type"], settings: { foreground: "#1C0087" } },
        { scope: ["string", "string.quoted"], settings: { foreground: "#0086EA" } },
        { scope: ["constant.numeric"], settings: { foreground: "#FB550E" } },
        { scope: ["entity.name.function", "support.function"], settings: { foreground: "#E31C79" } },
        { scope: ["variable", "variable.parameter"], settings: { foreground: "#0A0B19" } },
        { scope: ["entity.name.type", "support.class"], settings: { foreground: "#162FB4" } },
      ],
    },
  },
}));
