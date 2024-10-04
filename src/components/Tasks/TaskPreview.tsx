import { Fragment } from "react";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/react";

import CodeEditor from "@/components/CodeEditor";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { ExamFormContext, TaskType } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  task: TaskType;
  index: number;
};

const TaskPreview = ({ task, index }: Props) => {
  const { title, description, points, template } = task;

  const { tasksState, formState } = useCtx(ExamFormContext);
  const [tasks, setTasks] = tasksState;
  const [{ language }] = formState;

  const dialog = useToggle();
  const templateToggle = useToggle();

  const removeTask = () => {
    setTasks((prev) => prev.filter((task) => task.title !== title));
  };

  const move = (direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === tasks.length - 1) return;

    setTasks((prev) => {
      const idx = prev.findIndex((task) => task.title === title);

      if (idx === -1) return prev;

      prev.splice(idx, 1);

      const newIndex = direction === "up" ? idx - 1 : idx + 1;
      prev.splice(newIndex, 0, task);

      return [...prev];
    });
  };

  return (
    <Fragment>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-semibold">
            <span className="font-sans">{index + 1}.</span> {title}
          </p>
          <p className="text-sm">
            <span className="font-sans font-semibold">{points}</span> points
          </p>
        </div>

        <div className="flex items-center gap-1">
          <Button
            isIconOnly
            aria-label="Show task details"
            color="default"
            size="sm"
            variant="light"
            radius="full"
            onPress={dialog.toggleOn}
          >
            <Icon name="eye" className="h-5 w-5" />
          </Button>

          <Button
            isIconOnly
            aria-label="Remove task"
            color="danger"
            size="sm"
            variant="light"
            radius="full"
            onPress={removeTask}
          >
            <Icon name="trash" className="h-5 w-5" />
          </Button>

          <div className="-space-y-1 *:!scale-80 [&_button]:flex">
            <Tooltip content="Move up" delay={500}>
              <Button
                isIconOnly
                size="sm"
                aria-label="Move up"
                color="default"
                variant="light"
                radius="full"
                isDisabled={index === 0}
                onPress={() => move("up")}
              >
                <Icon name="up" className="h-4 w-4" />
              </Button>
            </Tooltip>

            <Tooltip content="Move down" delay={500}>
              <Button
                isIconOnly
                size="sm"
                aria-label="Move down"
                color="default"
                variant="light"
                radius="full"
                isDisabled={index === tasks.length - 1}
                onPress={() => move("down")}
              >
                <Icon name="down" className="h-4 w-4" />
              </Button>
            </Tooltip>
          </div>
        </div>
      </div>

      <Modal
        size="2xl"
        backdrop="blur"
        placement="center"
        hideCloseButton
        isOpen={dialog.open}
        onClose={dialog.toggleOff}
        classNames={{
          backdrop: "backdrop-blur-sm brightness-50 dark:mix-blend-darken",
        }}
      >
        <ModalContent>
          <ModalHeader className="items-center justify-between pb-2 text-lg">
            <h3>{title}</h3>

            <Button
              size="sm"
              variant="light"
              color="default"
              className="text-sm hover:!bg-transparent"
              startContent={<Icon name={templateToggle.open ? "code-off" : "code"} className="h-4 w-4" />}
              onPress={templateToggle.toggle}
            >
              Template
            </Button>
          </ModalHeader>

          <PresenceBlock show={!templateToggle.open}>
            <ModalBody className="mb-4">{description}</ModalBody>
            <ModalFooter className="justify-start">{points} points</ModalFooter>
          </PresenceBlock>

          <PresenceBlock show={templateToggle.open}>
            <ModalBody className="pb-5">
              {/* Wrapper needed to have smooth toggle animation */}
              <div className="h-[25dvh]">
                <CodeEditor
                  height="25dvh"
                  readOnly
                  value={template}
                  language={language}
                  className="text-base"
                />
              </div>
            </ModalBody>
          </PresenceBlock>
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default TaskPreview;
