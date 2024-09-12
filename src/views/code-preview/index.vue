<script setup lang="ts">
import FormRenderer from "@/components/renderer/FormRenderer.vue";
import { FormItem, gco, Input } from "@/model";
import { Form } from "@/model/Form";
import { Radio } from "@/model/Radio";

const formInstance = ref(
  gco(Form, {}, [
    gco(FormItem, {}, gco(Input)),
    gco(FormItem, {}, gco(Input)),
    gco(FormItem, {}, gco(Radio)),
    gco(FormItem, {}, gco(Radio)),
  ]),
);
</script>

<template>
  <FormRenderer :instance="formInstance"> </FormRenderer>
</template>

<style scoped></style>
