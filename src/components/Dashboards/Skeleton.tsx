import { ComponentProps } from "react";

import StatCard from "@/components/Dashboards/NumStats/StatCard";
import { DashboardWindow } from "@/components/ui/DashboardWindow";

type DummyCard = Pick<ComponentProps<typeof StatCard>, "icon" | "value" | "label" | "description">;

const dummyCards = Array.from({ length: 4 })
  .fill(0)
  .map<DummyCard>(() => ({ description: "", icon: "", label: "", value: null }));

const DashboardSkeleton = () => {
  return (
    <div className="bg-main h-full px-8 py-6 lg:p-5 lg:pb-20">
      <div className="flex h-full flex-col gap-4">
        <div className="grid grid-cols-4 grid-rows-1 gap-6 xl:grid-cols-2 md:grid-cols-1">
          {dummyCards.map((card, idx) => (
            <StatCard key={`card-${idx}`} {...card} />
          ))}
        </div>

        <div className="flex flex-1 items-stretch gap-6 *:flex-1 lg:flex-col">
          <DashboardWindow isLoaded={false} />
          <DashboardWindow isLoaded={false} />
        </div>

        <DashboardWindow isLoaded={false} className="h-[320px]"></DashboardWindow>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
