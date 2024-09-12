import prettier from "prettier";
import pluginEstree from "prettier/plugins/estree";
import pluginsHtml from "prettier/plugins/html";
import pluginsTs from "prettier/plugins/typescript";

/**
 * 格式化代码
 * @param code 代码字符串
 * @param lang 语言类型 默认typescript
 */
export async function prettierCode(code: string, lang = "typescript") {
  try {
    const plugins = [];
    if (lang === "html") {
      plugins.push(pluginsHtml);
    }
    if (lang === "typescript") {
      plugins.push(pluginsTs, pluginEstree);
    }
    // 参数1：代码字符串，参数2：格式化配置
    return await prettier.format(code, {
      parser: lang,
      printWidth: 120,
      semi: true,
      tabWidth: 2,
      plugins,
    });
  } catch (error) {
    console.log(error);
    // 如果格式化失败,返回源码
    return code;
  }
}
