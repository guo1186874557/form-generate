<script setup lang="ts">
import { Repl, useStore } from "@vue/repl";
import Codemirror from "@vue/repl/codemirror-editor";

import TextCode from "@/views/code-preview/components/TextCode.vue?raw";

const show = ref(false);

const store = useStore({
  builtinImportMap: ref({
    imports: {
      vue: "https://cdn.jsdelivr.net/npm/@vue/runtime-dom@latest/dist/runtime-dom.esm-browser.js",
      "@vue/shared": "https://cdn.jsdelivr.net/npm/@vue/shared@latest/dist/shared.esm-bundler.js",
      "element-plus": "https://cdn.jsdelivr.net/npm/element-plus@latest/dist/index.full.min.mjs",
      "element-plus/": "https://cdn.jsdelivr.net/npm/element-plus@latest/",
      "@element-plus/icons-vue": "https://cdn.jsdelivr.net/npm/@element-plus/icons-vue@2/dist/index.min.js",
    },
  }),
});

const previewOptions = {
  headHTML: `
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css"
  />
  `.trim(),
};
</script>

<template>
  <Repl theme="dark" :editor="Codemirror" :clearConsole="false" />
</template>

<style lang="scss"></style>
