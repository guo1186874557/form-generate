<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { nanoid } from "nanoid";
import { VueDraggable } from "vue-draggable-plus";

import type { OptionsItemInterface } from "@/types";

const options = defineModel<OptionsItemInterface[]>({ required: true });

/**
 * 删除选项
 * @param id
 */
function onDel(id: string) {
  const findIndex = options.value.findIndex((item) => item.id === id);
  if (findIndex !== -1) {
    options.value.splice(findIndex, 1);
  }
}
</script>

<template>
  <el-divider>选项设置</el-divider>
  <div class="mb-2 flex justify-between">
    <div>
      <el-link
        :underline="false"
        type="primary"
        @click="options.push({ label: '选项名', value: nanoid(4), id: nanoid() })">
        添加选项
      </el-link>
      <span class="text-sm text-gray-400 ml-2">(支持拖拽排序)</span>
    </div>
    <div>
      <el-link :underline="false" type="danger" @click="options = []"> 清空选项 </el-link>
    </div>
  </div>
  <VueDraggable handle=".handle" :animation="150" v-model="options" class="flex flex-col gap-[5px]">
    <div v-for="(item, index) in options" :key="item.id" class="flex items-center">
      <el-link :underline="false" class="cursor-move handle" type="primary">
        <Icon :width="20" icon="tdesign:move"></Icon>
      </el-link>
      <div class="flex items-center mx-1">
        <el-input v-model="options[index].value" placeholder="选项值"></el-input>
        <span class="mx-1">-</span>
        <el-input v-model="options[index].label" placeholder="选项名"></el-input>
      </div>
      <el-link :underline="false" type="danger" @click="onDel(item.id)">
        <Icon :width="20" icon="mynaui:delete"></Icon>
      </el-link>
    </div>
  </VueDraggable>
  <el-divider></el-divider>
</template>

<style scoped></style>
