import { useMemo } from "react";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import ExamTaskActions from "@/components/ExamSession/ExamTask/Actions";
import Icon from "@/components/ui/Icon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { runTaskCode } from "@/actions/exam-session";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";

const ExamTaskOutput = () => {
  const { exam, student, tasksState } = useCtx(ExamSessionContext);
  const [tasks, setTasks] = tasksState;

  const { task } = useCtx(ExamSessionTaskContext);
  const taskState = tasks[task.id];

  const emailSlug = useMemo(() => student.email.split("@")[0], [student.email]);
  const titleSlug = useMemo(() => task.title.replace(/ /g, "_").toLowerCase(), [task.title]);

  const { mutate, isPending } = useMutation({
    mutationFn: runTaskCode,
    onSuccess: (success) => {
      if (!success) return;

      // TODO: Handle post-run code
      setTasks((prev) => {
        prev[task.id].output = "Some output here";
        return { ...prev };
      });
    },
    onError: (error) => toast.error(error.message),
  });

  const runCode = () => {
    mutate({ code: taskState.code, name: task.title, language: exam.language });

    setTasks((prev) => {
      prev[task.id].output = "Running...";
      return { ...prev };
    });
  };

  return (
    <div className="group relative flex h-full flex-col justify-between pt-5 font-mono text-white">
      <div className="space-y-4">
        <p className="text-success">
          {emailSlug}@{titleSlug}
          <Icon
            name="right"
            className="group-hover:animate-blink group-focus-within:animate-blink ml-1 inline h-4 w-4"
          />
        </p>

        <PresenceBlock show={!!taskState.output}>
          <p>{taskState.output}</p>
        </PresenceBlock>
      </div>

      <ExamTaskActions runCode={runCode} loading={isPending} />
    </div>
  );
};

export default ExamTaskOutput;
