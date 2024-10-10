import { Suspense, lazy, useState } from "react";

import CoursesHeader from "@/components/Courses/Misc/CoursesHeader";
import SwitchFilter from "@/components/ui/SwitchFilter";

import CourseSearchProvider from "@/context/CourseSearch.Context";
import { FCUser } from "@/hooks/useFCUser";
import { useFilter } from "@/hooks/useFilter";

const ActiveCoursesList = lazy(
  () => import("@/components/Courses/StudentCourses/CourseLists/ActiveCoursesList"),
);
const StudentCoursesList = lazy(
  () => import("@/components/Courses/StudentCourses/CourseLists/StudentCoursesList"),
);

type Props = {
  user: NonNullable<FCUser>["user"];
};

const StudentCourses = ({ user }: Props) => {
  const courseFilter = useFilter({
    name: "q",
    options: [
      { value: "own", label: "My Courses" },
      { value: "all", label: "All Courses" },
    ] as const,
    defaultValue: "own",
  });

  const searchFilter = useState("");
  const [search] = searchFilter;

  return (
    <div className="bg-main grid h-full grid-cols-1 grid-rows-[auto_1fr] py-4">
      <section className="space-y-2">
        <CoursesHeader title="Courses" searchFilter={searchFilter}>
          <SwitchFilter filter={courseFilter} />
        </CoursesHeader>

        <CourseSearchProvider search={search}>
          <Suspense fallback={null}>
            {courseFilter.value === "own" && <StudentCoursesList studentId={user.id} />}
            {courseFilter.value === "all" && <ActiveCoursesList />}
          </Suspense>
        </CourseSearchProvider>
      </section>

      {/* TODO: Some charts and stats here */}
    </div>
  );
};

export default StudentCourses;
