<script setup lang="ts">
import FormRenderer from "@/components/renderer/FormRenderer.vue";
import { FormItem, gco, Input } from "@/model";
import { Form } from "@/model/form/Form";

const formInstance = ref(
  gco(Form, {}, [
    gco(FormItem, {}, [gco(Input)]),
    gco(FormItem, {}, [gco(Input)]),
    gco(FormItem, {}, [gco(Input)]),
    gco(FormItem, {}, [gco(Input)]),
  ]),
);
</script>

<template>
  <FormRenderer v-model="formInstance"> </FormRenderer>
</template>

<style scoped></style>
