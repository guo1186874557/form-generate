<script setup lang="ts">
import { DatePicker } from "@/model";

defineProps<{
  instance: DatePicker;
}>();
</script>

<template>
  <el-date-picker
    class="w-full"
    :model-value="instance.basicAttr.defaultValue"
    :disabled="instance.basicAttr.disabled"
    v-bind="instance.attr as any"></el-date-picker>
</template>

<style scoped></style>
