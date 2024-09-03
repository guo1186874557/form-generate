<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ElMessage } from "element-plus";
import { customRandom, random } from "nanoid";

import { ComponentAttrCategory, FieldType } from "@/el-obj/enum";
import { fieldTypeOptions } from "@/el-obj/options";
import useFormGenerate from "@/stores/useFormGenerate";

const { formFields, formOption } = storeToRefs(useFormGenerate());
const idGenerator = customRandom("1234567890abcdefghijklmnopqrstuvwxyz", 10, random);
function onAddField() {
  let id = idGenerator();
  formFields.value.push({
    id,
    type: FieldType.STRING,
    fieldName: "formData_" + id,
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
        pre[cur.fieldName] = null;
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
  <el-collapse-item :name="ComponentAttrCategory.FIELD">
    <template #title><h3>设置字段</h3></template>
    <div class="flex flex-col gap-2 mb-[3px]">
      <el-card v-for="(field, index) in formFields" :key="field.id" body-class="p-[5px]" shadow="never">
        <div class="flex justify-end">
          <el-link type="danger" :underline="false" @click="onDelField(index)">
            <Icon style="font-size: 20px" icon="lets-icons:dell"></Icon>
          </el-link>
        </div>
        <div class="flex items-center my-[5px]">
          <div class="whitespace-nowrap">字段名称：</div>
          <el-input
            :model-value="field.fieldName"
            @input="(val) => onInput(val, index)"
            placeholder="请填写字段名"></el-input>
        </div>
        <div class="flex items-center">
          <span class="whitespace-nowrap">数据类型：</span>
          <el-select-v2
            v-model="field.type"
            placeholder="请选择字段类型"
            :options="fieldTypeOptions"
            clearable></el-select-v2>
        </div>
      </el-card>
    </div>
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
