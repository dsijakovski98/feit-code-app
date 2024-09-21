import { Fragment } from "react";

import { Spinner } from "@nextui-org/react";

import CoursesList from "@/components/Courses/CoursesList";

import { useStudentCourses } from "@/hooks/student/useStudentCourses";

type Props = {
  studentId: string;
};

const StudentCoursesList = ({ studentId }: Props) => {
  const coursesQuery = useStudentCourses(studentId);
  const { data, error, isLoading } = coursesQuery;

  return (
    <Fragment>
      {isLoading && (
        <div className="w-full py-8 text-center">
          <Spinner size="lg" />
        </div>
      )}

      {error && (
        <div className="w-full py-8 text-center font-semibold text-danger">
          Error: {error.message}
        </div>
      )}

      {data?.pages[0].length === 0 && (
        <div className="grid place-items-center p-8 text-center">
          <p className="font-semibold text-foreground-300">
            You are not enrolled in any courses yet. Find one below.
          </p>
        </div>
      )}

      {!!data?.pages[0].length && (
        <div className="mt-2 overflow-x-clip">
          {/* TODO: Student courses list */}
          <CoursesList
            coursesQuery={coursesQuery}
            renderCourse={({ course }) => <p>{course.name}</p>}
          />
        </div>
      )}
    </Fragment>
  );
};

export default StudentCoursesList;
