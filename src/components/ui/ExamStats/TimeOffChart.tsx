import { useMemo } from "react";

import clsx, { ClassValue } from "clsx";
import { useTheme } from "next-themes";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { colors } from "@nextui-org/theme";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";

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
  const { theme } = useTheme();

  const chartColor = useMemo(() => {
    return theme === "dark" ? colors.dark.primary[400] : colors.light.primary[400];
  }, [theme]);

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
      <BarChart accessibilityLayer data={timeOffData}>
        <CartesianGrid strokeDasharray="5" vertical={false} strokeOpacity={0.1} />

        <YAxis dataKey="time" className="translate-y-px" tickFormatter={(val) => `${val} min`} />
        <XAxis
          dataKey="timestamp"
          className="translate-y-px"
          label={{
            value: "Exam Duration",
            position: "insideBottom",
            className: "font-semibold translate-y-2",
          }}
          tickFormatter={(value) => value.split(" ").pop()}
        />

        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="line"
              className="border-foreground-100/80 [&_div:last-child]:gap-x-2"
            />
          }
        />

        <Bar dataKey="time" radius={8} fill={chartColor} />

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
