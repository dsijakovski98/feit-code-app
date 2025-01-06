import { Spinner } from "@nextui-org/spinner";

import PercentageStats from "@/components/Courses/CourseDetailsStats/PercentageStats";
import RateStats from "@/components/Courses/CourseDetailsStats/RateStats";
import SelectFilter from "@/components/ui/Filters/SelectFilter";

import { useFilter } from "@/hooks/useFilter";
import { type CourseDetailsStats } from "@/types/stats";

type Props = {
  stats?: CourseDetailsStats | null;

  height?: number;
  avg?: boolean;
  isLoading?: boolean;
};

const CourseDetailsStats = ({ stats, isLoading = false, ...rest }: Props) => {
  const statFilter = useFilter({
    name: "type",
    options: [
      { value: "percentage", label: "Percentage" },
      { value: "rate", label: "Rate" },
    ] as const,
    defaultValue: "percentage",
  });

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Exams statistics</h2>
          <p>Last 10 exams</p>
        </div>

        <SelectFilter size="sm" label="Chart Type" filter={statFilter} className="w-[240px] lg:w-full" />
      </div>

      {isLoading && (
        <div className="grid flex-1 place-items-center">
          <Spinner size="lg" className="scale-[1.5]" />
        </div>
      )}

      {stats === null && (
        <div className="grid flex-1 place-items-center p-8 text-center text-foreground-300">
          No information available yet.
        </div>
      )}

      {stats && statFilter.value === "rate" && <RateStats stats={stats} {...rest} />}
      {stats && statFilter.value === "percentage" && <PercentageStats stats={stats} {...rest} />}
    </div>
  );
};

export default CourseDetailsStats;
