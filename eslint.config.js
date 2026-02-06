import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import testingLibrary from "eslint-plugin-testing-library";
import jestDom from "eslint-plugin-jest-dom";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  // Node-specific files
  {
    files: [
      "api/**/*.js",
      "scripts/**/*.{js,mjs}",
      "vite.config.*",
      "postcss.config.*",
      "tailwind.config.*",
    ],
    languageOptions: {
      globals: {
        process: "readonly",
        console: "readonly",
        module: "readonly",
        __dirname: "readonly",
        require: "readonly",
      },
    },
    rules: {
      // Keep Node files minimal; rely on Prettier for style.
    },
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        browser: true,
        es2021: true,
        IntersectionObserver: "readonly",
        localStorage: "readonly",
        confirm: "readonly",
        setTimeout: "readonly",
        Blob: "readonly",
        URL: "readonly",
        FileReader: "readonly",
        global: "readonly",
        alert: "readonly",
        requestAnimationFrame: "readonly",
        cancelAnimationFrame: "readonly",
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["error"] }],
    },
  },
  {
    files: ["src/**/*.jsx", "src/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["src/components/EPKGallery.jsx", "src/components/Lightbox.jsx"],
    rules: {
      "jsx-a11y/role-supports-aria-props": "off",
      "jsx-a11y/no-noninteractive-element-to-interactive-role": "off",
      "no-unused-vars": "off",
    },
  },
  {
    files: ["src/components/CursorSquid.jsx"],
    rules: {
      "no-redeclare": "off",
    },
  },
  {
    files: ["**/*.{test,spec}.{js,jsx,ts,tsx}", "src/__tests__/**"],
    plugins: {
      "testing-library": testingLibrary,
      "jest-dom": jestDom,
    },
    languageOptions: {
      globals: {
        vi: "readonly",
        describe: "readonly",
        it: "readonly",
        test: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
      },
    },
    rules: {
      ...testingLibrary.configs.react.rules,
      ...jestDom.configs.recommended.rules,
    },
  },
  {
    ignores: ["codex/**", "api/**", "dist/**", "build/**", "node_modules/**", "public/**"],
  },
  prettier,
];
