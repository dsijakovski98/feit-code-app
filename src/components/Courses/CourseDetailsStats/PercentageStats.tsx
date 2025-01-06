import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { colors } from "@nextui-org/react";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";

import { CourseDetailsStats } from "@/types/exams";

const chartConfig = {
  percentage: { label: "Percentage", color: colors.dark.primary[400] },
} satisfies ChartConfig;

type Props = {
  stats: CourseDetailsStats;
  height?: number;
  avg?: boolean;
};

const PercentageStats = ({ stats, height, avg = false }: Props) => {
  return (
    <ChartContainer
      config={chartConfig}
      // @ts-expect-error Custom style property
      style={{ "--height": `${height || 400}px` }}
      className="max-h-[var(--height)] w-full"
      title="Area chart showing the percentage points for each completed exam."
    >
      <AreaChart accessibilityLayer data={stats}>
        <CartesianGrid vertical={false} opacity={0.1} />

        <XAxis dataKey="exam" tickLine={false} axisLine={false} tickMargin={8} />

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
                      <span className="block h-3 w-3 rounded-sm bg-primary" /> {avg && "Average"} Percentage
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
