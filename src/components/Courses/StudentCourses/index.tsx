import { Suspense, lazy, useMemo, useState } from "react";

import { ButtonGroup } from "@nextui-org/button";

import Button from "@/components/ui/Button";

import { FCUser } from "@/hooks/useFCUser";

const ActiveCoursesList = lazy(
  () => import("@/components/Courses/StudentCourses/ActiveCoursesList"),
);
const StudentCoursesList = lazy(
  () => import("@/components/Courses/StudentCourses/StudentCoursesList"),
);

type Props = {
  user: NonNullable<FCUser>["user"];
};

const StudentCourses = ({ user }: Props) => {
  const [coursesFilter, setCoursesFilter] = useState<"own" | "all">("own");

  const coursesTitle = useMemo(
    () => (coursesFilter === "own" ? "My Courses" : "All Courses"),
    [coursesFilter],
  );

  return (
    <div className="grid h-full grid-cols-1 grid-rows-[auto_auto_1fr] gap-8 bg-content2 py-4 dark:bg-primary-50/70 lg:gap-4 lg:!bg-transparent">
      <section className="space-y-4">
        <div className="flex items-end justify-between px-8 lg:px-5">
          <h2 className="text-lg font-bold uppercase text-foreground/90">{coursesTitle}</h2>

          <ButtonGroup size="sm" className="*:text-sm">
            <Button
              color={coursesFilter === "own" ? "primary" : "default"}
              onPress={() => setCoursesFilter("own")}
            >
              My Courses
            </Button>

            <Button
              color={coursesFilter === "all" ? "primary" : "default"}
              onPress={() => setCoursesFilter("all")}
            >
              All Courses
            </Button>
          </ButtonGroup>
        </div>

        <Suspense fallback={null}>
          {coursesFilter === "own" && <StudentCoursesList studentId={user.id} />}
          {coursesFilter === "all" && <ActiveCoursesList />}
        </Suspense>
      </section>

      {/* TODO: Some charts and stats here */}
    </div>
  );
};

export default StudentCourses;
