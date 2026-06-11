import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import globals from "globals";

export default [
  {
    ignores: [
      "dist/**",
      ".astro/**",
      ".agents/**",
      ".claude/**",
      ".cursor/**",
      ".gemini/**",
      ".kiro/**",
      "node_modules/**",
      "src/styles/generated/**",
      "src/assets/icons/currentColor/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  ...astro.configs["jsx-a11y-recommended"],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    files: ["**/*.astro"],
    rules: {
      // Interface Props is read implicitly by Astro and shows up as unused.
      "@typescript-eslint/no-unused-vars": "off",
      // define:vars referenced inside an @imported CSS file look unused to the plugin.
      "astro/no-unused-define-vars-in-style": "off",
      // role="list" on styled ULs is a deliberate Safari/VoiceOver workaround
      // for CSS that strips list-style (see CLAUDE.md Accessibility section).
      "astro/jsx-a11y/no-redundant-roles": "off",
    },
  },
  {
    files: ["**/*.cjs"],
    rules: {
      // CJS files are allowed to use require.
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];
