<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";

import { ElInputObj } from "@/el-obj/input";
import useFormGenerate from "@/stores/useFormGenerate";

import FormTemplateItem from "./FormTemplateItem.vue";

const { formOption, selectedOption } = storeToRefs(useFormGenerate());

/** 选中item */
function selectItem(componentObj: ElInputObj) {
  formOption.value.children.forEach((v) => {
    v.isSelect = false;
    if (v.id === componentObj.id) {
      v.isSelect = true;
      selectedOption.value = v;
    }
  });
}

/** 根据id删除formOption的children */
async function deleteFormOptionChildrenById(id: string) {
  const index = formOption.value.children.findIndex((item) => item.id === id);
  if (index !== -1) {
    // 选中上一个
    if (index > 0) {
      selectItem(formOption.value.children[index - 1]);
    }
    formOption.value.children.splice(index, 1);
  }
}
</script>

<template>
  <main class="flex-1">
    <VueDraggable
      target=".form-view"
      v-model="formOption.children"
      :animation="150"
      group="component-drag"
      ghost-class="ghost"
      handle=".handle"
      class="w-full h-full p-[10px]">
      <el-scrollbar view-class="w-full h-full">
        <el-form
          :size="formOption.size as any"
          :label-width="formOption.labelWidth"
          :label-position="formOption.labelPosition as any"
          class="form-view bg-white rounded w-full min-h-full p-[10px]">
          <FormTemplateItem
            v-for="item in formOption.children"
            :key="item.id"
            :option="item"
            @click="selectItem(item)"
            @del="deleteFormOptionChildrenById(item.id)">
          </FormTemplateItem>
          <!--<pre> {{ formOption }}</pre>-->
        </el-form>
      </el-scrollbar>
    </VueDraggable>
  </main>
</template>

<style scoped lang="scss">
main {
  background-color: #f1f2f3;
}
.el-form {
  :deep(.ghost) {
    height: 3px;
    width: 100%;
    background-color: #409eff;
    overflow: hidden;
    * {
      display: none;
    }
  }
}
</style>
