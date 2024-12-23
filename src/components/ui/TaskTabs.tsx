import { Tab, Tabs } from "@nextui-org/tabs";

type TaskType = {
  id: string;
  title: string;
};

type Props = {
  activeId: TaskType["id"];
  tasks: Array<TaskType>;
  disabledTasks?: string[];

  onSelect: (taskId: string) => void;

  className?: string;
};

const TaskTabs = ({ activeId, tasks, disabledTasks, onSelect, className = "" }: Props) => {
  return (
    <Tabs
      size="lg"
      color="primary"
      variant="light"
      radius="full"
      selectedKey={activeId}
      onSelectionChange={(e) => onSelect(e.toString())}
      // @ts-expect-error Custom style property
      style={{ "--tasks": tasks.length }}
      className={className}
      classNames={{
        tab: "min-w-[10dvw]",
        tabList: "max-w-[calc(10dvw*var(--tasks))] max-w-[60dvw]",
        tabContent: "text-foreground font-medium group-data[selected=true]:text-primary-foreground",
      }}
    >
      {tasks.map((task) => (
        <Tab key={task.id} title={task.title} isDisabled={disabledTasks?.includes(task.id)} />
      ))}
    </Tabs>
  );
};

export default TaskTabs;
