import { useState } from "react";
import { Link } from "react-router-dom";

import { ButtonGroup, Spinner } from "@nextui-org/react";

import CoursesList from "@/components/Courses/CoursesList";
import CourseCard from "@/components/Courses/ProfessorCourses/CourseCard";
import Button from "@/components/ui/Button";
import FloatButton from "@/components/ui/FloatButton";
import Icon from "@/components/ui/Icon";

import { useProfessorCourses } from "@/hooks/professor/useProfessorCourses";
import { FCUser } from "@/hooks/useFCUser";

type Props = {
  user: NonNullable<FCUser>["user"];
};

const ProfessorCourses = ({ user }: Props) => {
  const [courseYearFilter, setCourseYearFilter] = useState<"all" | "current">("current");

  const coursesQuery = useProfessorCourses(user.id, courseYearFilter);
  const { data } = coursesQuery;

  return (
    <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr] bg-content2 py-4 dark:bg-primary-50/70 lg:!bg-transparent">
      <section>
        <div className="flex items-end justify-between px-8 lg:px-5">
          <h2 className="text-lg font-bold uppercase text-foreground/90">
            {user.firstName}'s Courses
          </h2>

          <ButtonGroup size="sm" className="*:text-sm">
            <Button
              color={courseYearFilter === "all" ? "primary" : "default"}
              onPress={() => setCourseYearFilter("all")}
            >
              All courses
            </Button>
            <Button
              color={courseYearFilter === "current" ? "primary" : "default"}
              onPress={() => setCourseYearFilter("current")}
            >
              This year
            </Button>
          </ButtonGroup>
        </div>

        {!data && (
          <div className="w-full py-8 text-center">
            <Spinner size="lg" />
          </div>
        )}

        {data?.pages.length === 0 && (
          <div className="grid place-items-center gap-4 p-8 text-center">
            <p className="font-semibold text-foreground-200">
              You are not teaching any courses yet. Let's change that.
            </p>

            <Button
              as={Link}
              // @ts-expect-error NextUI not passing through 'as' props
              to="new"
              color="primary"
              startContent={<Icon name="add" className="h-5 w-5" />}
            >
              New Course
            </Button>
          </div>
        )}

        {!!data?.pages.length && (
          <div className="mt-2 overflow-x-clip">
            <CoursesList
              coursesQuery={coursesQuery}
              renderCourse={(course) => <CourseCard course={course} />}
            />
          </div>
        )}
      </section>

      {!!data?.pages.length && (
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
