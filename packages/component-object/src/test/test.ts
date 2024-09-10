import { FormComponentObject } from "../obj/form";
import { InputComponentObject } from "../obj/input";
import { prettierCode } from "../utils/prettierCode";

const form = new FormComponentObject({ labelWidthAuto: false });
const input = new InputComponentObject({
  required: true,
  placeholder: "请输入",
  label: "用户名",
});
const input2 = new InputComponentObject({
  placeholder: "请输入姓名",
  defaultValue: "小明",
  readonly: true,
  clearable: true,
  label: "姓名",
  validateRegStr: "^[a-zA-Z0-9]+$",
});
form.children.push(input, input2);

const ts = `

defineOptions({ name: "FormGenerate" });

const formData = ref({
  name: "小明",
  username: "admin"})
`;

const css = `
  .form-item {
    .a {
  color: red
} .b {color:blue} }
`;

(async () => {
  // console.log(await prettierCode(form.toSfcTemplate(), "html"));
  // console.log("================================");
  // console.log(await prettierCode(ts, "typescript"));
  // console.log("================================");
  // console.log(await prettierCode(css, "scss"));
  // console.log(await prettierCode(form.toSfc(), "html"));
})();
