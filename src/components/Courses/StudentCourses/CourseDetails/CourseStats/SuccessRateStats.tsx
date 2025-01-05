import { useMemo } from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { colors } from "@nextui-org/react";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { StudentCourseStats } from "@/hooks/student/useStudentCourseStats";
import { useCtx } from "@/hooks/useCtx";

const chartConfig = {
  totalPoints: { label: "Total Points", color: colors.dark.primary[400] },
  points: { label: "Points", color: colors.dark.primary[600] },
} satisfies ChartConfig;

type Props = {
  stats: StudentCourseStats;
};

const SuccessRateStats = ({ stats }: Props) => {
  const { courseDetails } = useCtx(CourseDetailsContext);

  const maxStats = useMemo(() => Math.max(...(stats?.map((stat) => stat.totalPoints) ?? [])), [stats]);

  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[360px] w-full"
      title="Vertical stacked bar chart showing the success rate of each completed exam."
    >
      <BarChart accessibilityLayer data={stats} maxBarSize={160}>
        <CartesianGrid vertical={false} opacity={0.15} />

        <XAxis
          dataKey="exam"
          tickMargin={10}
          className="[&_.recharts-cartesian-axis-tick_*]:fill-foreground-300 [&_.recharts-cartesian-axis-tick_*]:text-sm"
        />

        <YAxis
          type="number"
          allowDataOverflow
          domain={[0, maxStats]}
          padding={{ bottom: 3 }}
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

        <ChartTooltip
          cursor={false}
          defaultIndex={1}
          content={<ChartTooltipContent className="[&_div:last-child]:gap-x-2" />}
        />
      </BarChart>
    </ChartContainer>
  );
};

export default SuccessRateStats;
