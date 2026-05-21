import vue from "eslint-plugin-vue";

export default [
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**/.output/**", "**/slides-export/**"],
  },
  ...vue.configs["flat/recommended"],
  {
    rules: {
      "vue/multi-word-component-names": "off",
      "vue/html-self-closing": ["error", { html: { void: "always", normal: "always" } }],
    },
  },
];
