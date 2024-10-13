import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ExamFormContext } from "@/context/ExamFormContext";
import { TaskPreviewContext } from "@/context/TaskPreviewContext";
import { useCtx } from "@/hooks/useCtx";

const PreviewActions = () => {
  const { task, onClose } = useCtx(TaskPreviewContext);
  const { title } = task;

  const { tasksState } = useCtx(ExamFormContext);
  const [, setTasks] = tasksState;

  const removeTask = () => {
    setTasks((prev) => prev.filter((task) => task.title !== title));
    onClose();
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button isIconOnly radius="full" color="default" variant="light" className="overflow-visible">
          <Icon name="more" className="h-7 w-7 scale-90" />
        </Button>
      </DropdownTrigger>

      <DropdownMenu>
        <DropdownItem
          key="remove"
          color="danger"
          onPress={removeTask}
          title="Remove Task"
          className="text-danger"
          startContent={<Icon name="trash" className="h-5 w-5" />}
          classNames={{ title: "text-sm" }}
        />
      </DropdownMenu>
    </Dropdown>
  );
};

export default PreviewActions;
