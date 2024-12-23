import { useMemo } from "react";

import { InferSelectModel } from "drizzle-orm";

import { Chip } from "@nextui-org/chip";

import { tasks } from "@/db/schema";

type Props = {
  task: Pick<InferSelectModel<typeof tasks>, "orderIndex" | "title" | "description" | "points">;
};

const ExamTaskDescription = ({ task }: Props) => {
  const { orderIndex, title, description, points } = task;

  const taskPoints = useMemo(() => `${points} point${Number(points) > 9 && "s"}`, [points]);

  return (
    <div className="space-y-8 pt-2">
      <div className="flex items-start justify-between gap-6">
        <h2 className="text-2xl font-semibold">
          {orderIndex + 1}. {title}
        </h2>

        <Chip color="primary" className="shrink-0 pb-0.5" classNames={{ content: "font-semibold text-base" }}>
          {taskPoints}
        </Chip>
      </div>

      <p className="text-lg font-medium dark:font-normal">{description}</p>
    </div>
  );
};

export default ExamTaskDescription;
