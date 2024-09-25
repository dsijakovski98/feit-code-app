import { useMemo } from "react";

import { useAuth } from "@clerk/clerk-react";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";

import StudentCellsMux from "@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/StudentsTab/StudentCellsMux";
import StudentsHeader from "@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/StudentsTab/StudentsTableHeader";

import { STUDENT_COLUMNS_LG, STUDENT_COLUMNS_SM } from "@/constants/students";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import StudentProvider from "@/context/StudentContext";
import { useCtx } from "@/hooks/useCtx";
import { Column, ColumnKey } from "@/types";

const StudentsTab = () => {
  const { userId } = useAuth();

  const { isMobile } = useCtx(ResponsiveContext);
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { students, name, professorId } = courseDetails;

  const alphaStudents = useMemo(
    () =>
      students.sort((stA, stB) => {
        const nameA = `${stA.student.firstName} ${stA.student.lastName}`;
        const nameB = `${stB.student.firstName} ${stB.student.lastName}`;

        return nameA.localeCompare(nameB);
      }),
    [students],
  );

  const columns = useMemo(() => {
    const cols = (isMobile ? STUDENT_COLUMNS_SM : STUDENT_COLUMNS_LG) as unknown as Column[];

    // Remove 'Actions' column for TAs
    if (userId !== professorId) return cols.slice(0, -1);

    return cols;
  }, [isMobile, userId, professorId]);

  return (
    <Table
      removeWrapper
      isHeaderSticky
      topContent={<StudentsHeader />}
      aria-label={`List of students enrolled to ${name}.`}
      classNames={{ td: "py-3" }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={column.key === "actions" ? "center" : "start"}
            className="text-xs font-bold uppercase text-foreground-300"
          >
            {column.label}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={alphaStudents}>
        {(item) => (
          <TableRow key={item.studentId}>
            {(columnKey) => (
              <TableCell align={columnKey === "actions" ? "center" : "left"}>
                <StudentProvider student={item.student} joinedAt={item.joinedAt}>
                  <StudentCellsMux
                    columnKey={
                      columnKey as unknown as
                        | ColumnKey<typeof STUDENT_COLUMNS_LG>
                        | ColumnKey<typeof STUDENT_COLUMNS_SM>
                    }
                  />
                </StudentProvider>
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default StudentsTab;
