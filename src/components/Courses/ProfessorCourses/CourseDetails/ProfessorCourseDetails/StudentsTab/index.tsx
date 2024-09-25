import { Fragment, useMemo, useState } from "react";

import { useAuth } from "@clerk/clerk-react";
import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import StudentDetails from "@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/StudentsTab/StudentActions/StudentDetails";
import StudentCellsMux from "@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/StudentsTab/StudentCellsMux";
import StudentsTableHeader from "@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/StudentsTab/StudentsTableHeader";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";

import { STUDENT_COLUMNS_LG, STUDENT_COLUMNS_SM } from "@/constants/students";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import StudentProvider from "@/context/StudentContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { Column, ColumnKey } from "@/types";

const StudentsTab = () => {
  const { userId } = useAuth();

  const { isMobile, isMobileSm } = useCtx(ResponsiveContext);
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { students, name, professorId } = courseDetails;

  const detailsDialog = useToggle();
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[number] | null>(null);

  const [search, setSearch] = useState("");

  const handleSelect = (key: Selection) => {
    const [studentId] = [...new Set(key)];

    const student = students.find((student) => student.studentId === studentId);
    if (!student) return;

    setSelectedStudent(student);
    detailsDialog.toggleOn();
  };

  const alphaStudents = useMemo(() => {
    const sortedStudents = students.sort((stA, stB) => {
      const nameA = `${stA.student.firstName} ${stA.student.lastName}`;
      const nameB = `${stB.student.firstName} ${stB.student.lastName}`;

      return nameA.localeCompare(nameB);
    });

    return sortedStudents.filter(({ student }) =>
      `${student.firstName} ${student.lastName}`.toLowerCase().startsWith(search.toLowerCase()),
    );
  }, [students, search]);

  const columns = useMemo(() => {
    const cols = (isMobile ? STUDENT_COLUMNS_SM : STUDENT_COLUMNS_LG) as unknown as Column[];

    // Remove 'Actions' column for TAs
    if (userId !== professorId) return cols.slice(0, -1);

    return cols;
  }, [isMobile, userId, professorId]);

  return (
    <Fragment>
      <Table
        removeWrapper
        isHeaderSticky
        selectedKeys={new Set(selectedStudent ? [selectedStudent.studentId] : [])}
        selectionMode={isMobileSm ? "none" : "single"}
        onSelectionChange={handleSelect}
        topContent={
          <StudentsTableHeader>
            <Input
              variant="bordered"
              placeholder="Search by name..."
              startContent={<Icon name="search" className="h-5 w-5" />}
              value={search}
              onValueChange={setSearch}
            />
          </StudentsTableHeader>
        }
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
        <TableBody items={alphaStudents} emptyContent="No students to display.">
          {(item) => (
            <TableRow key={item.studentId} className="cursor-pointer lg:cursor-default">
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

      {selectedStudent && (
        <StudentDetails
          dialog={detailsDialog}
          student={selectedStudent.student}
          joinedAt={selectedStudent.joinedAt}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </Fragment>
  );
};

export default StudentsTab;
