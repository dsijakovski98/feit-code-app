import { langs } from "@uiw/codemirror-extensions-langs";

import { InputValueType, VALUE_TYPE } from "@/constants/enums";
import { LanguageConfig } from "@/types";

const typeMap: Record<InputValueType, string> = {
  [VALUE_TYPE.string]: "string",
  [VALUE_TYPE.number]: "number",
  [VALUE_TYPE.boolean]: "boolean",
  [VALUE_TYPE.empty]: "null | undefined",
};

export const tsConfig: LanguageConfig = {
  comment: "//",
  funcPrefix: "function",
  emptyValue: "null",
  extension: langs.typescript(),
  supportsTests: true,
  parseIO: (test) => {
    const inputs = test.inputs.map((input) => `${input.name}: ${typeMap[input.type]}`);
    const output = typeMap[test.type];

    return { inputs, output };
  },
};
