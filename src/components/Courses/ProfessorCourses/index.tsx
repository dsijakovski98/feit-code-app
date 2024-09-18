import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

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
  const coursesQuery = useProfessorCourses(user.id);
  const { data } = coursesQuery;

  return (
    <div className="grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-8 bg-content2 py-6 dark:bg-primary-50/70 lg:!bg-transparent">
      <section>
        <div className="debug flex justify-between">
          <h2 className="pl-8 text-lg font-bold uppercase text-foreground/90">
            {user.firstName}'s Courses
          </h2>
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
          <h2 className="text-lg font-bold uppercase text-foreground-300/80">Stats</h2>
        </section>
      )}

      {data?.pages.length && (
        // @ts-expect-error NextUI not passing through 'as' props
        <FloatButton as={Link} to="new" icon="add">
          New Course
        </FloatButton>
      )}
    </div>
  );
};

export default ProfessorCourses;
