const eslintConfigXaxa = require('eslint-config-xaxa');
// const prettierConfig = require('./.prettierrc.cjs');

// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  // ...eslintConfigXaxa,
  // ignorePatterns: ['apps/**', 'packages/**'],
  // ignorePatterns: ['.eslintrc.cjs'],
  extends: ['eslint-config-xaxa'],
  parser: '@typescript-eslint/parser',
  globals: {
    ...eslintConfigXaxa.globals,
    browser: true,
    Deno: true,
    Bun: true,
    process: true,
    node: true,
    'astro/astro': true,
    es2020: true,
  },
  plugins: ['@typescript-eslint'],

  rules: {
    ...eslintConfigXaxa.rules,
    'node/no-unsupported-features/node-builtins': ['error', { version: '>=18.0.0' }],
    'unicorn/no-await-expression-member': 'off',
    'unicorn/consistent-destructuring ': 'off',
    'sort-keys': 'off',
    // 'prettier/prettier': 'off',
    camelcase: 'off',
    'max-statements': ['error', 40, { ignoreTopLevelFunctions: true }],
    'node/prefer-global/process': 'off',
    'node/file-extension-in-import': 'off',
    'unicorn/expiring-todo-comments': 'off',
    'import/no-unresolved': 'off',
    'import/no-unassigned-import': 'off',
    'import/prefer-default-export': 'off',
    'import/no-relative-packages': 'off',
    // 'prettier/prettier': 'error',
    // 'prettier/prettier': ['error', { ...prettierConfig }, { usePrettierrc: true }],
  },

  //                   overrides: [
  // {
  //   // Define the configuration for `.astro` file.
  //   files: ["**/*.astro"],
  //   // Allows Astro components to be parsed.
  //   parser: "astro-eslint-parser",
  //   plugins: ["astro"],
  //   extends: ["plugin:astro/recommended"],
  //   // Parse the script in `.astro` as TypeScript by adding the following configuration.
  //   // It's the setting you need when using TypeScript.
  //   parserOptions: {
  //     parser: "@typescript-eslint/parser",
  //     extraFileExtensions: [".astro"],
  //   },
  // },
  // ],
};
