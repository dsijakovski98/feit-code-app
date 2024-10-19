import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import CodeEditor from "@/components/CodeEditor";
import TaskPreviewActions from "@/components/Tasks/TaskPreview/TaskPreviewActions";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { ExamFormContext } from "@/context/ExamFormContext";
import { TaskPreviewContext } from "@/context/TaskPreviewContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const TaskPreviewModal = () => {
  const { task, open, onClose } = useCtx(TaskPreviewContext);
  const { title, description, points, template } = task;

  const { formState } = useCtx(ExamFormContext);
  const [{ language }] = formState;

  const templateToggle = useToggle();

  return (
    <Modal
      size="2xl"
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
        <ModalHeader className="items-start justify-between gap-4 pb-2 text-xl">
          <h3>{title}</h3>

          <div className="flex shrink-0 items-center gap-1">
            <Button isIconOnly variant="light" color="default" radius="full" onPress={templateToggle.toggle}>
              <Icon name={templateToggle.open ? "code-off" : "code"} className="h-5 w-5" />
            </Button>

            <TaskPreviewActions />
          </div>
        </ModalHeader>

        <PresenceBlock show={!templateToggle.open}>
          <ModalBody className="text-lg">
            <p className="font-normal">{description}</p>
          </ModalBody>
        </PresenceBlock>

        <PresenceBlock show={templateToggle.open}>
          <ModalBody>
            {/* Wrapper needed for a smooth toggle animation */}
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

        <ModalFooter className="justify-start text-lg font-semibold">{points} points</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskPreviewModal;
