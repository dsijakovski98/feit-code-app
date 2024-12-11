import { ClipboardEvent, useEffect } from "react";

import CodeEditor from "@/components/CodeEditor";

import { handlePasteDetect } from "@/actions/exam-session";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";

const ExamCodeEditor = () => {
  const { exam, sessionIdState, tasksState } = useCtx(ExamSessionContext);
  const { task, template } = useCtx(ExamSessionTaskContext);
  const [sessionId] = sessionIdState;
  const [tasks, setTasks] = tasksState;
  const taskState = tasks[task.id];

  const { id: examId } = exam;

  const handleChange = (value: string) => {
    setTasks((prev) => {
      prev[task.id].code = value;
      return { ...prev };
    });

    sessionStorage.setItem(task.id, value);
  };

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const newData = e.clipboardData.getData("text/plain").trim();

    if (newData.length > 0) {
      handlePasteDetect({ examId, sessionId });
    }
  };

  useEffect(() => {
    if (template) {
      setTasks((prev) => {
        if (prev[task.id].code) return prev;

        prev[task.id].code = template;
        return { ...prev };
      });
    }
  }, [template, setTasks, task.id]);

  return (
    <CodeEditor
      width="100%"
      height="100%"
      value={taskState.code}
      onChange={handleChange}
      onPaste={handlePaste}
      language={exam.language}
      className="bg-gradient-to-b from-background/70 to-background/20 text-base *:bg-transparent [&_.cm-content]:py-[1ch]"
    />
  );
};

export default ExamCodeEditor;
