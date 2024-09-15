import { Component, type DepType } from "@/model/common/Component";
import { FormItem } from "@/model/index";
import { ComponentAttrCategory } from "@/types";
import { LabelPosition, Size } from "@/types/enum";
import { mergeDeps } from "@/utils/mergeDeps";

interface FormAttrInterface {
  labelWidth: number;
  labelWidthAuto: boolean;
  labelPosition: LabelPosition;
  size: Size;
}

export class Form extends Component<FormAttrInterface> {
  children: FormItem[] = [];
  collapseValue: ComponentAttrCategory[] = [ComponentAttrCategory.BASIC];

  constructor(attr: Partial<FormAttrInterface> = {}, child?: FormItem | FormItem[]) {
    const defaultAttr: FormAttrInterface = {
      labelWidth: 80,
      labelWidthAuto: true,
      labelPosition: LabelPosition.RIGHT,
      size: Size.AUTO,
    };
    super({ ...defaultAttr, ...attr });
    if (child) {
      if (Array.isArray(child)) {
        this.children.push(...child);
      } else {
        this.children.push(child);
      }
    }
  }
  override clone(): Form {
    return new Form(
      this.attr,
      this.children.map((v) => v.clone()),
    );
  }

  override getDeps(): DepType[] {
    const childDeps: DepType[] = this.children.reduce((pre, cur) => [...pre, ...cur.getDeps()], [] as DepType[]);
    const selfDeps = [
      { import: ["ElForm", "ElButton"], from: "element-plus" },
      { import: ["ref"], from: "vue" },
    ];
    return mergeDeps(selfDeps, childDeps);
  }

  override toTemplate(): string {
    const attr = this.attr;
    const parserAttr = {
      labelWidth: attr.labelWidthAuto ? `label-width="auto"` : `label-width="${attr.labelWidth}px"`,
      labelPosition: attr.labelPosition === LabelPosition.AUTO ? "" : `label-position="${attr.labelPosition}"`,
      size: attr.size === Size.AUTO ? "" : `size="${attr.size}"`,
      model: ":model='formData'",
    };
    return `<!-- create template end -->
            <el-form ref="formRef" ${Object.values(parserAttr).filter(Boolean).join(" ")}>
              ${this.children.map((v) => v.toTemplate()).join("\n")}
            </el-form>
            <!-- create template end -->
            <div class="text-center">
              <el-button type="primary" @click="onSubmit">提交</el-button>
              <el-button type="warning" @click="onReset">重置</el-button>
            </div>`;
  }

  toScript(): string {
    const importStr = this.getDeps()
      .map((v) => `import { ${v.import.join(", ")} } from "${v.from}";`)
      .join("\n");

    const formData = this.children
      .map((v) => ({
        key: v.child.basicAttr.bindField,
        value: v.child.basicAttr.defaultValue,
      }))
      .reduce((pre, cur) => ({ ...pre, [cur.key]: cur.value }), {});

    return `${importStr}
    
            const formData = ref(${JSON.stringify(formData, null, 2)});
            const formRef = ref<InstanceType<typeof ElForm> | null>(null)
            
            function onSubmit() {
              formRef.value?.validate((valid) => {
                if (valid) {
                  // TODO: 提交表单数据
                 }
              })
            }
        
            function onReset() {
              formRef.value?.resetFields();
            }
            `;
  }
}
