import { ElementRef, Fragment, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import Split from "react-split";

import { useMutation } from "@tanstack/react-query";
import MarkdownEditor from "@uiw/react-markdown-editor";
import clsx from "clsx";
import { useTheme } from "next-themes";

import { useAuth } from "@clerk/clerk-react";

import CodeEditor from "@/components/CodeEditor";
import GradeActions from "@/components/GradeSubmission/GradeActions";
import GradeHeader from "@/components/GradeSubmission/GradeHeader";
import SubmitFeedback from "@/components/GradeSubmission/SubmitFeedback";
import ExamTaskDescription from "@/components/ui/ExamTask/Description";
import ExamTaskOutput from "@/components/ui/ExamTask/Output";

import { runTaskCode } from "@/actions/exam-session";
import { FEEDBACK_TOOLBAR_LEFT, FEEDBACK_TOOLBAR_RIGHT } from "@/constants/grades";
import CleanSubmissionCodeProvider from "@/context/CleanSubmissionCodeContext";
import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { FeedbackView } from "@/types/exams";
import { feedbackKey } from "@/utils";
import { prefillFeedback } from "@/utils/exams/results";

const GradeSubmission = () => {
  const { getToken } = useAuth();
  const { theme } = useTheme();

  const submitDialog = useToggle();

  const mainSplitRef = useRef<ElementRef<typeof Split>>(null);
  const [markdownWidth, setMarkdownWidth] = useState<number | null>(null);

  const updateMarkdownWidth = () => {
    if (!mainSplitRef.current) return;

    // @ts-expect-error Parent actually exists
    const parent = mainSplitRef.current.parent as HTMLDivElement;
    const splitElement = parent.firstChild as HTMLDivElement;
    setMarkdownWidth(splitElement.offsetWidth);
  };

  useEffect(() => {
    if (!mainSplitRef.current) return;

    updateMarkdownWidth();
  }, []);

  const { submission, setOutputs, activeTask, activeOutput } = useCtx(GradeSubmissionContext);
  const { exam, student } = submission;

  const feedbackPrefill = useMemo(
    () => prefillFeedback({ student, tasks: exam.tasks }),
    [student, exam.tasks],
  );
  const [feedbackView, setFeedbackView] = useState<FeedbackView>("code");
  const [feedback, setFeedback] = useState(
    localStorage.getItem(feedbackKey(submission.id)) ?? feedbackPrefill,
  );

  const onFeedbackChange = (newFeedback: string) => {
    setFeedback(newFeedback);
    localStorage.setItem(feedbackKey(submission.id), newFeedback);
  };

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
          ref={mainSplitRef}
          onDrag={updateMarkdownWidth}
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

            <div className="grid h-full [grid-template-areas:'stack'] *:!max-w-full *:[grid-area:stack]">
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
                className={clsx("h-full w-full transition-opacity duration-500", {
                  "pointer-events-none invisible opacity-0": feedbackView === "code",
                  "pointer-events-auto visible opacity-100": feedbackView === "feedback",
                })}
              >
                <MarkdownEditor
                  height="100%"
                  value={feedback}
                  onChange={onFeedbackChange}
                  toolbars={FEEDBACK_TOOLBAR_LEFT}
                  toolbarsMode={FEEDBACK_TOOLBAR_RIGHT}
                  theme={theme as "light" | "dark"}
                  style={markdownWidth ? { width: `${markdownWidth}px` } : {}}
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
                    loading={isPending}
                  >
                    <GradeActions runCode={runCode} loading={isPending} />
                  </ExamTaskOutput>
                </CleanSubmissionCodeProvider>
              </div>
            </Split>
          </div>
        </Split>
      </main>

      <SubmitFeedback dialog={submitDialog} feedback={feedback} />

      <main className="bg-main invisible hidden h-full place-items-center px-5 lg:visible lg:!grid">
        <h1 className="text-center font-sans text-lg font-semibold">
          For the best experience, please use the Desktop version. Sorry for the inconvenience.
        </h1>
      </main>
    </Fragment>
  );
};

export default GradeSubmission;
