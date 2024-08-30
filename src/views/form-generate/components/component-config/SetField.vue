<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ElMessage } from "element-plus";
import { nanoid } from "nanoid";

import { FieldType } from "@/el-obj/enum";
import { fieldTypeOptions } from "@/el-obj/options";
import { getInitValue } from "@/el-obj/utils";
import useFormGenerate from "@/stores/useFormGenerate";

const { formFields, formOption } = storeToRefs(useFormGenerate());
function onAddField() {
  formFields.value.push({
    id: nanoid(),
    type: FieldType.STRING,
    fieldName: nanoid(5),
    used: false,
  });
}

function onInput(value: string, index: number) {
  if (formFields.value.find((item) => item.fieldName === value)) {
    return ElMessage.warning(`您不能使用‘${value}’字段，因为它已经被使用了`);
  }
  formFields.value[index].fieldName = value;
}

watch(
  formFields,
  (v) => {
    formOption.value.formData = v.reduce(
      (pre, cur) => {
        pre[cur.fieldName] = getInitValue(cur.type);
        return pre;
      },
      {} as Record<string, any>,
    );
  },
  { deep: true },
);

function onDelField(index: number) {
  // 同步删除子组件的绑定字段
  formOption.value.children.forEach((item) => {
    if (item.bindKey === formFields.value[index].fieldName) {
      item.bindKey = "";
    }
  });
  formFields.value.splice(index, 1);
}
</script>

<template>
  <el-collapse-item name="field">
    <template #title><h3>设置字段</h3></template>
    <ul class="flex flex-col gap-2 mb-[3px]">
      <li class="flex" v-for="(field, index) in formFields" :key="field.id">
        <div class="flex items-center gap-1">
          <el-link type="danger" :underline="false" @click="onDelField(index)">
            <Icon style="font-size: 20px" icon="lets-icons:dell"></Icon>
          </el-link>
          <el-input
            :model-value="field.fieldName"
            @input="(val) => onInput(val, index)"
            placeholder="请填写字段名"></el-input>
        </div>
        <span class="mx-[5px]">-</span>
        <el-select-v2
          v-model="field.type"
          placeholder="请选择字段类型"
          :options="fieldTypeOptions"
          clearable></el-select-v2>
      </li>
    </ul>
    <div class="text-center pb-[10px]">
      <el-button type="primary" circle class="text-[16px]" title="添加字段" @click="onAddField">
        <template #icon>
          <Icon icon="gg:add"></Icon>
        </template>
      </el-button>
    </div>
  </el-collapse-item>
</template>

<style lang="scss" scoped></style>
