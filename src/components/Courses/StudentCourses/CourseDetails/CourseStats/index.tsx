import { Spinner } from "@nextui-org/spinner";

import PercentageStats from "@/components/Courses/StudentCourses/CourseDetails/CourseStats/PercentageStats";
import RateStats from "@/components/Courses/StudentCourses/CourseDetails/CourseStats/RateStats";
import SelectFilter from "@/components/ui/Filters/SelectFilter";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useStudentCourseStats } from "@/hooks/student/useStudentCourseStats";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { useFilter } from "@/hooks/useFilter";

const StudentCourseStats = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { userData } = useFCUser();

  const statFilter = useFilter({
    name: "type",
    options: [
      { value: "rate", label: "Rate" },
      { value: "percentage", label: "Percentage" },
    ] as const,
    defaultValue: "percentage",
  });

  const { data: stats, isPending } = useStudentCourseStats({
    courseId: courseDetails.id,
    studentId: userData?.user.id ?? "",
  });

  if (!userData) return null;

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Exams statistics</h2>
          <p>Last 10 exams</p>
        </div>

        <SelectFilter size="sm" label="Chart Type" filter={statFilter} className="w-[240px] lg:w-full" />
      </div>

      {isPending && (
        <div className="grid h-[200px] place-items-center">
          <Spinner size="lg" className="scale-[1.5]" />
        </div>
      )}

      {stats && statFilter.value === "rate" && <RateStats stats={stats} />}
      {stats && statFilter.value === "percentage" && <PercentageStats stats={stats} />}
    </div>
  );
};

export default StudentCourseStats;
