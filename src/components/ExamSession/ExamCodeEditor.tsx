import { useEffect } from "react";

import CodeEditor from "@/components/CodeEditor";

import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";

const ExamCodeEditor = () => {
  const { exam, tasksCodeState } = useCtx(ExamSessionContext);
  const { task, template } = useCtx(ExamSessionTaskContext);
  const [tasksCode, setTasksCode] = tasksCodeState;

  const handleChange = (value: string) => {
    setTasksCode((prev) => ({ ...prev, [task.id]: value }));
    sessionStorage.setItem(task.id, value);
  };

  useEffect(() => {
    if (template) {
      setTasksCode((prev) => {
        if (prev[task.id]) return prev;

        return { ...prev, [task.id]: template };
      });
    }
  }, [template, setTasksCode, task.id]);

  return (
    <CodeEditor
      width="100%"
      height="100%"
      value={tasksCode[task.id]}
      onChange={handleChange}
      language={exam.language}
      className="bg-gradient-to-b from-background/70 to-background/20 text-base *:bg-transparent [&_.cm-content]:py-[1ch]"
    />
  );
};

export default ExamCodeEditor;
