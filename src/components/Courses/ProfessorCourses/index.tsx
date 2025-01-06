import { useState } from "react";

import CoursesHeader from "@/components/Courses/Misc/CoursesHeader";
import ProfessorCoursesList from "@/components/Courses/ProfessorCourses/ProfessorCoursesList";
import ProfessorCoursesStats from "@/components/Courses/ProfessorCourses/ProfessorCoursesStats";
import SwitchFilter from "@/components/ui/Filters/SwitchFilter";

import { FCProfessor } from "@/hooks/useFCUser";
import { useFilter } from "@/hooks/useFilter";

type Props = {
  user: FCProfessor;
};

const ProfessorCourses = ({ user }: Props) => {
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

  return (
    <div className="bg-main grid h-full grid-cols-1 grid-rows-[auto_1fr] py-4">
      <section className="space-y-2">
        <CoursesHeader title={`${user.firstName}'s Courses`} searchFilter={searchFilter}>
          <SwitchFilter filter={courseYearFilter} />
        </CoursesHeader>

        <ProfessorCoursesList user={user} search={search} courseYear={courseYearFilter.value} />
      </section>

      <ProfessorCoursesStats professorId={user.id} />
    </div>
  );
};

export default ProfessorCourses;
