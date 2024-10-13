import { Suspense, lazy } from "react";

import ExamGeneral from "@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/ExamGeneral";
import ExamTaskList from "@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/TaskList";

import { EXAM_STATUS } from "@/constants/enums";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";

import "./style.css";

const CompletedDetails = lazy(
  () => import("@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/Details/CompletedDetails"),
);
const OngoingDetails = lazy(
  () => import("@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/Details/OngoingDetails"),
);
const UpcomingDetails = lazy(
  () => import("@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/Details/UpcomingDetails"),
);

const GeneralTab = () => {
  const {
    examDetails: { status },
  } = useCtx(ExamDetailsContext);

  return (
    <section className="exam-general lg:block lg:space-y-4 lg:pb-12">
      <div className="[grid-area:general]">
        <ExamGeneral />
      </div>

      <div className="[grid-area:details]">
        <Suspense fallback={null}>
          {status === EXAM_STATUS.new && <UpcomingDetails />}
          {status === EXAM_STATUS.ongoing && <OngoingDetails />}
          {status === EXAM_STATUS.completed && <CompletedDetails />}
        </Suspense>
      </div>

      <div className="[grid-area:tasks]">
        <ExamTaskList />
      </div>
    </section>
  );
};

export default GeneralTab;
