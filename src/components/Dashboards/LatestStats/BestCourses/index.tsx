import { useMemo } from "react";
import { Link } from "react-router-dom";

import { Bar, BarChart, Cell, LabelList, XAxis, YAxis } from "recharts";

import { Skeleton, colors } from "@nextui-org/react";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/shadcn/chart";
import TooltipLabel from "@/components/ui/shadcn/tooltip-label";

import { ROUTES } from "@/constants/routes";
import { USER_TYPE, UserType } from "@/types";
import { CourseStats } from "@/types/stats";

const TOP_COURSES = 3;

const dummyStats = Array.from({ length: TOP_COURSES }).fill(0);

type Props = {
  type: UserType;
  stats?: CourseStats | null;

  isLoading?: boolean;
};

const BestCourses = ({ type, stats, isLoading }: Props) => {
  const chartConfig = useMemo(
    () =>
      ({
        value: {
          label: type === USER_TYPE.student ? "Grade" : "Average Points",
          color: colors.dark.primary[400],
        },
        remaining: {
          label: type === USER_TYPE.student ? "Max Grade" : "Total Points",
          color: colors.dark.foreground[500],
        },
      }) satisfies ChartConfig,
    [type],
  );

  const offset = useMemo(() => (type === USER_TYPE.student ? 10 : 100), [type]);
  const rightPadding = useMemo(() => (type === USER_TYPE.student ? -90 : 50), [type]);

  const bestStats = useMemo(() => {
    if (!stats?.length) return null;

    const topStats = stats.sort((statA, statB) => statB.value - statA.value).slice(0, TOP_COURSES);
    return topStats.map((stat) => ({ ...stat, remaining: offset - stat.value }));
  }, [stats, offset]);

  const title = useMemo(() => {
    if (type === USER_TYPE.student) {
      return `Top ${TOP_COURSES} Courses`;
    }

    return `Top performing Courses`;
  }, [type]);

  return (
    <div className="mb-[-12px] flex h-full flex-col items-start gap-6">
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">{title}</h2>

        <Link
          to={ROUTES.courses}
          className="border-b border-b-transparent font-medium leading-tight text-foreground-300 transition-colors hover:border-b-foreground-300"
        >
          View All
        </Link>
      </div>

      {isLoading && (
        <div className="flex h-full max-h-[200px] w-full flex-1 flex-col justify-evenly">
          {dummyStats.map((_, idx) => (
            <Skeleton key={`dummy-stat-${idx}`} className="h-5 w-full rounded-lg" />
          ))}
        </div>
      )}

      {!bestStats && (
        <div className="grid h-full max-h-[200px] w-full flex-1 place-items-center">
          <p className="text-foreground-300">No courses information available.</p>
        </div>
      )}

      {bestStats && (
        <ChartContainer
          config={chartConfig}
          className="h-full max-h-[200px] w-full flex-1"
          title="Horizontal stacked bar chart showing the best performing courses' points breakdown."
        >
          <BarChart layout="vertical" accessibilityLayer data={bestStats} maxBarSize={20}>
            <XAxis type="number" height={0} tick={false} axisLine={false} padding={{ right: rightPadding }} />

            <YAxis dataKey="course" width={0} type="category" tick={false} axisLine={false} />

            <Bar dataKey="value" stackId="best-courses" fill={chartConfig.value.color}>
              {bestStats.map(({ value }, idx) => (
                // @ts-expect-error Recharts typing error
                <Cell key={`cell-${idx}`} radius={value === offset ? 8 : [8, 0, 0, 8]} />
              ))}

              <LabelList
                dataKey="course"
                offset={8}
                fontSize={14}
                fontWeight={500}
                position="insideLeft"
                className="translate-y-[-2.75ch] *:line-clamp-1 *:!fill-foreground"
              />
            </Bar>

            <Bar
              dataKey="remaining"
              stackId="best-courses"
              radius={[0, 8, 8, 0]}
              fill={chartConfig.remaining.color}
              className="opacity-50"
            >
              <LabelList
                dataKey="remaining"
                position="right"
                offset={12}
                fontSize={14}
                fontWeight={500}
                className="fill-foreground"
                formatter={(remaining: number) => {
                  if (type === USER_TYPE.student) return offset - remaining;

                  const percent = offset - remaining;
                  const val = percent === 100 ? percent : percent.toPrecision(2);

                  return val + "%";
                }}
              />
            </Bar>

            <ChartTooltip
              cursor={false}
              defaultIndex={1}
              content={
                <ChartTooltipContent
                  className="border-foreground-100/80"
                  labelFormatter={(label) => <TooltipLabel>{label}</TooltipLabel>}
                  formatter={(value, name, item) => {
                    if (type === USER_TYPE.student && name === "remaining") return null;

                    const dataItem = item.payload as (typeof bestStats)[number];

                    return (
                      <div className="flex w-full items-center justify-between gap-4">
                        <div className="flex items-center gap-1.5">
                          <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.color }} />
                          <p className="text-sm font-medium">
                            {chartConfig[name as keyof typeof chartConfig].label}
                          </p>
                        </div>
                        <p className="text-sm font-semibold">
                          {name === "remaining" ? Number(value) + dataItem.value! : value}
                        </p>
                      </div>
                    );
                  }}
                />
              }
            />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
};

export default BestCourses;
