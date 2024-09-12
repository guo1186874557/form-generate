<script setup lang="ts">
import { ElMessage } from "element-plus";

import { FormItem, Input } from "@/model";
import useFormGenerate from "@/stores/useFormGenerate";
import { ComponentAttrCategory, Size } from "@/types";
import InputConfig from "@/views/form-generate/components/component-config/InputConfig.vue";

const instance = defineModel<FormItem>({ required: true });
const { rootForm } = storeToRefs(useFormGenerate());

/**
 * 字段发生变化时触发，
 * 并判断是否和其他组件的bindKey重复
 * 如果重复则不赋值给出提示
 * */
function onBindKeyChange(val: string) {
  const isRepeat = rootForm.value.children.find((item) => item.child.basicAttr.bindField === val);
  if (isRepeat) {
    ElMessage.warning(`${val}字段绑定重复，请重新输入！`);
  } else {
    instance.value.child.basicAttr.bindField = val;
  }
}

// 校验正则
const regsObj = [
  {
    label: "手机号",
    value: "^1[3-9]\\d{9}$",
  },
  {
    label: "邮箱",
    value: "^\\w+([-+.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$",
  },
  {
    label: "身份证号",
    value: "^\\d{17}[\\d|xX|X]{1}$|^\\d{15}$",
  },
];
</script>

<template>
  <el-scrollbar>
    <el-form size="small" label-width="auto" label-position="left">
      <el-collapse v-model="instance.collapseValue">
        <el-collapse-item :name="ComponentAttrCategory.BASIC">
          <template #title>
            <h3>基础属性</h3>
          </template>
          <el-form-item label="标签名">
            <el-input v-model="instance.attr.label"></el-input>
          </el-form-item>

          <el-form-item label="标签宽度">
            <el-input-number
              :disabled="instance.attr.labelWidthAuto"
              v-model="instance.attr.labelWidth"></el-input-number>
            <el-checkbox class="ml-2" v-model="instance.attr.labelWidthAuto">自动</el-checkbox>
          </el-form-item>

          <el-form-item label="组件大小">
            <el-config-provider value-on-clear="">
              <el-select-v2
                placeholder="默认跟随全局组件大小"
                clearable
                v-model="instance.attr.size"
                :options="[
                  { label: Size.LARGE, value: Size.LARGE },
                  { label: Size.SMALL, value: Size.SMALL },
                ]"></el-select-v2>
            </el-config-provider>
          </el-form-item>

          <el-form-item label="禁用">
            <el-switch v-model="instance.child.basicAttr.disabled"></el-switch>
          </el-form-item>

          <el-form-item label="绑定字段">
            <el-input :model-value="instance.child.basicAttr.bindField" @input="onBindKeyChange" clearable></el-input>
          </el-form-item>

          <template v-if="instance.child.is(Input)">
            <InputConfig v-model="instance.child"></InputConfig>
          </template>
        </el-collapse-item>

        <el-collapse-item :name="ComponentAttrCategory.RULE">
          <template #title>
            <h3>配置规则</h3>
          </template>
          <el-form-item label="必填">
            <el-switch v-model="instance.attr.required"></el-switch>
          </el-form-item>

          <el-form-item label="必填校验信息">
            <el-input v-model="instance.attr.requiredMsg"></el-input>
          </el-form-item>

          <template v-if="instance.child.is(Input)">
            <!--以下是输入框独有的配置规则-->
            <el-form-item label="字段校验">
              <el-config-provider value-on-clear="">
                <el-select-v2
                  v-model="instance.attr.pattern"
                  :options="regsObj"
                  allow-create
                  clearable
                  placeholder="请输入正则字符串或选择规则"
                  filterable
                  :reserve-keyword="false"></el-select-v2>
              </el-config-provider>
            </el-form-item>
            <el-form-item label="校验失败信息">
              <el-input v-model="instance.attr.patternMsg"></el-input>
            </el-form-item>
          </template>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>

<style scoped>
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}
</style>
