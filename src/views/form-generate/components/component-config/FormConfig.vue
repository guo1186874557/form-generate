<script setup lang="ts">
import { ComponentAttrCategory, LabelPosition } from "@/el-obj/enum";
import { sizeOptions } from "@/el-obj/options";
import useFormGenerate from "@/stores/useFormGenerate";

const { formOption } = storeToRefs(useFormGenerate());
</script>

<template>
  <el-scrollbar>
    <el-form :model="formOption" label-width="auto" label-position="left" size="small">
      <el-collapse v-model="formOption.collapseValue">
        <el-collapse-item :name="ComponentAttrCategory.BASIC">
          <template #title><h3>基础配置</h3></template>
          <el-form-item label="全局组件大小">
            <el-select-v2 v-model="formOption.size" :options="sizeOptions"></el-select-v2>
          </el-form-item>
          <el-form-item label="标签位置">
            <el-radio-group v-model="formOption.labelPosition">
              <el-radio-button label="左侧" :value="LabelPosition.LEFT" />
              <el-radio-button label="顶部" :value="LabelPosition.TOP" />
              <el-radio-button label="右侧" :value="LabelPosition.RIGHT" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input-number :disabled="formOption.labelWidthAuto" v-model="formOption.labelWidth"></el-input-number>
            <el-checkbox class="ml-2" v-model="formOption.labelWidthAuto">自动</el-checkbox>
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
