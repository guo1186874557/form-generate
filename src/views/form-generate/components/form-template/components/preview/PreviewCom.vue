<script setup lang="ts">
import { Repl, useStore } from "@vue/repl";
import Editor from "@vue/repl/monaco-editor";

import useFormGenerate from "@/stores/useFormGenerate";
import { createSFC } from "@/utils/createSFC";

const { rootForm } = storeToRefs(useFormGenerate());

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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/element-plus/dist/index.css"/>
    <script src="https://cdn.jsdelivr.net/npm/@unocss/runtime"><\/script>
  `,
};

const show = ref(false);
async function onPreview() {
  const code = rootForm.value.toTemplate();
  const script = rootForm.value.toScript();
  await store.setFiles({ "Index.vue": await createSFC(code, script, "") }, "Index.vue");
  show.value = true;
}
</script>

<template>
  <el-button @click="onPreview" type="primary" size="small" v-bind="$attrs"> 预览 </el-button>
  <el-dialog
    class="preview-dialog"
    top="20px"
    style="height: 90vh"
    v-model="show"
    title="代码预览"
    width="80%"
    destroy-on-close
    append-to-body>
    <Repl
      theme="dark"
      :clear-console="false"
      :show-compile-output="false"
      :show-ts-config="false"
      :store="store"
      :editor="Editor"
      :preview-options="previewOptions" />
  </el-dialog>
</template>

<style lang="scss" scoped></style>
