import { useMemo } from "react";

import { Spinner } from "@nextui-org/react";

import ExamCard from "@/components/Exams/ExamCard";
import ExamsList from "@/components/Exams/ExamsList";
import EmptyExamsList from "@/components/Exams/Misc/EmptyExamsList";
import ExamHeader from "@/components/Exams/Misc/ExamHeader";
import SelectFilter from "@/components/ui/Filters/SelectFilter";

import { ALL_OPTION } from "@/constants";
import { EXAM_STATUS_OPTIONS } from "@/constants/exams";
import { useExams } from "@/hooks/exam/useExams";
import { useStudentCoursesList } from "@/hooks/student/useStudentCoursesList";
import { FCStudent } from "@/hooks/useFCUser";
import { Option, useFilter } from "@/hooks/useFilter";
import { USER_TYPE } from "@/types";

type Props = {
  user: FCStudent;
};

const StudentExams = ({ user }: Props) => {
  const { id } = user;

  const { data: courses, isLoading: coursesLoading } = useStudentCoursesList(id);
  const courseOptions = useMemo<Option[]>(
    () => courses?.map(({ name }) => ({ value: name, label: name })) ?? [],
    [courses],
  );

  const courseFilter = useFilter({
    name: "course",
    options: [ALL_OPTION, ...courseOptions],
    defaultValue: "all",
  });

  const statusFilter = useFilter({
    name: "status",
    options: [ALL_OPTION, ...EXAM_STATUS_OPTIONS],
    defaultValue: "all",
  });

  const selectedCourseId = useMemo(() => {
    if (!courses || courses?.length === 0) return "";

    if (courseFilter.value === "all") return courseFilter.value;

    const course = courses?.find((course) => course.name === courseFilter.value);

    return course?.id || "";
  }, [courseFilter.value, courses]);

  const examsQuery = useExams({
    userId: id,
    type: USER_TYPE.student,
    courseId: selectedCourseId,
    status: statusFilter.value,
  });

  const { data, isLoading } = examsQuery;

  return (
    <div className="bg-main grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-4 py-4">
      <section className="space-y-3">
        <ExamHeader title="Exams">
          <SelectFilter size="sm" label="Exam status" filter={statusFilter} className="w-[240px] lg:w-full" />

          <SelectFilter
            size="sm"
            label="Course"
            filter={courseFilter}
            isLoading={coursesLoading}
            className="w-[240px] lg:w-full"
          />
        </ExamHeader>

        {isLoading && (
          <div className="w-full py-8 text-center">
            <Spinner size="lg" />
          </div>
        )}

        {(data?.pages[0].length === 0 || courses?.length === 0) && (
          <EmptyExamsList status={statusFilter.value} course={courseFilter.value} />
        )}

        {!!data?.pages[0].length && (
          <section className="overflow-x-clip">
            <ExamsList examsQuery={examsQuery} renderExam={(exam) => <ExamCard exam={exam} />} />
          </section>
        )}
      </section>

      {/* TODO: Implement stats UI */}
      {!!data?.pages[0].length && (
        <section className="px-8">
          <h2 className="text-lg font-bold uppercase text-foreground/90">Stats</h2>
        </section>
      )}
    </div>
  );
};

export default StudentExams;
