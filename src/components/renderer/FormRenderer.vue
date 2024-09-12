<script setup lang="ts">
import FormItemRenderer from "@/components/renderer/FormItemRenderer.vue";
import { Form } from "@/model/Form";
import { LabelPosition, Size } from "@/types/enum";

const instance = defineModel<Form>({ required: true });

const attr = computed(() => {
  const props: {
    labelPosition?: LabelPosition;
    labelWidth?: number;
    size?: Size;
  } = {};
  const attrs = instance.value.attr;
  if (attrs.labelPosition !== LabelPosition.AUTO) {
    props.labelPosition = attrs.labelPosition;
  }
  if (!attrs.labelWidthAuto) {
    props.labelWidth = attrs.labelWidth;
  }
  if (attrs.size !== Size.AUTO) {
    props.size = attrs.size;
  }
  return props;
});
</script>

<template>
  <el-form v-bind="attr">
    <FormItemRenderer
      v-for="(item, index) in instance.children"
      :key="item.id"
      v-model="instance.children[index]"></FormItemRenderer>
  </el-form>
</template>

<style scoped></style>
