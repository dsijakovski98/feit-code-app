import { useEffect, useMemo } from "react";

import { Progress } from "@nextui-org/react";

import ConfirmExam from "@/components/Exams/Forms/NewExamForm/ConfirmExam";
import ExamForm from "@/components/Exams/Forms/NewExamForm/ExamForm";
import ExamTasks from "@/components/Exams/Forms/NewExamForm/ExamTasks";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { ExamFormContext } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";

const NewExamForm = () => {
  const { stepState } = useCtx(ExamFormContext);
  const [step] = stepState;

  const progress = useMemo(() => {
    if (step === "exam") return 1.5;
    if (step === "tasks") return 50;
    if (step === "confirm") return 98.5;
    return 100;
  }, [step]);

  useEffect(() => {
    if (import.meta.env.DEV) return;

    window.onbeforeunload = () => {
      return "Are you sure?";
    };

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  return (
    <div className="h-full space-y-14">
      <div>
        <h2 className="text-2xl font-semibold">Create a new Exam</h2>
        <p className="mb-3 text-foreground-300 lg:text-sm">
          Construct the perfect exam and test your students' skills the right way.
        </p>

        <Progress size="sm" value={progress} aria-label="Exam creation progress" />
      </div>

      <div>
        <PresenceBlock show={step === "exam"}>
          <ExamForm />
        </PresenceBlock>

        <PresenceBlock show={step === "tasks"}>
          <ExamTasks />
        </PresenceBlock>

        <PresenceBlock show={step === "confirm" || step === "creating"}>
          <ConfirmExam />
        </PresenceBlock>
      </div>
    </div>
  );
};

export default NewExamForm;
