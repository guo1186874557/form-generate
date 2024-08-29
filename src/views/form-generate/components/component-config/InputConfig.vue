<script setup lang="ts">
import { InputType, LabelPosition } from "@/el-obj/enum";
import useFormGenerate from "@/stores/useFormGenerate";

const { selectedOption } = storeToRefs(useFormGenerate());
</script>

<template>
  <el-scrollbar>
    <el-form :model="selectedOption!" label-position="left" label-width="auto" size="small">
      <el-collapse v-model="selectedOption!.collapseValue">
        <el-collapse-item name="basic">
          <template #title><h3>基础属性</h3></template>
          <el-form-item label="标签名称">
            <el-input v-model="selectedOption!.label"></el-input>
          </el-form-item>
          <el-form-item label="标签宽度">
            <el-input-number v-model="selectedOption!.labelWidth"></el-input-number>
          </el-form-item>
          <el-form-item label="标签位置">
            <el-radio-group v-model="selectedOption!.labelPosition">
              <el-radio-button label="左侧" :value="LabelPosition.LEFT" />
              <el-radio-button label="顶部" :value="LabelPosition.TOP" />
              <el-radio-button label="右侧" :value="LabelPosition.RIGHT" />
              <el-radio-button label="自动" :value="LabelPosition.AUTO" />
            </el-radio-group>
          </el-form-item>
          <el-form-item label="默认值">
            <el-input v-model="selectedOption!.defaultValue"></el-input>
          </el-form-item>
          <el-form-item label="输入类型">
            <el-select-v2
              v-model="selectedOption!.type"
              :options="[
                { label: InputType.TEXT, value: InputType.TEXT },
                { label: InputType.PASSWORD, value: InputType.PASSWORD },
                { label: InputType.TEXTAREA, value: InputType.TEXTAREA },
              ]"></el-select-v2>
          </el-form-item>
          <el-form-item label="行数" v-if="selectedOption!.type === InputType.TEXTAREA">
            <el-input-number v-model="selectedOption!.rows"></el-input-number>
          </el-form-item>
          <el-form-item label="占位符">
            <el-input v-model="selectedOption!.placeholder"></el-input>
          </el-form-item>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<style lang="scss" scoped>
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}
</style>
