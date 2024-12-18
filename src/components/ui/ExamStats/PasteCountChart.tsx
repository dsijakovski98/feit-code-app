import { useMemo } from "react";

import { Label, PolarGrid, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { ChartContainer } from "@/components/ui/shadcn/chart";

import { SessionStats } from "@/types/exams";

type Props = {
  pasteCount: SessionStats["pasteCount"] | null;
};

const PasteCountChart = ({ pasteCount }: Props) => {
  const pasteData = useMemo(() => [{ count: pasteCount }], [pasteCount]);

  const pasteCountLabel = useMemo(() => {
    if (!pasteCount) return "0";

    return pasteCount > 999 ? "999+" : pasteCount;
  }, [pasteCount]);

  return (
    <ChartContainer config={{ count: { label: "Count" } }} className="aspect-square h-[100px] translate-y-1">
      <RadialBarChart
        data={pasteData}
        startAngle={0}
        endAngle={(pasteCount || 0) * Math.PI}
        innerRadius={45}
        outerRadius={65}
        title="Paste Count"
        desc="Number of times"
        className="fill-primary !stroke-none"
      >
        <PolarGrid
          stroke="none"
          gridType="circle"
          radialLines={false}
          polarRadius={[49, 41]}
          className="first:fill-content3/20 last:fill-background/30"
        />
        <RadialBar dataKey="count" cornerRadius={10} />
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="-translate-y-3"
                  >
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-2xl font-bold">
                      {pasteCountLabel}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-foreground-300 text-xs">
                      Paste(s)
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
};

export default PasteCountChart;
