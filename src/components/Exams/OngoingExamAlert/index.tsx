import { Suspense, lazy } from "react";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorExamAlert = lazy(() => import("@/components/Exams/OngoingExamAlert/ProfessorAlert"));
const StudentExamAlert = lazy(() => import("@/components/Exams/OngoingExamAlert/StudentAlert"));

const OngoingExamAlert = () => {
  const { userData } = useFCUser();

  if (!userData) return null;

  return (
    <Suspense fallback={null}>
      {userData.type === USER_TYPE.student ? (
        <StudentExamAlert studentId={userData.user.id} />
      ) : (
        <ProfessorExamAlert professorId={userData.user.id} />
      )}
    </Suspense>
  );
};

export default OngoingExamAlert;
