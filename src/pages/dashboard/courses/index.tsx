import { Spinner } from "@nextui-org/react";

import ProfessorCourses from "@/components/Courses/ProfessorCourses";
import StudentCourses from "@/components/Courses/StudentCourses";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const CoursesPage = () => {
  const { userData } = useFCUser();

  if (!userData) {
    return (
      // TODO: Skeleton UI
      <div className="grid h-full place-items-center">
        <Spinner size="lg" className="scale-150" />
      </div>
    );
  }

  const { type, user } = userData;

  return type === USER_TYPE.student ? <StudentCourses /> : <ProfessorCourses user={user} />;
};

export default CoursesPage;
