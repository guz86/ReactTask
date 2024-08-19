import js from "@eslint/js";
import globals from "globals";
import eslintReactHooks from "eslint-plugin-react-hooks";
import eslintReactRefresh from "eslint-plugin-react-refresh";
import eslintReact from "eslint-plugin-react";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      "react-hooks": eslintReactHooks,
      "react-refresh": eslintReactRefresh,
      react: eslintReact,
      prettier: prettierPlugin,
    },
  },
  {
    ignores: [
      "dist",
      "vite-env.d.ts",
      "node_modules",
      "coverage",
      "eslint.config.js",
      "vite.config.ts",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2021,
      globals: globals.browser,
      parserOptions: ["tsconfig.json", "tsconfig.node.json"],
      parser: tsParser,
    },
  },
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      ...prettierPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-explicit-any": "error",
    },
  }
);
