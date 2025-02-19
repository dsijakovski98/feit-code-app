import { useMemo } from "react";

import EditExamForm from "@/components/Exams/Forms/EditExamForm";
import CancelExam from "@/components/Exams/ProfessorExams/ExamDetails/SettingsTab/CancelExam";

import { EXAM_STATUS } from "@/constants/enums";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";

const SettingsTab = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { status } = examDetails;

  const editDisabledMessage = useMemo(() => {
    if (status === EXAM_STATUS.completed) {
      return "Cannot edit an exam after it has already taken place.";
    }

    return null;
  }, [status]);

  const cancelLabel = useMemo(() => {
    if (status === EXAM_STATUS.new) return "Cancel";

    if (status === EXAM_STATUS.completed) return "Delete";

    return "";
  }, [status]);

  return (
    <section className="mx-auto !h-auto max-w-[85ch] space-y-14 pb-8 md:max-w-full">
      <div className="space-y-4">
        <h2 className="w-fit rounded-lg bg-default px-2 py-0.5 text-lg font-semibold text-default-foreground">
          Edit Exam
        </h2>

        <div className="px-4">
          {editDisabledMessage ? (
            <p className="text-lg text-foreground-300">{editDisabledMessage}</p>
          ) : (
            <EditExamForm />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="w-fit rounded-lg bg-danger px-2 py-0.5 text-lg font-semibold text-danger-foreground">
          Danger Zone
        </h2>

        <div className="flex items-start justify-between gap-8 px-4 lg:flex-col lg:gap-4">
          <div className="lg:space-y-1">
            <h3 className="text-lg font-semibold">{cancelLabel} Exam</h3>
            <p>You can be sure your students will love this.</p>
          </div>

          <CancelExam label={cancelLabel} />
        </div>
      </div>
    </section>
  );
};

export default SettingsTab;
