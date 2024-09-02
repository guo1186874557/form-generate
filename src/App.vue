<script setup lang="ts">
// @ts-ignore
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<style lang="scss">
.preview-dialog {
  display: flex;
  flex-direction: column;
  .el-dialog__body {
    flex: 1;
    min-height: 0;
  }
}
</style>
