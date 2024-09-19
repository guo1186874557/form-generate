<script setup lang="ts">
import useActiveVars from "@/stores/useActiveVars";
import useFormGenerate from "@/stores/useFormGenerate";
import PreviewCom from "@/views/form-generate/components/form-template/components/preview/PreviewCom.vue";

const { rootForm } = storeToRefs(useFormGenerate());
const { selectComponentObj } = storeToRefs(useActiveVars());

function onClear() {
  selectComponentObj.value = null;
  rootForm.value.children = [];
}
</script>
<template>
  <div class="h-[40px] bg-white flex items-center justify-end px-[10px]">
    <PreviewCom></PreviewCom>
    <el-button type="danger" size="small" @click="onClear">清空</el-button>
  </div>
</template>
<style scoped></style>
