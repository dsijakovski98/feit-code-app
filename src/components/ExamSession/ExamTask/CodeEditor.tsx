import { ClipboardEvent, Fragment, startTransition, useDeferredValue, useEffect } from "react";

import { CircularProgress } from "@heroui/react";
import clsx from "clsx";

import CodeEditor from "@/components/CodeEditor";

import { handlePasteDetect } from "@/actions/exam-session";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";

const ExamCodeEditor = () => {
  const { exam, sessionIdState, tasksState } = useCtx(ExamSessionContext);
  const [sessionId] = sessionIdState;
  const [tasks, setTasks] = tasksState;

  const { task, template } = useCtx(ExamSessionTaskContext);
  const taskState = tasks[task.id];

  const taskCode = useDeferredValue(taskState.code);

  const { id: examId } = exam;

  const handleChange = (value: string) => {
    startTransition(() => {
      setTasks((prev) => {
        prev[task.id].code = value;
        return { ...prev };
      });
    });

    const taskKey = `${sessionId}_${task.id}`;
    sessionStorage.setItem(taskKey, value);
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
    <Fragment>
      <CodeEditor
        width="100%"
        height="100%"
        value={taskCode}
        readOnly={!taskCode}
        onChange={handleChange}
        onPaste={handlePaste}
        language={exam.language}
        className={clsx(
          "bg-gradient-to-b from-background/70 to-background/20 text-base transition-colors *:bg-transparent [&_.cm-content]:py-[1ch]",
          {
            "bg-slate-300 dark:!bg-slate-800": !taskCode,
          },
        )}
      />

      {!taskCode && (
        <CircularProgress
          size="lg"
          className="absolute left-1/2 top-1/2 h-fit -translate-x-1/2 -translate-y-1/2"
        />
      )}
    </Fragment>
  );
};

export default ExamCodeEditor;
