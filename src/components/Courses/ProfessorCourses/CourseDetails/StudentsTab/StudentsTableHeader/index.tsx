import { PropsWithChildren } from "react";

import { useAuth } from "@clerk/clerk-react";

import AddStudent from "@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab/StudentsTableHeader/AddStudent";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";

const StudentsTableHeader = ({ children }: PropsWithChildren) => {
  const { userId } = useAuth();

  const {
    courseDetails: { students, professorId },
  } = useCtx(CourseDetailsContext);

  const studentsTotal = students.length;

  return (
    <div className="flex items-end justify-start gap-6 md:flex-wrap md:gap-2">
      <p className="leading-none text-foreground-300 md:mr-auto md:self-center">
        Total {studentsTotal} student{studentsTotal > 1 && "s"}
      </p>

      <div className="ml-auto w-[240px] md:order-2 md:basis-full">{children}</div>
      <div className="empty:hidden md:order-1">{userId === professorId && <AddStudent />}</div>
    </div>
  );
};

export default StudentsTableHeader;
