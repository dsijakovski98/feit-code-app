import { Fragment, Suspense, lazy } from "react";

import { Spinner } from "@heroui/spinner";

import PageMeta from "@/layouts/PageMeta";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorCourses = lazy(() => import("@/components/Courses/ProfessorCourses"));
const StudentCourses = lazy(() => import("@/components/Courses/StudentCourses"));

const CoursesPage = () => {
  const { userData } = useFCUser();

  return (
    <Fragment>
      <PageMeta
        title="FEIT Code | Courses"
        description="Check out all of the courses that FEIT Code has to offer."
      />

      {!userData && (
        <div className="bg-main grid h-full place-items-center">
          <Spinner size="lg" className="scale-150" />
        </div>
      )}

      {userData && (
        <Suspense fallback={null}>
          {userData.type === USER_TYPE.student ? (
            <StudentCourses user={userData.user} />
          ) : (
            <ProfessorCourses user={userData.user} />
          )}
        </Suspense>
      )}
    </Fragment>
  );
};

export default CoursesPage;
