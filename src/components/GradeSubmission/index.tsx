import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Split from "react-split";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import MarkdownEditor from "@uiw/react-markdown-editor";
import clsx from "clsx";
import { useTheme } from "next-themes";

import { useAuth } from "@clerk/clerk-react";

import CodeEditor from "@/components/CodeEditor";
import GradeActions from "@/components/GradeSubmission/GradeActions";
import GradeHeader from "@/components/GradeSubmission/GradeHeader";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ExamTaskDescription from "@/components/ui/ExamTask/Description";
import ExamTaskOutput from "@/components/ui/ExamTask/Output";

import { runTaskCode } from "@/actions/exam-session";
import { addFeedback } from "@/actions/grades";
import { FEEDBACK_TOOLBAR_LEFT, FEEDBACK_TOOLBAR_RIGHT } from "@/constants/grades";
import { ROUTES } from "@/constants/routes";
import CleanSubmissionCodeProvider from "@/context/CleanSubmissionCodeContext";
import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { FeedbackView } from "@/types/exams";

const GradeSubmission = () => {
  const { getToken } = useAuth();
  const { theme } = useTheme();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { submission, setOutputs, activeTask, activeOutput } = useCtx(GradeSubmissionContext);
  const { exam, student } = submission;

  const [feedbackView, setFeedbackView] = useState<FeedbackView>("code");
  const [feedback, setFeedback] = useState("");

  const submitDialog = useToggle();

  const { mutate: mutateFeedback, isPending: feedbackLoading } = useMutation({
    mutationFn: addFeedback,
    onSuccess: async (success) => {
      if (!success) return;

      await queryClient.invalidateQueries({ queryKey: [{ name: "exams", examId: exam.id }] });

      toast.success(`Submitted feedback for ${student.firstName}'s task!`);
      navigate(`${ROUTES.dashboard}${ROUTES.exams}/${exam.id}#results`);
    },
    onError: (error) => toast.error(error.message),
  });

  const submitFeedback = () => {
    mutateFeedback({ submissionId: submission.id, feedback });
  };

  const { mutate: mutateRunCode, isPending: runLoading } = useMutation({
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

    mutateRunCode({ code: activeTask.code, name: activeTask.title, language: exam.language, token });

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
            <GradeHeader
              feedbackView={feedbackView}
              setFeedbackView={setFeedbackView}
              onSubmit={submitDialog.toggleOn}
            />

            <div className="grid h-full [grid-template-areas:'stack'] *:[grid-area:stack]">
              <CodeEditor
                readOnly
                editable={false}
                value={activeTask.code}
                language={exam.language}
                className={clsx(
                  "h-full text-base transition-opacity duration-500 *:bg-transparent [&_.cm-content]:py-[1ch]",
                  {
                    "pointer-events-auto visible opacity-100": feedbackView === "code",
                    "pointer-events-none invisible opacity-0": feedbackView === "feedback",
                  },
                )}
              />

              <div
                className={clsx("h-full transition-opacity duration-500", {
                  "pointer-events-none invisible opacity-0": feedbackView === "code",
                  "pointer-events-auto visible opacity-100": feedbackView === "feedback",
                })}
              >
                <MarkdownEditor
                  height="100%"
                  value={feedback}
                  onChange={setFeedback}
                  toolbars={FEEDBACK_TOOLBAR_LEFT}
                  toolbarsMode={FEEDBACK_TOOLBAR_RIGHT}
                  theme={theme as "light" | "dark"}
                  className="h-full !bg-transparent text-base *:!bg-transparent [&_.cm-editor]:!bg-transparent [&_.md-editor-toolbar]:!px-8"
                />
              </div>
            </div>
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

              <div className="max-h-full overflow-y-auto bg-slate-950 px-8 *:h-full">
                <CleanSubmissionCodeProvider>
                  <ExamTaskOutput
                    output={activeOutput}
                    title={activeTask.title}
                    language={exam.language}
                    studentEmail={student.email}
                    loading={runLoading}
                  >
                    <GradeActions runCode={runCode} loading={runLoading} />
                  </ExamTaskOutput>
                </CleanSubmissionCodeProvider>
              </div>
            </Split>
          </div>
        </Split>
      </main>

      <ConfirmDialog
        dialog={submitDialog}
        loading={feedbackLoading}
        color="primary"
        title="Submit feedback?"
        description="You're happy with the feedback you left."
        action={{ label: "Submit", onConfirm: submitFeedback }}
      />

      <main className="bg-main invisible hidden h-full place-items-center px-5 lg:visible lg:!grid">
        <h1 className="text-center font-sans text-lg font-semibold">
          For the best experience, please use the Desktop version. Sorry for the inconvenience.
        </h1>
      </main>
    </Fragment>
  );
};

export default GradeSubmission;
