import { useState } from "react";
import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/spinner";

import CourseCard from "@/components/Courses/CourseCard";
import CoursesList from "@/components/Courses/CoursesList";
import CoursesHeader from "@/components/Courses/Misc/CoursesHeader";
import EmptyAssistantCourses from "@/components/Courses/ProfessorCourses/EmptyCourses/EmptyAssistantCourses";
import EmptyProfessorCourses from "@/components/Courses/ProfessorCourses/EmptyCourses/EmptyProfessorCourses";
import SwitchFilter from "@/components/ui/Filters/SwitchFilter";
import FloatButton from "@/components/ui/FloatButton";

import CourseSearchProvider from "@/context/CourseSearch.Context";
import { useProfessorCourses } from "@/hooks/professor/useProfessorCourses";
import { FCProfessor } from "@/hooks/useFCUser";
import { useFilter } from "@/hooks/useFilter";
import { TEACHER_TYPE, USER_TYPE } from "@/types";

type Props = {
  user: FCProfessor;
};

const ProfessorCourses = ({ user }: Props) => {
  const { id, type } = user;

  const courseYearFilter = useFilter({
    name: "year",
    options: [
      { value: "current", label: "This Year" },
      { value: "all", label: "All Courses" },
    ] as const,
    defaultValue: "current",
  });

  const searchFilter = useState("");
  const [search] = searchFilter;

  const coursesQuery = useProfessorCourses({ userId: id, type }, courseYearFilter.value);
  const { data, isLoading } = coursesQuery;

  return (
    <div className="bg-main grid h-full grid-cols-1 grid-rows-[auto_1fr] py-4">
      <section className="space-y-2">
        <CoursesHeader title={`${user.firstName}'s Courses`} searchFilter={searchFilter}>
          <SwitchFilter filter={courseYearFilter} />
        </CoursesHeader>

        {isLoading && (
          <div className="w-full py-8 text-center">
            <Spinner size="lg" />
          </div>
        )}

        {data?.pages[0].length === 0 &&
          search.length === 0 &&
          (type === TEACHER_TYPE.professor ? <EmptyProfessorCourses /> : <EmptyAssistantCourses />)}

        {!!data?.pages.length && (
          <div className="overflow-x-clip">
            <CourseSearchProvider search={search}>
              <CoursesList
                coursesQuery={coursesQuery}
                renderCourse={(course) => <CourseCard course={course} mode={USER_TYPE.professor} />}
              />
            </CourseSearchProvider>
          </div>
        )}
      </section>

      {!!data?.pages[0].length && (
        <section className="px-8">
          <h2 className="text-lg font-bold uppercase text-foreground/90">Stats</h2>
        </section>
      )}

      {!!data?.pages[0].length && (
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
    </div>
  );
};

export default ProfessorCourses;
