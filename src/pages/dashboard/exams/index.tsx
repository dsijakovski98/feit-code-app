import { Suspense, lazy } from "react";

import { Spinner } from "@nextui-org/react";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorExams = lazy(() => import("@/components/Exams/ProfessorExams"));
const StudentExams = lazy(() => import("@/components/Exams/StudentExams"));

const ExamsPage = () => {
  const { userData } = useFCUser();

  if (!userData) {
    return (
      <div className="bg-main grid h-full place-items-center">
        <Spinner size="lg" className="scale-150" />
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      {userData.type === USER_TYPE.student ? <StudentExams /> : <ProfessorExams user={userData.user} />}
    </Suspense>
  );
};

export default ExamsPage;
