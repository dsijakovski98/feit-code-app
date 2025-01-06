import { ComponentProps, ElementRef, forwardRef, useMemo } from "react";

import { tokyoNight as darkTheme } from "@uiw/codemirror-theme-tokyo-night";
import { vscodeLight as lightTheme } from "@uiw/codemirror-theme-vscode";
import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { useTheme } from "next-themes";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { ProgrammingLanguage } from "@/constants/enums";

type Props = { language: ProgrammingLanguage } & ComponentProps<typeof CodeMirror>;

const CodeEditor = forwardRef<ElementRef<typeof CodeMirror>, Props>(({ language, ...rest }, ref) => {
  const { theme } = useTheme();

  const langExtension = useMemo(() => LANGUAGES_CONFIG[language].extension || null, [language]);
  const extensions = useMemo(
    () => [langExtension, basicSetup({ tabSize: 4 }), ...(rest.extensions || [])],
    [langExtension, rest.extensions],
  );

  const editorTheme = useMemo(() => (theme === "dark" ? darkTheme : lightTheme), [theme]);

  return <CodeMirror {...rest} ref={ref} spellCheck theme={editorTheme} extensions={extensions} />;
});

export default CodeEditor;
