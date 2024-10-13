import { useState } from "react";

import { Listbox, ListboxItem, ScrollShadow } from "@nextui-org/react";

import TaskItem from "@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/TaskList/TaskItem";
import TaskTemplatePreview from "@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/TaskList/TaskTemplatePreview";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";

const ExamTaskList = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { name, tasks } = examDetails;

  const [activeTask, setActiveTask] = useState<(typeof tasks)[number] | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Tasks</h2>

      <ScrollShadow className="h-[420px]">
        <Listbox
          items={tasks}
          variant="bordered"
          aria-label={`${name} exam's list of tasks`}
          classNames={{ list: "gap-4" }}
        >
          {(task) => (
            <ListboxItem
              key={task.title}
              textValue={task.title}
              classNames={{ title: "px-2", base: "p-2 rounded-lg border-default-200" }}
              onPress={() => setActiveTask(task)}
            >
              <TaskItem task={task} />
            </ListboxItem>
          )}
        </Listbox>
      </ScrollShadow>

      <TaskTemplatePreview task={activeTask} onClose={() => setActiveTask(null)} />
    </div>
  );
};

export default ExamTaskList;
