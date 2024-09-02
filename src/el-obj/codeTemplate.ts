import { format } from "prettier";
import prettierEstree from "prettier/plugins/estree";
import prettierHtmlPlugin from "prettier/plugins/html";
import prettierTsPlugin from "prettier/plugins/typescript";
import prettierVuePlugin from "prettier-plugin-vue";

type Options = {
  template?: string;
  script?: string;
  style?: string;
};

export async function generateTemplate(options: Options = {}) {
  const { template = "", script = "", style = "" } = options;
  const js = await format(script.trim(), { parser: "typescript", plugins: [prettierTsPlugin, prettierEstree] });
  const templateCode = `
        <template> ${template}</template>
        
        <script lang="ts" setup>${js}</script>
        
        <style scoped>${style}</style>
      `.trim();
  return format(templateCode, { parser: "vue", plugins: [prettierVuePlugin, prettierHtmlPlugin] });
}
