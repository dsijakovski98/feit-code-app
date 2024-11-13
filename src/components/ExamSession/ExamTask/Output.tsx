import { useMemo } from "react";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";

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
    <div className="relative flex h-full flex-col justify-between pt-5 font-mono text-white">
      <div className="space-y-4">
        <div
          className={clsx("text-success", {
            "pointer-events-none opacity-90": isPending,
          })}
        >
          <span>
            {emailSlug}@{titleSlug}
          </span>

          <Icon
            name="right"
            className={clsx("ml-2 inline h-4 w-4 scale-110", { "animate-blink": isPending })}
          />
        </div>

        <PresenceBlock show={!!taskState.output}>
          <p>{taskState.output}</p>
        </PresenceBlock>
      </div>

      <ExamTaskActions runCode={runCode} loading={isPending} />
    </div>
  );
};

export default ExamTaskOutput;
