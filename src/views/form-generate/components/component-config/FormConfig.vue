<script setup lang="ts">
import { Form } from "@/model";
import { ComponentAttrCategory, LabelPosition, Size } from "@/types";

const formInstance = defineModel<Form>({ required: true });

/** size属性的选项 */
const sizeOptions: { label: Size; value: Size }[] = [
  { label: Size.LARGE, value: Size.LARGE },
  { label: Size.SMALL, value: Size.SMALL },
];
</script>

<template>
  <el-scrollbar>
    <el-form :model="formInstance" label-width="auto" label-position="left" size="small">
      <el-collapse v-model="formInstance.collapseValue">
        <el-collapse-item :name="ComponentAttrCategory.BASIC">
          <template #title><h3>基础配置</h3></template>
          <el-form-item label="全局组件大小">
            <el-select-v2
              placeholder="默认"
              clearable
              v-model="formInstance.attr.size"
              :options="sizeOptions"></el-select-v2>
          </el-form-item>
          <el-form-item label="标签位置">
            <el-radio-group v-model="formInstance.attr.labelPosition">
              <el-radio-button label="左侧" :value="LabelPosition.LEFT" />
              <el-radio-button label="顶部" :value="LabelPosition.TOP" />
              <el-radio-button label="右侧" :value="LabelPosition.RIGHT" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input-number
              :disabled="formInstance.attr.labelWidthAuto"
              v-model="formInstance.attr.labelWidth"></el-input-number>
            <el-checkbox class="ml-2" v-model="formInstance.attr.labelWidthAuto">自动</el-checkbox>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<style scoped lang="scss">
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}
</style>
