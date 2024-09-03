/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  plugins: ["simple-import-sort", "import"],
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "import/first": 1,
    "import/newline-after-import": 1,
    "import/no-duplicates": 1,
    // "@typescript-eslint/consistent-type-imports": "error",
    "vue/block-order": [
      "warn",
      {
        order: ["script", "template", "style"],
      },
    ],
    "vue/block-lang": [
      "error",
      {
        script: {
          lang: "ts",
        },
      },
    ],
    "vue/component-api-style": [
      "error",
      ["script-setup", "composition"], // "script-setup", "composition", "composition-vue2", or "options"
    ],
    "vue/multi-word-component-names": "off",
    "no-useless-escape": "off",
  },
};
