<script setup lang="ts">
import FormItemRenderer from "@/components/renderer/FormItemRenderer.vue";
import { Form } from "@/model/Form";
import { LabelPosition, Size } from "@/types/enum";

const props = defineProps<{ instance: Form }>();
const { instance } = toRefs(props);

const attr = computed(() => {
  const attrs = instance.value.attr;
  const props: {
    labelPosition?: LabelPosition;
    labelWidth?: any;
    size?: Size;
  } = {
    labelWidth: attrs.labelWidthAuto ? "auto" : `${attrs.labelWidth}px`,
  };
  if (attrs.labelPosition !== LabelPosition.AUTO) {
    props.labelPosition = attrs.labelPosition;
  }
  if (attrs.size !== Size.AUTO) {
    props.size = attrs.size;
  }
  return props;
});
</script>

<template>
  <el-form v-bind="attr">
    <slot>
      <FormItemRenderer v-for="item in instance.children" :key="item.id" :instance="item"></FormItemRenderer>
    </slot>
  </el-form>
</template>

<style scoped></style>
