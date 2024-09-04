<script setup lang="ts">
import { ComponentAttrCategory, FieldType, InputType, LabelPosition } from "@/el-obj/enum";
import useFormGenerate from "@/stores/useFormGenerate";

const { selectedOption, formFields } = storeToRefs(useFormGenerate());

// 当前组件可以选择的字段
const selectFieldOptions = computed(() => {
  return formFields.value.filter((v) => !v.used).map((v) => ({ label: v.fieldName, value: v.fieldName }));
});

/**
 * 根据字段名 获取当前字段的 信息对象
 * @param fieldName 字段名
 */
function getFieldInfo(fieldName: string) {
  return formFields.value.find((v) => v.fieldName === fieldName) ?? null;
}
// 当前已经选择的字段信息
const selectedFieldInfo = computed(() => getFieldInfo(selectedOption.value!.bindKey));
/**
 * 更新字段的used状态
 */
function updateUsed(fieldName: string, used: boolean) {
  let findField = getFieldInfo(fieldName);
  if (findField) {
    findField.used = used;
  }
}

/**
 * 更新bindKey
 */
const onBindKeyUpdate = (val: string) => {
  if (selectedOption.value!.bindKey) {
    // 找到之前的将其used设置为false
    updateUsed(selectedOption.value!.bindKey, false);
  }
  // 更新当前的bindKey
  selectedOption.value!.bindKey = val;
  // 找到新的将其used设置为true
  updateUsed(val, true);
};

// 校验正则
const regsObj = ref([
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
  {
    label: "银行卡号",
    value: "^\\d{16,19}$",
  },
]);
</script>

<template>
  <el-scrollbar>
    <el-form :model="selectedOption!" label-position="left" label-width="auto" size="small">
      <el-collapse v-model="selectedOption!.collapseValue">
        <el-collapse-item :name="ComponentAttrCategory.BASIC">
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
          <el-form-item label="禁用">
            <el-switch v-model="selectedOption!.disabled"></el-switch>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item :name="ComponentAttrCategory.RULE">
          <template #title><h3>配置规则</h3></template>
          <el-form-item label="字段">
            <el-select-v2
              placeholder="请选择对应的字段"
              :model-value="selectedOption!.bindKey"
              @update:model-value="onBindKeyUpdate"
              clearable
              @change="selectedOption!.defaultValue = null"
              :options="selectFieldOptions">
            </el-select-v2>
          </el-form-item>
          <template v-if="selectedOption!.bindKey">
            <el-form-item label="默认值">
              <template v-if="selectedFieldInfo?.type === FieldType.BOOLEAN">
                <el-radio-group v-model="selectedOption!.defaultValue as any">
                  <el-radio :value="true" label="是"></el-radio>
                  <el-radio :value="false" label="否"></el-radio>
                </el-radio-group>
              </template>
              <template v-else-if="selectedFieldInfo?.type === FieldType.STRING">
                <el-input v-model="selectedOption!.defaultValue as any"></el-input>
              </template>
              <template v-else-if="selectedFieldInfo?.type === FieldType.NUMBER">
                <el-input v-model.number="selectedOption!.defaultValue as any"></el-input>
              </template>
              <template v-else>
                <el-input disabled placeholder="暂不支持该类型"></el-input>
              </template>
            </el-form-item>
            <el-form-item label="必填">
              <el-switch v-model="selectedOption!.required"></el-switch>
            </el-form-item>
            <el-form-item label="必填校验信息">
              <el-input v-model="selectedOption!.requiredMessage"></el-input>
            </el-form-item>
            <el-form-item label="字段校验">
              <el-config-provider value-on-clear="">
                <el-select-v2
                  v-model="selectedOption!.validateRegStr"
                  :options="regsObj"
                  allow-create
                  clearable
                  filterable
                  :reserve-keyword="false"></el-select-v2>
              </el-config-provider>
            </el-form-item>
            <el-form-item label="校验失败信息">
              <el-input v-model="selectedOption!.validateErrorMessage"></el-input>
            </el-form-item>
          </template>
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
