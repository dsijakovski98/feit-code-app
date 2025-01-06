import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import { colors } from "@nextui-org/react";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { CourseDetailsStats } from "@/types/stats";

const chartConfig = {
  totalPoints: { label: "Total Points", color: colors.dark.primary[400] },
  points: { label: "Points", color: colors.dark.primary[600] },
} satisfies ChartConfig;

type Props = {
  stats: CourseDetailsStats;
  height?: number;
  avg?: boolean;
};

const RateStats = ({ stats, height, avg = false }: Props) => {
  const { courseDetails } = useCtx(CourseDetailsContext);

  return (
    <ChartContainer
      config={chartConfig}
      // @ts-expect-error Custom style property
      style={{ "--height": `${height || 400}px` }}
      className="max-h-[var(--height)] w-full"
      title="Vertical stacked bar chart showing the points to total points ratio for each completed exam."
    >
      <BarChart accessibilityLayer data={stats} maxBarSize={160}>
        <CartesianGrid vertical={false} opacity={0.15} />

        <XAxis dataKey="exam" tickMargin={10} />

        <YAxis
          type="number"
          padding={{ bottom: 3 }}
          tickFormatter={(value) => Math.round(Number(value)).toString()}
        />

        <Bar dataKey="points" stackId={courseDetails.id} fill={chartConfig.points.color}>
          {stats.map(({ percentage }, idx) => (
            // @ts-expect-error Recharts typing error
            <Cell key={`cell-${idx}`} radius={percentage === 100 ? 6 : [0, 0, 6, 6]} />
          ))}
        </Bar>

        <Bar
          dataKey="totalPoints"
          stackId={courseDetails.id}
          radius={[6, 6, 0, 0]}
          fill={chartConfig.totalPoints.color}
        />

        <ChartTooltip
          cursor={false}
          defaultIndex={1}
          content={
            <ChartTooltipContent
              className="[&_div:last-child]:gap-x-2"
              formatter={(value, name, item) => {
                const dataItem = item.payload as CourseDetailsStats[number];

                return (
                  <div className="flex w-full items-center justify-between">
                    <p className="flex items-center gap-1.5">
                      <span className="block h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />{" "}
                      {name === "points" && avg && "Average"}{" "}
                      {chartConfig[name as keyof typeof chartConfig].label}
                    </p>
                    <p className="font-semibold">
                      {name === "totalPoints" ? Number(value) + dataItem.points! : value}
                    </p>
                  </div>
                );
              }}
            />
          }
        />
      </BarChart>
    </ChartContainer>
  );
};

export default RateStats;
