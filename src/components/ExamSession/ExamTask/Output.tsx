import { useMemo } from "react";
import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";

import { useAuth } from "@clerk/clerk-react";

import ExamTaskActions from "@/components/ExamSession/ExamTask/Actions";
import Icon from "@/components/ui/Icon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { runTaskCode } from "@/actions/exam-session";
import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";

const ExamTaskOutput = () => {
  const { getToken } = useAuth();

  const { exam, student, tasksState } = useCtx(ExamSessionContext);
  const [tasks, setTasks] = tasksState;

  const { task } = useCtx(ExamSessionTaskContext);
  const taskState = tasks[task.id];

  const emailSlug = useMemo(() => student.email.split("@")[0], [student.email]);
  const titleSlug = useMemo(() => task.title.replace(/ /g, "_").toLowerCase(), [task.title]);
  const runCommand = useMemo(
    () => LANGUAGES_CONFIG[exam.language].commandExec(titleSlug),
    [exam.language, titleSlug],
  );

  const { mutate, isPending } = useMutation({
    mutationFn: runTaskCode,
    onSuccess: (output) => {
      if (!output) return;

      // TODO: Handle post-run code

      setTasks((prev) => {
        prev[task.id].output = output;
        return { ...prev };
      });
    },
    onError: (error) => toast.error(error.message),
  });

  const runCode = async () => {
    const token = await getToken();

    if (!token) {
      toast.error("Token not found!");
      return;
    }

    mutate({ code: taskState.code, name: task.title, language: exam.language, token });

    setTasks((prev) => {
      prev[task.id].output = "";
      return { ...prev };
    });
  };

  return (
    <div className="relative flex h-full flex-col justify-between pt-5 font-mono text-white">
      <div className="space-y-4">
        <div
          className={clsx("space-x-1.5 text-sm text-success", {
            "pointer-events-none opacity-90": isPending,
          })}
        >
          <span>
            {emailSlug}@{titleSlug}
          </span>

          <Icon name="right" className={clsx("inline h-4 w-4", { "animate-blink": isPending })} />

          {(isPending || !!taskState.output) && <span className="text-foreground">{runCommand}</span>}
        </div>

        <PresenceBlock show={!!taskState.output}>
          <div className="text-sm">
            <p className="text-success">Result</p>
            <p>{taskState.output}</p>
          </div>
        </PresenceBlock>
      </div>

      <ExamTaskActions runCode={runCode} loading={isPending} />
    </div>
  );
};

export default ExamTaskOutput;
