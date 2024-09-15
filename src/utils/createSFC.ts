import { prettierCode } from "@/utils/prettierCode";

/**
 * 创建单文件组件字符串
 * @param template
 * @param script
 * @param style
 */
export async function createSFC(template: string, script: string, style: string): Promise<string> {
  return prettierCode(
    `
    <template>
      ${template}
    </template>

    <script lang="ts" setup>${await prettierCode(script, "typescript")}</script>

    <style scoped>
      ${style}
    </style>
  `,
    "html",
  );
}
