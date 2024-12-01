import { ComponentProps, Fragment, useMemo, useState } from "react";

import { useAuth } from "@clerk/clerk-react";
import { Pagination } from "@nextui-org/pagination";
import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

import StudentDetails from "@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab/StudentActions/StudentDetails";
import StudentCellsMux from "@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab/StudentCellsMux";
import StudentsTableHeader from "@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab/StudentsTableHeader";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";

import { STUDENT_COLUMNS } from "@/constants/students";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import StudentProvider from "@/context/StudentContext";
import { useCtx } from "@/hooks/useCtx";
import { ROWS_PER_PAGE } from "@/hooks/usePaginate";
import { useToggle } from "@/hooks/useToggle";
import { Column } from "@/types";

const StudentsTab = () => {
  const { userId } = useAuth();

  const { isMobile, isMobileSm } = useCtx(ResponsiveContext);
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { students, name, professorId } = courseDetails;

  const detailsDialog = useToggle();
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[number] | null>(null);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const pages = useMemo(() => Math.ceil(students.length / ROWS_PER_PAGE), [students.length]);

  const studentsList = useMemo(() => {
    // Sorting
    const sortedStudents = students.sort((stA, stB) => {
      const nameA = `${stA.student.firstName} ${stA.student.lastName}`;
      const nameB = `${stB.student.firstName} ${stB.student.lastName}`;

      return nameA.localeCompare(nameB);
    });

    // Pagination
    const start = (page - 1) * ROWS_PER_PAGE;
    const end = start + ROWS_PER_PAGE;

    const studentsSlice = sortedStudents.slice(start, end);

    // Other filtering
    return studentsSlice.filter(({ student }) =>
      `${student.firstName} ${student.lastName}`.match(new RegExp(search, "i")),
    );
  }, [students, search, page]);

  const columns = useMemo(() => {
    const cols = (isMobile ? STUDENT_COLUMNS.sm : STUDENT_COLUMNS.lg) as unknown as Column[];

    // Remove 'Actions' column for TAs
    if (userId !== professorId) return cols.slice(0, -1);

    return cols;
  }, [isMobile, userId, professorId]);

  const handleSelect = (key: Selection) => {
    const [studentId] = [...new Set(key)];

    const student = students.find((student) => student.studentId === studentId);
    if (!student) return;

    setSelectedStudent(student);
    detailsDialog.toggleOn();
  };

  return (
    <Fragment>
      <Table
        removeWrapper
        selectedKeys={new Set(selectedStudent ? [selectedStudent.studentId] : [])}
        selectionMode={isMobileSm ? "none" : "single"}
        onSelectionChange={handleSelect}
        topContent={
          <StudentsTableHeader>
            <Input
              fullWidth
              variant="bordered"
              placeholder="Search by name..."
              startContent={<Icon name="search" className="h-5 w-5" />}
              value={search}
              onValueChange={setSearch}
            />
          </StudentsTableHeader>
        }
        bottomContent={
          // TODO: Fix incoming https://github.com/nextui-org/nextui/pull/3346
          <Pagination
            showControls
            hidden={studentsList.length === 0}
            size="sm"
            radius="full"
            color="default"
            isDisabled={!!search}
            page={page}
            total={pages}
            variant="light"
            onChange={setPage}
            classNames={{
              cursor: "bg-foreground text-background",
              prev: "w-7 h-7 p-0.5 min-w-0",
              chevronNext: "w-7 h-7 p-0.5 min-w-0",
            }}
          />
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
        <TableBody items={studentsList} emptyContent="No students to display.">
          {(item) => (
            <TableRow key={item.studentId} className="cursor-pointer lg:cursor-default">
              {(columnKey) => (
                <TableCell align={columnKey === "actions" ? "center" : "left"}>
                  <StudentProvider student={item.student} joinedAt={item.joinedAt}>
                    <StudentCellsMux
                      columnKey={columnKey as ComponentProps<typeof StudentCellsMux>["columnKey"]}
                    />
                  </StudentProvider>
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <StudentDetails
        dialog={detailsDialog}
        student={selectedStudent?.student}
        joinedAt={selectedStudent?.joinedAt}
        onClose={() => setSelectedStudent(null)}
      />
    </Fragment>
  );
};

export default StudentsTab;
