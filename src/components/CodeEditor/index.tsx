import { ComponentProps, ElementRef, forwardRef, useMemo } from "react";

import { quietlight as lightTheme } from "@uiw/codemirror-theme-quietlight";
import { tokyoNight as darkTheme } from "@uiw/codemirror-theme-tokyo-night";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { ProgrammingLanguage } from "@/constants/enums";

type Props = { language: ProgrammingLanguage } & ComponentProps<typeof CodeMirror>;

const CodeEditor = forwardRef<ElementRef<typeof CodeMirror>, Props>(({ language, ...rest }, ref) => {
  const { theme } = useTheme();

  const langExtension = useMemo(() => LANGUAGES_CONFIG[language].extension || null, [language]);
  const editorTheme = useMemo(() => (theme === "dark" ? darkTheme : lightTheme), [theme]);

  return (
    <CodeMirror
      {...rest}
      ref={ref}
      spellCheck
      theme={editorTheme}
      extensions={langExtension ? [langExtension, ...(rest.extensions || [])] : rest.extensions}
    />
  );
});

export default CodeEditor;
