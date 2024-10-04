import { ComponentProps, useMemo } from "react";

import { langs } from "@uiw/codemirror-extensions-langs";
import { quietlight as lightTheme } from "@uiw/codemirror-theme-quietlight";
import { tokyoNight as darkTheme } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";

import { ProgrammingLanguage } from "@/constants/enums";

type Props = { language: ProgrammingLanguage } & ComponentProps<typeof CodeMirror>;
const CodeEditor = ({ language, ...rest }: Props) => {
  const { theme } = useTheme();

  const _langExtension = useMemo(() => {
    // TODO: Return correct language extension
    return language;
  }, [language]);

  return (
    <CodeMirror
      {...rest}
      extensions={[langs.javascript()]}
      theme={theme === "dark" ? darkTheme : lightTheme}
    />
  );
};

export default CodeEditor;
