import { Fragment } from "react";

import { Spinner } from "@nextui-org/spinner";

import CoursesList from "@/components/Courses/CoursesList";
import CourseCard from "@/components/Courses/StudentCourses/CourseCard";

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
        <div className="w-full py-8 text-center font-semibold text-danger">Error: {error.message}</div>
      )}

      {data?.pages[0].length === 0 && (
        <div className="grid place-items-center p-8 text-center">
          <p className="font-semibold text-foreground-300">
            You are not enrolled in any courses yet. Search "All Courses" and get started.
          </p>
        </div>
      )}

      {!!data?.pages[0].length && (
        <div className="overflow-x-clip">
          <CoursesList
            coursesQuery={coursesQuery}
            renderCourse={(courseData) => <CourseCard courseData={courseData} />}
          />
        </div>
      )}
    </Fragment>
  );
};

export default StudentCoursesList;
