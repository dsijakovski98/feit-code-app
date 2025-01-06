import { useMemo } from "react";

import clsx from "clsx";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

import { Spinner, colors } from "@nextui-org/react";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";

import { useStudentCoursesStats } from "@/hooks/student/useStudentCoursesStats";

const chartConfig = {
  grade: { label: "Grade", color: colors.dark.primary[400] },
} satisfies ChartConfig;

type Props = {
  studentId: string;
};

const StudentCoursesStats = ({ studentId }: Props) => {
  const { data: stats, isPending } = useStudentCoursesStats(studentId);

  const avgGrade = useMemo(
    () => (stats ? (stats.reduce((acc, stat) => acc + stat.grade, 0) / stats.length).toPrecision(2) : null),
    [stats],
  );

  if (isPending) {
    return (
      <div className="grid flex-1 place-items-center">
        <Spinner size="lg" className="scale-[1.5]" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="grid flex-1 place-items-center">
        <p className="text-lg text-foreground-300">No information available.</p>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-3 px-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold uppercase text-foreground/90">Stats</h2>
          <p className="text-foreground-300">Average course grades</p>
        </div>

        <div className="text-end">
          <p className="font-sans text-4xl font-semibold">{avgGrade}</p>
          <p className="text-foreground-300">Average Grade</p>
        </div>
      </div>

      <ChartContainer
        config={chartConfig}
        className="max-h-[420px] w-full"
        title="Bar chart showing the course grades for each course."
      >
        <BarChart accessibilityLayer data={stats} maxBarSize={160}>
          <CartesianGrid vertical={false} opacity={0.15} />

          <XAxis dataKey="course" axisLine={false} tickMargin={10} />

          <YAxis
            type="number"
            tickLine={false}
            axisLine={false}
            domain={[5, 10]}
            ticks={[5, 6, 7, 8, 9, 10]}
            tickFormatter={(value) => Math.round(Number(value)).toString()}
          />

          <defs>
            <linearGradient id="fillPercentage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.dark.primary[400]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.dark.primary[100]} stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <Bar
            dataKey="grade"
            radius={6}
            strokeWidth={2}
            fillOpacity={0.4}
            fill="url(#fillPercentage)"
            stroke={colors.dark.primary[300]}
          >
            <LabelList
              position="center"
              className={clsx("fill-foreground font-mono text-lg", {
                "!text-base": stats.length > 10,
                "!text-sm": stats.length > 20,
              })}
            />
          </Bar>

          <ChartTooltip
            cursor={false}
            defaultIndex={1}
            content={
              <ChartTooltipContent color={chartConfig.grade.color} className="[&_div:last-child]:gap-x-2" />
            }
          />
        </BarChart>
      </ChartContainer>
    </section>
  );
};

export default StudentCoursesStats;
