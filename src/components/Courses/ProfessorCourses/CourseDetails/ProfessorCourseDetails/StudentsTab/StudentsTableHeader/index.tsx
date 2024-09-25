import { useAuth } from "@clerk/clerk-react";

import AddStudent from "@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/StudentsTab/StudentsTableHeader/AddStudent";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";

const StudentsTableHeader = () => {
  const { userId } = useAuth();

  const {
    courseDetails: { students, professorId },
  } = useCtx(CourseDetailsContext);

  const studentsTotal = students.length;

  return (
    <div className="flex items-end justify-between gap-6">
      <p className="leading-none text-foreground-300 lg:font-semibold">
        Total {studentsTotal} student{studentsTotal > 1 && "s"}
      </p>

      {userId === professorId && <AddStudent />}
    </div>
  );
};

export default StudentsTableHeader;
