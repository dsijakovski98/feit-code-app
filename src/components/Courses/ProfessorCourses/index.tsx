import { Link } from "react-router-dom";

import { ButtonGroup, Spinner } from "@nextui-org/react";

import CourseCard from "@/components/Courses/CourseCard";
import CoursesList from "@/components/Courses/CoursesList";
import EmptyAssistantCourses from "@/components/Courses/ProfessorCourses/EmptyCourses/EmptyAssistantCourses";
import EmptyProfessorCourses from "@/components/Courses/ProfessorCourses/EmptyCourses/EmptyProfessorCourses";
import Button from "@/components/ui/Button";
import FloatButton from "@/components/ui/FloatButton";

import { useProfessorCourses } from "@/hooks/professor/useProfessorCourses";
import { FCProfessor } from "@/hooks/useFCUser";
import { useFilter } from "@/hooks/useFilter";
import { TEACHER_TYPE, USER_TYPE } from "@/types";

type Props = {
  user: FCProfessor;
};

const ProfessorCourses = ({ user }: Props) => {
  const { id, type } = user;
  const [courseYearFilter, setCourseYearFilter] = useFilter<"all" | "current">({
    name: "year",
    defaultValue: "current",
  });

  const coursesQuery = useProfessorCourses({ id, type }, courseYearFilter);
  const { data } = coursesQuery;

  return (
    <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr] bg-content1 py-4 dark:bg-default-100/50 lg:!bg-transparent">
      <section>
        <div className="flex items-end justify-between px-8 lg:px-5">
          <h2 className="text-lg font-bold uppercase text-foreground/90">{user.firstName}'s Courses</h2>

          {!!data?.pages[0].length && (
            <ButtonGroup size="sm" className="*:text-sm">
              <Button
                color={courseYearFilter === "current" ? "primary" : "default"}
                onPress={() => setCourseYearFilter("current")}
              >
                This year
              </Button>
              <Button
                color={courseYearFilter === "all" ? "primary" : "default"}
                onPress={() => setCourseYearFilter("all")}
              >
                All courses
              </Button>
            </ButtonGroup>
          )}
        </div>

        {!data && (
          <div className="w-full py-8 text-center">
            <Spinner size="lg" />
          </div>
        )}

        {data?.pages[0].length === 0 &&
          (type === TEACHER_TYPE.professor ? <EmptyProfessorCourses /> : <EmptyAssistantCourses />)}

        {!!data?.pages.length && (
          <div className="mt-2 overflow-x-clip">
            <CoursesList
              coursesQuery={coursesQuery}
              renderCourse={(course) => <CourseCard course={course} mode={USER_TYPE.professor} />}
            />
          </div>
        )}
      </section>

      {!!data?.pages[0].length && (
        <section className="px-8">
          <h2 className="text-lg font-bold uppercase text-foreground/90">Stats</h2>
        </section>
      )}

      {data?.pages.length && (
        <FloatButton
          as={Link}
          // @ts-expect-error NextUI not passing through 'as' props
          to="new"
          icon="add"
          containerClass="bottom-8 right-8 lg:bottom-20 lg:right-5"
        >
          New Course
        </FloatButton>
      )}
    </div>
  );
};

export default ProfessorCourses;
