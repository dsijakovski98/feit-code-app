import { useMemo } from "react";

import { useTheme } from "next-themes";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { colors } from "@nextui-org/react";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";

import { StudentSession } from "@/types/exams";

const timeOffConfig = {
  timestamp: {
    label: "Timestamp",
  },
  time: {
    label: "Time (min)",
  },
} satisfies ChartConfig;

type Props = {
  session: StudentSession;
};

const TimeOffChart = ({ session }: Props) => {
  const { theme } = useTheme();

  const chartColor = useMemo(() => {
    return theme === "dark" ? colors.dark.primary[400] : colors.light.primary[400];
  }, [theme]);

  const timeOffData = useMemo(() => {
    if (!session.timeOff) return [];

    return Object.entries(session.timeOff).map(([timestamp, timeSeconds]) => {
      const time = Number((timeSeconds / 60).toFixed(1));

      return { timestamp, time };
    });
  }, [session.timeOff]);

  return (
    <ChartContainer className="max-h-[420px] w-full px-0" config={timeOffConfig}>
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
      </BarChart>
    </ChartContainer>
  );
};

export default TimeOffChart;
