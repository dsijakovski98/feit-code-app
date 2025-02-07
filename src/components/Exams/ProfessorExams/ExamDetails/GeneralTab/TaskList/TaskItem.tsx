import { Tooltip } from "@heroui/tooltip";
import { InferSelectModel } from "drizzle-orm";

import { tasks } from "@/db/schema";

import Icon from "@/components/ui/Icon";

type Props = {
  task: InferSelectModel<typeof tasks>;
};

const TaskItem = ({ task }: Props) => {
  const { title, description, orderIndex, points } = task;

  return (
    <div className="group flex items-start justify-between gap-6">
      <div className="space-y-4">
        <div>
          <p className="text-lg font-semibold">
            <span className="font-sans">{orderIndex + 1}.</span> {title}
          </p>

          <Tooltip content={description} classNames={{ content: "font-serif whitespace-pre" }}>
            <p className="line-clamp-3 text-ellipsis whitespace-pre text-base text-foreground-300">
              {description}
            </p>
          </Tooltip>
        </div>

        <p className="text-base">
          <span className="font-sans font-semibold">{points}</span> points
        </p>
      </div>

      <p className="flex items-center gap-2 text-base font-semibold text-foreground-300 opacity-0 transition-opacity group-hover:opacity-100">
        <Icon name="code" className="h-5 w-5" /> Template
      </p>
    </div>
  );
};

export default TaskItem;
