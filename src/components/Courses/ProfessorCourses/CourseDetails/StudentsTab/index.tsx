import { ComponentProps, Fragment, useDeferredValue, useMemo, useState } from "react";

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

import AddStudent from "@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab/StudentActions/AddStudent";
import StudentDetails from "@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab/StudentActions/StudentDetails";
import StudentCellsMux from "@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab/StudentCellsMux";
import TableHeading from "@/components/ui/Table/TableHeading";
import TablePagination from "@/components/ui/Table/TablePagination";
import TableSearch from "@/components/ui/Table/TableSearch";

import { STUDENT_COLUMNS } from "@/constants/students";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import StudentProvider from "@/context/StudentContext";
import { useCtx } from "@/hooks/useCtx";
import { usePaginate } from "@/hooks/usePaginate";
import { useToggle } from "@/hooks/useToggle";
import { Column } from "@/types";

const StudentsTab = () => {
  const { userId } = useAuth();

  const { isMobile, isMobileSm } = useCtx(ResponsiveContext);
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { students, name, professorId } = courseDetails;

  const detailsDialog = useToggle();
  const [selectedStudent, setSelectedStudent] = useState<(typeof students)[number] | null>(null);

  const selectedKeys = useMemo(
    () => new Set(selectedStudent ? [selectedStudent.studentId] : []),
    [selectedStudent],
  );

  const [search, setSearch] = useState("");
  const searchQuery = useDeferredValue(search);

  const pagination = usePaginate(students);
  const { items: studentItems } = pagination;

  const sortedStudents = useMemo(() => {
    return studentItems.toSorted((stA, stB) => {
      const nameA = `${stA.student.firstName} ${stA.student.lastName}`;
      const nameB = `${stB.student.firstName} ${stB.student.lastName}`;

      return nameA.localeCompare(nameB);
    });
  }, [studentItems]);

  const studentsList = useMemo(() => {
    return sortedStudents.filter(({ student }) =>
      `${student.firstName} ${student.lastName}`.match(new RegExp(searchQuery, "i")),
    );
  }, [sortedStudents, searchQuery]);

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
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelect}
        selectionMode={isMobileSm ? "none" : "single"}
        topContent={
          <TableHeading itemName="Student" totalItems={students.length} className="md:flex-wrap md:gap-2">
            <Fragment>
              <TableSearch
                search={search}
                onSearch={setSearch}
                className="ml-auto w-[240px] md:order-2 md:basis-full"
              />

              <div className="empty:hidden md:order-1">{userId === professorId && <AddStudent />}</div>
            </Fragment>
          </TableHeading>
        }
        bottomContent={<TablePagination {...pagination} items={studentsList} disabled={!!searchQuery} />}
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
