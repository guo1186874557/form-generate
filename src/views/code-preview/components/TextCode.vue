<script setup lang="ts">
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from "element-plus";
import { ref } from "vue";

const formData = ref({
  username: "",
  password: "",
});
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
function handleSubmit() {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log("submit", formData.value);
      ElMessage.success("提交成功");
    } else {
      console.log("error submit");
      ElMessage.error("表单验证失败");
    }
  });
}
</script>

<template>
  <div>
    <el-form ref="formRef" :model="formData">
      <el-form-item label="用户名" prop="username" :rules="[{ required: true, message: '请输入用户名' }]">
        <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码' }]">
        <el-input v-model="formData.password" type="password" placeholder="请输入密码"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button type="primary" @click="handleSubmit">提交</el-button>
    </div>
  </div>
</template>

<style scoped></style>
