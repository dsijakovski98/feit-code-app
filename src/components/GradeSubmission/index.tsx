import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import Split from "react-split";

import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";

import CodeEditor from "@/components/CodeEditor";
import GradeActions from "@/components/GradeSubmission/GradeActions";
import GradeHeader from "@/components/GradeSubmission/GradeHeader";
import ExamTaskDescription from "@/components/ui/ExamTask/Description";
import ExamTaskOutput from "@/components/ui/ExamTask/Output";

import { runTaskCode } from "@/actions/exam-session";
import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCtx } from "@/hooks/useCtx";
import { FeedbackView } from "@/types/exams";

const GradeSubmission = () => {
  const { getToken } = useAuth();

  const { submission, setOutputs, activeTask, activeOutput } = useCtx(GradeSubmissionContext);
  const { exam, student } = submission;

  const [feedbackView, setFeedbackView] = useState<FeedbackView>("code");

  const { mutate, isPending } = useMutation({
    mutationFn: runTaskCode,
    onSuccess: (output) => {
      if (!output) return;

      setOutputs((prev) => {
        prev[activeTask.id] = output;
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

    mutate({ code: activeTask.code, name: activeTask.title, language: exam.language, token });

    setOutputs((prev) => {
      prev[activeTask.id] = "";
      return { ...prev };
    });
  };

  return (
    <Fragment>
      <main className="bg-main lg:invisible lg:hidden lg:p-5">
        <Split
          sizes={[65, 35]}
          minSize={[400, 400]}
          snapOffset={5}
          gutterSize={10}
          dragInterval={1}
          gutterAlign="center"
          direction="horizontal"
          cursor="col-resize"
          className="flex border-t-[1.5px] border-t-content3"
        >
          <div className="flex h-[calc(90.5dvh)] flex-col gap-2 bg-gradient-to-b from-background/70 to-background/20 [&_.cm-gutters]:bg-transparent">
            <GradeHeader feedbackView={feedbackView} setFeedbackView={setFeedbackView} />

            {feedbackView === "code" && (
              <CodeEditor
                readOnly
                editable={false}
                value={activeTask.code}
                language={exam.language}
                className="block h-full text-base *:bg-transparent [&_.cm-content]:py-[1ch]"
              />
            )}
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
                  output={activeOutput}
                  title={activeTask.title}
                  language={exam.language}
                  studentEmail={student.email}
                  loading={isPending}
                >
                  <GradeActions runCode={runCode} loading={isPending} />
                </ExamTaskOutput>
              </div>
            </Split>
          </div>
        </Split>
      </main>

      <main className="bg-main invisible hidden h-full place-items-center px-5 lg:visible lg:!grid">
        <h1 className="text-center font-sans text-lg font-semibold">
          For the best experience, please use the Desktop version. Sorry for the inconvenience.
        </h1>
      </main>
    </Fragment>
  );
};

export default GradeSubmission;
