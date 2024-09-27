import { Fragment } from "react";

import { Spinner } from "@nextui-org/react";

import CourseCard from "@/components/Courses/CourseCard";
import CoursesList from "@/components/Courses/CoursesList";

import { useActiveCourses } from "@/hooks/course/useActiveCourses";
import { USER_TYPE } from "@/types";

const ActiveCoursesList = () => {
  const coursesQuery = useActiveCourses();
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
            You are not enrolled in any courses yet. Find one below.
          </p>
        </div>
      )}

      {!!data?.pages[0].length && (
        <div className="overflow-x-clip">
          <CoursesList
            coursesQuery={coursesQuery}
            renderCourse={(course) => <CourseCard course={course} mode={USER_TYPE.student} />}
          />
        </div>
      )}
    </Fragment>
  );
};

export default ActiveCoursesList;
