import { useAuth } from "@clerk/clerk-react";
import { User } from "@nextui-org/react";

import StudentActions from "@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab/StudentActions";
import StudentCell from "@/components/ui/Table/Cells/StudentCell";

import { STUDENT_COLUMNS } from "@/constants/students";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { StudentContext } from "@/context/StudentContext";
import { useAvatar } from "@/hooks/useAvatar";
import { useCtx } from "@/hooks/useCtx";
import { ColumnKey } from "@/types";
import { getDaytime } from "@/utils";

type Props = {
  columnKey: ColumnKey<(typeof STUDENT_COLUMNS)["lg"]> | ColumnKey<(typeof STUDENT_COLUMNS)["sm"]>;
};

const StudentCellsMux = ({ columnKey }: Props) => {
  const { userId } = useAuth();

  const { courseDetails } = useCtx(CourseDetailsContext);
  const { professorId } = courseDetails;

  const { student, joinedAt } = useCtx(StudentContext);
  const { firstName, lastName, email, indexNumber, indexYear, id, major } = student;

  const [studentAvatar, isLoading] = useAvatar(id);

  if (columnKey === "student") {
    return (
      <StudentCell student={{ firstName, lastName, email }} avatar={{ url: studentAvatar, isLoading }} />
    );
  }

  if (columnKey === "index") {
    return (
      <p className="text-base font-semibold">
        {indexNumber}/{indexYear}
      </p>
    );
  }

  if (columnKey === "major") {
    return <p className="text-base">{major}</p>;
  }

  if (columnKey === "joined") {
    return <p className="text-base">{getDaytime(new Date(joinedAt))}</p>;
  }

  if (columnKey === "info") {
    return (
      <User
        name={`${indexNumber}/${indexYear}`}
        description={major}
        avatarProps={{ className: "hidden" }}
        classNames={{
          name: "text-sm font-semibold",
          description: "text-xs sm:hidden",
        }}
      />
    );
  }

  if (columnKey === "actions") {
    if (!userId) return null;

    if (userId !== professorId) return null;
    return <StudentActions />;
  }

  throw new Error(`Unsupported columnKey value ${columnKey}`);
};

export default StudentCellsMux;
