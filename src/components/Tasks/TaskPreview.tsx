import { Fragment } from "react";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Tooltip } from "@nextui-org/tooltip";

import CodeEditor from "@/components/CodeEditor";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { ExamFormContext, TaskType } from "@/context/ExamFormContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  open: boolean;
  onClose: () => void;
  task: TaskType;
  index: number;
};

const TaskPreview = ({ task, index, open, onClose }: Props) => {
  const { title, description, points, template } = task;

  const { tasksState, formState } = useCtx(ExamFormContext);
  const [tasks, setTasks] = tasksState;
  const [{ language }] = formState;

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
        size="3xl"
        backdrop="blur"
        placement="center"
        hideCloseButton
        isOpen={open}
        onClose={onClose}
        classNames={{
          backdrop: "backdrop-blur-sm brightness-50 dark:mix-blend-darken",
        }}
      >
        <ModalContent className="pb-4">
          <ModalHeader className="items-start justify-between gap-4 pb-2 text-lg">
            <h3>
              {index + 1}. {title}
            </h3>

            <div className="shrink-0 space-x-1">
              <Button
                isIconOnly
                size="sm"
                variant="light"
                color="default"
                radius="full"
                onPress={templateToggle.toggle}
              >
                <Icon name={templateToggle.open ? "code-off" : "code"} className="h-5 w-5" />
              </Button>

              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light" color="default" radius="full">
                    <Icon name="more" className="h-5 w-5" />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu>
                  <DropdownItem
                    key="remove"
                    color="danger"
                    onPress={removeTask}
                    startContent={<Icon name="trash" className="h-5 w-5" />}
                  >
                    Remove Task
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </ModalHeader>

          <PresenceBlock show={!templateToggle.open}>
            <ModalBody className="gap-12 font-semibold">
              <p>{description}</p>
              <p>{points} points</p>
            </ModalBody>
          </PresenceBlock>

          <PresenceBlock show={templateToggle.open}>
            <ModalBody>
              {/* Wrapper needed to have smooth toggle animation */}
              <div className="h-[25dvh]">
                <CodeEditor
                  height="25dvh"
                  readOnly
                  editable={false}
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
