import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { colors } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";

import { type StudentExamsStats, useStudentExamsStats } from "@/hooks/student/useStudentExamsStats";

type Props = Parameters<typeof useStudentExamsStats>[0];

const StudentExamsStats = ({ studentId, selectedCourseId, courseIds }: Props) => {
  const { data, isPending } = useStudentExamsStats({ studentId, selectedCourseId, courseIds });

  if (isPending) {
    return (
      <div className="grid flex-1 place-items-center p-8">
        <Spinner size="lg" className="scale-[1.5]" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="grid flex-1 place-items-center p-8">
        <p className="text-lg text-foreground-300">No information available.</p>
      </div>
    );
  }

  const { stats, examKeys } = data;

  return (
    <ChartContainer
      config={{}}
      className="max-h-[420px] w-full"
      title="Bar chart showing the percentage points for each completed exam, grouped by course."
    >
      <BarChart accessibilityLayer data={stats} barGap={10}>
        <CartesianGrid vertical={false} opacity={0.1} />

        <XAxis
          dataKey="course"
          axisLine={false}
          tickMargin={10}
          className="[&_.recharts-cartesian-axis-tick_*]:fill-foreground-300 [&_.recharts-cartesian-axis-tick_*]:text-sm"
        />

        <YAxis
          type="number"
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => Math.round(Number(value)).toString() + "%"}
        />

        <ChartTooltip
          active
          cursor={false}
          content={
            <ChartTooltipContent
              className="[&_div:last-child]:gap-x-4"
              formatter={(value, name, item) => {
                const stat = item.payload as StudentExamsStats[number];
                const examLabel = stat.exams[name as keyof typeof stat.exams];

                return (
                  <div className="flex w-full items-center justify-between">
                    <p className="flex items-center gap-1.5">
                      <span className="block h-3 w-3 rounded-sm bg-primary-400" /> {examLabel}
                    </p>
                    <p className="font-semibold">{value}%</p>
                  </div>
                );
              }}
            />
          }
        />

        <defs>
          <linearGradient id="fillPercentage" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.dark.primary[400]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.dark.primary[100]} stopOpacity={0.1} />
          </linearGradient>
        </defs>

        {examKeys.map((dataKey, idx) => (
          <Bar
            key={`exam-${idx + 1}`}
            dataKey={dataKey}
            radius={6}
            strokeWidth={2}
            fillOpacity={0.4}
            fill="url(#fillPercentage)"
            stroke={colors.dark.primary[300]}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
};

export default StudentExamsStats;
