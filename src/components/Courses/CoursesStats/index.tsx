import { useMemo } from "react";

import clsx from "clsx";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";
import { AxisDomain } from "recharts/types/util/types";

import { colors } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";

import { CourseStats } from "@/types/stats";
import { capitalize } from "@/utils";

type Props = {
  stats?: CourseStats | null;

  mode: "grade" | "percentage";
  isLoading?: boolean;
};

const CoursesStats = ({ stats, mode, isLoading }: Props) => {
  const modeLabel = useMemo(() => capitalize(mode), [mode]);

  const chartConfig = useMemo(
    () =>
      ({
        value: { label: modeLabel, color: colors.dark.primary[400] },
      }) satisfies ChartConfig,
    [modeLabel],
  );

  const avgValue = useMemo(
    () => (stats?.length ? stats.reduce((acc, stat) => acc + stat.value, 0) / stats.length : null),
    [stats],
  );

  const axisDomain = useMemo<AxisDomain>(() => (mode === "grade" ? [5, 10] : [0, 100]), [mode]);
  const ticks = useMemo(() => (mode === "grade" ? [5, 6, 7, 8, 9, 10] : undefined), [mode]);

  if (isLoading) {
    <div className="grid flex-1 place-items-center">
      <Spinner size="lg" className="scale-[1.5]" />
    </div>;
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
          <p className="text-foreground-300">Average {modeLabel}s</p>
        </div>

        <div className="text-end">
          <p className="font-sans text-4xl font-semibold">
            {avgValue}
            {mode === "percentage" && "%"}
          </p>
          <p className="text-foreground-300">Average Total {modeLabel}</p>
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
            ticks={ticks}
            domain={axisDomain}
            tickFormatter={(value) => {
              const parsedVal = Math.round(Number(value)).toString();

              return mode === "grade" ? parsedVal : parsedVal + "%";
            }}
          />

          <defs>
            <linearGradient id="fillPercentage" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.dark.primary[400]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors.dark.primary[100]} stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <Bar
            dataKey="value"
            radius={6}
            strokeWidth={2}
            fillOpacity={0.4}
            fill="url(#fillPercentage)"
            stroke={colors.dark.primary[300]}
          >
            <LabelList
              position="center"
              formatter={(value: number) => (mode === "grade" ? value : value + "%")}
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
              <ChartTooltipContent
                color={chartConfig.value.color}
                className="[&_div:last-child]:gap-x-2"
                formatter={(value) => (
                  <div className="flex w-full items-center justify-between">
                    <p className="flex items-center gap-1.5">
                      <span className="block h-3 w-3 rounded-sm bg-primary" /> {modeLabel}
                    </p>
                    <p className="font-semibold">
                      {value}
                      {mode === "percentage" && "%"}
                    </p>
                  </div>
                )}
              />
            }
          />
        </BarChart>
      </ChartContainer>
    </section>
  );
};

export default CoursesStats;
