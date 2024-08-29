<script setup lang="ts">
import { InputType } from "@/el-obj/enum";
import useFormGenerate from "@/stores/useFormGenerate";

const { selectedOption } = storeToRefs(useFormGenerate());
</script>

<template>
  <el-scrollbar>
    <el-form v-model="selectedOption" label-position="left" label-width="auto" size="small">
      <el-form-item label="标签">
        <el-input v-model="selectedOption!.label"></el-input>
      </el-form-item>
      <el-form-item label="默认值">
        <el-input v-model="selectedOption!.defaultValue"></el-input>
      </el-form-item>
      <el-form-item label="输入框类型">
        <el-select-v2
          v-model="selectedOption!.type"
          :options="[
            { label: '文本框', value: InputType.TEXT },
            { label: '密码框', value: InputType.PASSWORD },
            { label: '多行文本框', value: InputType.TEXTAREA },
          ]"></el-select-v2>
      </el-form-item>
      <el-form-item label="输入行数" v-if="selectedOption!.type === InputType.TEXTAREA">
        <el-input-number v-model="selectedOption!.rows"></el-input-number>
      </el-form-item>
      <el-form-item label="占位符">
        <el-input v-model="selectedOption!.placeholder"></el-input>
      </el-form-item>
    </el-form>
  </el-scrollbar>
</template>

<style lang="scss" scoped></style>
