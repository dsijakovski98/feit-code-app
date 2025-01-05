import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { colors } from "@nextui-org/react";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";

import { StudentCourseStats } from "@/hooks/student/useStudentCourseStats";

const chartConfig = {
  percentage: { label: "Percentage", color: colors.dark.primary[400] },
} satisfies ChartConfig;

type Props = {
  stats: StudentCourseStats;
};

const PercentageStats = ({ stats }: Props) => {
  return (
    <ChartContainer
      config={chartConfig}
      className="max-h-[360px] w-full"
      title="Area chart showing the percentage points for each completed exam."
    >
      <AreaChart accessibilityLayer data={stats}>
        <CartesianGrid vertical={false} opacity={0.1} />

        <XAxis
          dataKey="exam"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
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
          cursor={false}
          content={
            <ChartTooltipContent
              className="[&_div:last-child]:gap-x-2"
              formatter={(value) => {
                return (
                  <div className="flex w-full items-center justify-between">
                    <p className="flex items-center gap-1.5">
                      <span className="block h-3 w-3 rounded-sm bg-primary" /> Percentage
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

        <Area
          dataKey="percentage"
          type="natural"
          fillOpacity={0.4}
          fill="url(#fillPercentage)"
          stroke={colors.dark.primary[300]}
          strokeWidth={2}
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
};

export default PercentageStats;
