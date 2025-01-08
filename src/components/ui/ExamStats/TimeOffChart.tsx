import { useMemo } from "react";

import clsx, { ClassValue } from "clsx";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { colors } from "@nextui-org/theme";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";
import TooltipLabel from "@/components/ui/shadcn/tooltip-label";

import { SessionStats } from "@/types/exams";

type ChartData = Array<{
  timestamp: string;
  time: number;
}>;

const timeOffConfig = {
  timestamp: {
    label: "Timestamp",
  },
  time: {
    label: "Time (min)",
  },
} satisfies ChartConfig;

type Props = {
  timeOff: SessionStats["timeOff"] | null;
  className?: ClassValue;
};

const TimeOffChart = ({ timeOff, className = "" }: Props) => {
  const timeOffData = useMemo<ChartData>(() => {
    if (!timeOff) return [];

    return Object.entries(timeOff).map(([timestamp, timeSeconds]) => {
      const time = Number((timeSeconds / 60).toFixed(2));

      return { timestamp, time };
    });
  }, [timeOff]);

  const noData = useMemo(() => timeOffData.length === 0, [timeOffData.length]);

  return (
    <ChartContainer className={clsx("max-h-[420px] w-full px-0", className)} config={timeOffConfig}>
      <BarChart accessibilityLayer data={timeOffData} maxBarSize={160} className="pl-2">
        <CartesianGrid strokeDasharray="5" vertical={false} strokeOpacity={0.1} />

        <YAxis dataKey="time" tickLine={false} axisLine={false} tickFormatter={(val) => `${val} min`} />

        <XAxis
          dataKey="timestamp"
          tickMargin={10}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.split(" ").pop()}
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              className="border-foreground-100/80"
              labelFormatter={(label) => <TooltipLabel>{label.split(" ").pop()}</TooltipLabel>}
              formatter={(value) => {
                return (
                  <div className="flex w-full items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-sm bg-primary" />
                      <p className="text-sm font-medium">Time</p>
                    </div>
                    <p className="font-semibold">{value} min</p>
                  </div>
                );
              }}
            />
          }
        />

        <defs>
          <linearGradient id="fillTimeOff" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colors.dark.primary[400]} stopOpacity={0.8} />
            <stop offset="95%" stopColor={colors.dark.primary[100]} stopOpacity={0.1} />
          </linearGradient>
        </defs>

        <Bar
          dataKey="time"
          radius={6}
          strokeWidth={2}
          fillOpacity={0.4}
          fill="url(#fillTimeOff)"
          stroke={colors.dark.primary[300]}
        />

        {noData && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-lg"
          >
            No time spent off session
          </text>
        )}
      </BarChart>
    </ChartContainer>
  );
};

export default TimeOffChart;
