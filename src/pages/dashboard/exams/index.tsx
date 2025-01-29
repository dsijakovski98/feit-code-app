import { Fragment, Suspense, lazy } from "react";
import { Helmet } from "react-helmet";

import { Spinner } from "@heroui/spinner";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorExams = lazy(() => import("@/components/Exams/ProfessorExams"));
const StudentExams = lazy(() => import("@/components/Exams/StudentExams"));

const ExamsPage = () => {
  const { userData } = useFCUser();

  return (
    <Fragment>
      <Helmet>
        <title>FEIT Code | Exams</title>
        <meta name="description" content="Check out all of the exams that FEIT Code has to offer." />
      </Helmet>

      {!userData && (
        <div className="bg-main grid h-full place-items-center">
          <Spinner size="lg" className="scale-150" />
        </div>
      )}

      {userData && (
        <Suspense fallback={null}>
          {userData.type === USER_TYPE.student ? (
            <StudentExams user={userData.user} />
          ) : (
            <ProfessorExams user={userData.user} />
          )}
        </Suspense>
      )}
    </Fragment>
  );
};

export default ExamsPage;
