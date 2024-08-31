<script setup lang="ts">
import "@vue/repl/style.css";

import { Repl } from "@vue/repl";
import Monaco from "@vue/repl/monaco-editor";
// ^ no longer needed after 3.0
</script>

<template>
  <Repl :content="123" :show-ts-config="false" :show-import-map="false" :show-compile-output="false" :editor="Monaco" />
</template>
