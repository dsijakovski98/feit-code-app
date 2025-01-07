import { useMemo } from "react";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { colors } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";
import TooltipLabel from "@/components/ui/shadcn/tooltip-label";

import { type ExamsStats } from "@/types/stats";

type Props = {
  stats?: ExamsStats | null;
  courseIds: string[];

  isLoading?: boolean;
};

const ExamsStats = ({ stats, courseIds, isLoading = false }: Props) => {
  const targetStats = useMemo(
    () => (stats ? stats.filter((stat) => courseIds.includes(stat.courseId)) : null),
    [stats, courseIds],
  );

  const examKeys = useMemo(
    () => [
      ...new Set(
        targetStats?.flatMap((stat) =>
          Object.keys(stat).filter((key) => !["course", "exams", "courseId"].includes(key)),
        ),
      ),
    ],
    [targetStats],
  );

  if (isLoading) {
    return (
      <div className="grid flex-1 place-items-center p-8">
        <Spinner size="lg" className="scale-[1.5]" />
      </div>
    );
  }

  if (!targetStats || targetStats.length === 0) {
    return (
      <div className="grid flex-1 place-items-center p-8">
        <p className="text-foreground-300">No information available.</p>
      </div>
    );
  }

  return (
    <ChartContainer
      config={{}}
      className="max-h-[420px] w-full"
      title="Bar chart showing the percentage points for each completed exam, grouped by course."
    >
      <BarChart accessibilityLayer data={targetStats} barGap={10} maxBarSize={160}>
        <CartesianGrid vertical={false} opacity={0.1} />

        <XAxis dataKey="course" axisLine={false} tickMargin={10} />

        <YAxis
          type="number"
          domain={[0, 100]}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => Math.round(Number(value)).toString() + "%"}
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(label) => <TooltipLabel>{label}</TooltipLabel>}
              formatter={(value, name, item) => {
                const stat = item.payload as ExamsStats[number];
                const exam = stat.exams[name as keyof typeof stat.exams];

                return (
                  <div className="mb-1.5 flex w-full items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1 self-stretch rounded-sm bg-primary-400" />
                      <div>
                        <p className="text-sm font-medium">{exam.name}</p>
                        <p>{exam.startsAt}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold">{value}%</p>
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

export default ExamsStats;
