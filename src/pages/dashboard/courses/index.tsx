import { Suspense, lazy } from "react";

import { Spinner } from "@nextui-org/react";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorCourses = lazy(() => import("@/components/Courses/ProfessorCourses"));
const StudentCourses = lazy(() => import("@/components/Courses/StudentCourses"));

const CoursesPage = () => {
  const { userData } = useFCUser();

  if (!userData) {
    return (
      <div className="grid h-full place-items-center bg-content2 dark:bg-default-100/50 lg:bg-primary">
        <Spinner size="lg" className="scale-150" />
      </div>
    );
  }

  return (
    <Suspense fallback={null}>
      {userData.type === USER_TYPE.student ? (
        <StudentCourses user={userData.user} />
      ) : (
        <ProfessorCourses user={userData.user} />
      )}
    </Suspense>
  );
};

export default CoursesPage;
