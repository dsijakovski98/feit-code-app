import { Fragment, Suspense, lazy } from "react";
import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/spinner";

import CourseCard from "@/components/Courses/CourseCard";
import CoursesList from "@/components/Courses/CoursesList";
import FloatButton from "@/components/ui/FloatButton";

import CourseSearchProvider from "@/context/CourseSearch.Context";
import { useProfessorCourses } from "@/hooks/professor/useProfessorCourses";
import { FCProfessor } from "@/hooks/useFCUser";
import { TEACHER_TYPE, USER_TYPE } from "@/types";

const EmptyAssistantCourses = lazy(
  () => import("@/components/Courses/ProfessorCourses/EmptyCourses/EmptyAssistantCourses"),
);
const EmptyProfessorCourses = lazy(
  () => import("@/components/Courses/ProfessorCourses/EmptyCourses/EmptyProfessorCourses"),
);

type Props = {
  user: FCProfessor;
  search: string;
  courseYear: "all" | "current";
};

const ProfessorCoursesList = ({ user, search, courseYear }: Props) => {
  const { id, type } = user;

  const coursesQuery = useProfessorCourses({ userId: id, type }, courseYear);
  const { data: courses, isPending } = coursesQuery;

  const emptyCourses = courses?.pages[0].length === 0 && search.length === 0;

  return (
    <Fragment>
      {isPending && (
        <div className="w-full py-8 text-center">
          <Spinner size="lg" />
        </div>
      )}

      {emptyCourses ? (
        <Suspense fallback={null}>
          {type === TEACHER_TYPE.professor ? <EmptyProfessorCourses /> : <EmptyAssistantCourses />}
        </Suspense>
      ) : (
        <FloatButton
          as={Link}
          icon="add"
          // @ts-expect-error NextUI not passing through 'as' props
          to="new"
          containerClass="bottom-8 right-8 lg:bottom-20 lg:right-5"
        >
          New Course
        </FloatButton>
      )}

      {!!courses?.pages.length && (
        <div className="overflow-x-clip">
          <CourseSearchProvider search={search}>
            <CoursesList
              coursesQuery={coursesQuery}
              renderCourse={(course) => <CourseCard course={course} mode={USER_TYPE.professor} />}
            />
          </CourseSearchProvider>
        </div>
      )}
    </Fragment>
  );
};

export default ProfessorCoursesList;
