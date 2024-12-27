import toast from "react-hot-toast";
import Split from "react-split";

import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";

import ExamTaskActions from "@/components/ExamSession/ExamTask/Actions";
import ExamCodeEditor from "@/components/ExamSession/ExamTask/CodeEditor";
import ExamTaskDescription from "@/components/ui/ExamTask/Description";
import ExamTaskOutput from "@/components/ui/ExamTask/Output";

import { runTaskCode } from "@/actions/exam-session";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";

const ExamSession = () => {
  const { getToken } = useAuth();

  const { exam, tasksState, student } = useCtx(ExamSessionContext);
  const [tasks, setTasks] = tasksState;

  const { task: activeTask } = useCtx(ExamSessionTaskContext);
  const taskState = tasks[activeTask.id];

  const { mutate, isPending } = useMutation({
    mutationFn: runTaskCode,
    onSuccess: (output) => {
      if (!output) return;

      setTasks((prev) => {
        prev[activeTask.id].output = output;
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

    mutate({ code: taskState.code, name: activeTask.title, language: exam.language, token });

    setTasks((prev) => {
      prev[activeTask.id].output = "";
      return { ...prev };
    });
  };

  return (
    <main className="h-[calc(100dvh-105px)] overflow-hidden border-t-8 border-t-content4 bg-gradient-to-b from-transparent via-background/30 to-background/80 *:h-full dark:border-t-content2">
      <Split
        sizes={[65, 35]}
        minSize={[400, 400]}
        snapOffset={5}
        gutterSize={10}
        dragInterval={1}
        gutterAlign="center"
        direction="horizontal"
        cursor="col-resize"
        className="flex"
      >
        <div className="h-[calc(90dvh-5.5px)] *:h-full">
          <ExamCodeEditor />
        </div>

        <div className="*:h-full">
          <Split
            sizes={[40, 60]}
            snapOffset={5}
            gutterSize={10}
            dragInterval={1}
            gutterAlign="center"
            direction="vertical"
            cursor="row-resize"
          >
            <div className="max-h-full overflow-y-auto px-8 pb-5 pt-2">
              <ExamTaskDescription task={activeTask} />
            </div>

            <div className="max-h-full overflow-y-auto bg-slate-950 px-8">
              <ExamTaskOutput
                title={activeTask.title}
                output={taskState.output}
                studentEmail={student.email}
                language={exam.language}
                loading={isPending}
              >
                <ExamTaskActions runCode={runCode} loading={isPending} />
              </ExamTaskOutput>
            </div>
          </Split>
        </div>
      </Split>
    </main>
  );
};

export default ExamSession;
