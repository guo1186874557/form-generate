<script setup lang="ts">
import { Repl, useStore } from "@vue/repl";
import Monaco from "@vue/repl/monaco-editor";

import useFormGenerate from "@/stores/useFormGenerate";

const { formOption } = storeToRefs(useFormGenerate());

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
  let code = await formOption.value.toCode();
  await store.setFiles({ "Index.vue": code }, "Index.vue");
  show.value = true;
}
</script>

<template>
  <el-button @click="onPreview"> 预览 </el-button>
  <el-dialog
    class="preview-dialog"
    top="20px"
    style="height: 90vh"
    v-model="show"
    title="代码预览"
    width="80%"
    destroy-on-close
    append-to-body>
    <Repl theme="dark" :store="store" :editor="Monaco" :preview-options="previewOptions" />
  </el-dialog>
</template>

<style lang="scss" scoped></style>
