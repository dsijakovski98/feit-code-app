import EditExamForm from "@/components/Exams/Forms/EditExamForm";
import CancelExam from "@/components/Exams/ProfessorExams/ExamDetails/ExamSettings/CancelExam";

import { EXAM_STATUS } from "@/constants/enums";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";

const ExamSettings = () => {
  const { userData } = useFCUser();
  const { examDetails } = useCtx(ExamDetailsContext);
  const { status, course } = examDetails;

  // Only exams that haven't started can be altered
  if (status !== EXAM_STATUS.new) {
    return null;
  }

  // Only the professor (creator) of the exam can alter it
  if (userData?.user.id !== course.professorId) {
    return null;
  }

  return (
    <section className="mx-auto !h-auto max-w-[85ch] space-y-14 pb-8 md:max-w-full">
      <div className="space-y-3">
        <h2 className="text-xl font-semibold">Edit Exam</h2>

        <div className="pl-4">
          <EditExamForm />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-xl font-semibold text-danger">Danger Zone</h2>

        <div className="flex items-start justify-between gap-8 pl-4 lg:flex-col lg:gap-4">
          <div className="lg:space-y-1">
            <h3 className="text-lg font-semibold">Cancel Exam</h3>
            <p>You can be sure your students will love this.</p>
          </div>

          <CancelExam />
        </div>
      </div>
    </section>
  );
};

export default ExamSettings;
