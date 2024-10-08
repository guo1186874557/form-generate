<script setup lang="ts">
import { VueDraggable } from "vue-draggable-plus";

import FormRenderer from "@/components/renderer/FormRenderer.vue";
import { FormItem } from "@/model";
import useActiveVars from "@/stores/useActiveVars";
import useFormGenerate from "@/stores/useFormGenerate";

import FormTemplateItem from "./FormTemplateItem.vue";
import UtilsBar from "./UtilsBar.vue";

const { rootForm } = storeToRefs(useFormGenerate());
const { selectComponentObj } = storeToRefs(useActiveVars());

/** 选中item */
function selectItem(componentObj: FormItem) {
  rootForm.value.children.forEach((v) => {
    v.selected = false;
    if (v.id === componentObj.id) {
      v.selected = true;
      selectComponentObj.value = v;
    }
  });
}

/** 根据id删除formOption的children */
async function deleteFormOptionChildrenById(id: string) {
  const index = rootForm.value.children.findIndex((item) => item.id === id);
  if (index !== -1) {
    // 选中上一个
    if (index > 0) {
      selectItem(rootForm.value.children[index - 1]);
    } else {
      // 说明是最后一个 直接清空选中项
      selectComponentObj.value = null;
    }
    rootForm.value.children.splice(index, 1);
  }
}

/**
 *  复制formItem数据
 */
function onCopy(formItemData: FormItem) {
  const newItem = formItemData.clone();
  // 将新的item添加到children
  rootForm.value.children.push(newItem);
}
</script>

<template>
  <main class="flex-1 flex flex-col">
    <UtilsBar></UtilsBar>
    <VueDraggable
      target=".form-view"
      v-model="rootForm.children"
      :animation="150"
      group="component-drag"
      ghost-class="ghost"
      handle=".handle"
      class="flex-1 min-h-0 p-[10px]">
      <el-scrollbar view-class="w-full h-full bg-white">
        <FormRenderer class="form-view bg-white rounded w-full min-h-full py-[10px] px-[20px]" :instance="rootForm">
          <FormTemplateItem
            v-for="item in rootForm.children"
            :key="item.id"
            :option="item"
            @click="selectItem(item)"
            @del="deleteFormOptionChildrenById(item.id)"
            @copy="onCopy(item)">
          </FormTemplateItem>
        </FormRenderer>
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
