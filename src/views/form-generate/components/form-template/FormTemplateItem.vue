<script setup lang="ts">
import { Icon } from "@iconify/vue";

import { ElInputObj } from "@/el-obj/input";
import useFormGenerate from "@/stores/useFormGenerate";

const props = defineProps<{
  option: ElInputObj;
}>();
const { formOption, selectedOption } = storeToRefs(useFormGenerate());

/** 选中item */
function selectItem() {
  formOption.value.children.forEach((v) => {
    v.isSelect = false;
    if (v.id === props.option.id) {
      v.isSelect = true;
      selectedOption.value = v;
    }
  });
}

/** 根据id删除formOption的children */
function deleteFormOptionChildrenById() {
  const index = formOption.value.children.findIndex((item) => item.id === props.option.id);
  if (index !== -1) {
    formOption.value.children.splice(index, 1);
  }
}

onMounted(() => {
  selectItem();
});
onBeforeUnmount(() => {
  selectedOption.value = null;
});
</script>

<template>
  <div class="relative my-[5px] p-[5px]" :class="{ active: option.isSelect }" @click="selectItem">
    <!-- 拖拽提示 -->
    <div v-if="option.isSelect" class="handle move-tooltip">
      <Icon width="14" icon="carbon:move"></Icon>
      <span class="text-[12px]">{{ option.name }}</span>
    </div>
    <!-- 操作栏 -->
    <div v-if="option.isSelect" class="operation-bar" @click="deleteFormOptionChildrenById">
      <Icon width="20" icon="material-symbols-light:delete-outline" @click="deleteFormOptionChildrenById"></Icon>
    </div>
    <!-- 表单 -->
    <el-form-item :label="option.label" class="m-0">
      <el-input
        :model-value="option.defaultValue"
        :type="option.type"
        :placeholder="option.placeholder"
        :rows="option.rows" />
    </el-form-item>
  </div>
</template>

<style lang="scss" scoped>
$borderColor: #409eff;
$borderWidth: 2px;

@mixin selectItem() {
  position: absolute;
  background-color: $borderColor;
  z-index: 2;
  display: flex;
  align-items: center;
  color: #fff;
}

.active {
  border: $borderWidth solid $borderColor;
}
.move-tooltip {
  top: -$borderWidth;
  left: -$borderWidth;
  padding: 0 3px;
  cursor: move;
  @include selectItem();
}
.operation-bar {
  bottom: -$borderWidth;
  right: -$borderWidth;
  gap: 3px;
  @include selectItem();
}
</style>
