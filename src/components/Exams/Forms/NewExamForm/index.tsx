import { useMemo } from "react";

import { Progress } from "@nextui-org/react";

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
    return 98.5;
  }, [step]);

  return (
    <div className="h-full">
      <div className="mb-14">
        <h2 className="text-2xl font-semibold">Create a new exam</h2>
        <p className="mb-3 text-foreground-300 lg:text-sm">
          Construct the perfect exam and test your students' skills the right way.
        </p>

        <Progress size="sm" value={progress} aria-label="Exam creation progress" />
      </div>

      <PresenceBlock show={step === "exam"}>
        <ExamForm />
      </PresenceBlock>

      <PresenceBlock show={step === "tasks"}>
        <ExamTasks />
      </PresenceBlock>

      {/* TODO: Add "tests" step */}

      <PresenceBlock show={step === "confirm"}>Confirm exam here</PresenceBlock>
    </div>
  );
};

export default NewExamForm;