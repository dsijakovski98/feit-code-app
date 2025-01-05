import { useMemo } from "react";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import { Spinner } from "@nextui-org/react";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useStudentCourseStats } from "@/hooks/student/useStudentCourseStats";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { simplePlural } from "@/utils";

const StudentCourseStats = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { userData } = useFCUser();

  const {
    data: stats,
    isPending,
    chartConfig,
  } = useStudentCourseStats({
    courseId: courseDetails.id,
    studentId: userData?.user.id ?? "",
  });

  const maxStats = useMemo(() => Math.max(...(stats?.map((stat) => stat.totalPoints) ?? [])), [stats]);

  if (!userData) return null;

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold">Exams statistics</h2>
        <p>
          Latest {stats && stats.length > 1 && stats.length} {simplePlural("exam", stats?.length ?? 0)}{" "}
          success rate
        </p>
      </div>

      {isPending && (
        <div className="grid h-[200px] place-items-center">
          <Spinner size="lg" className="scale-[1.5]" />
        </div>
      )}

      {stats && (
        <ChartContainer
          config={chartConfig}
          className="max-h-[360px] w-full"
          title="Vertical stacked bar chart showing the success rate of each completed exam."
        >
          <BarChart accessibilityLayer data={stats} maxBarSize={160}>
            <XAxis
              dataKey="exam"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              className="[&_.recharts-cartesian-axis-tick_*]:fill-foreground-300 [&_.recharts-cartesian-axis-tick_*]:text-sm"
            />

            <YAxis
              type="number"
              allowDataOverflow
              domain={[0, maxStats]}
              tickFormatter={(value) => Math.round(Number(value)).toString()}
            />

            <Bar
              dataKey="points"
              stackId={courseDetails.id}
              radius={[0, 0, 8, 8]}
              fill={chartConfig.points.color}
            />

            <Bar
              dataKey="totalPoints"
              stackId={courseDetails.id}
              radius={[8, 8, 0, 0]}
              fill={chartConfig.totalPoints.color}
            />

            <ChartTooltip cursor={false} defaultIndex={1} content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
};

export default StudentCourseStats;
