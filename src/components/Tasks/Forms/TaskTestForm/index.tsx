import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import { TaskType } from "@/context/ExamFormContext";

type Props = {
  task: TaskType | null;
  onClose: () => void;
};

const TaskTestForm = ({ task, onClose }: Props) => {
  return (
    <Modal
      size="2xl"
      backdrop="blur"
      placement="center"
      hideCloseButton
      isOpen={!!task}
      onClose={onClose}
      classNames={{
        backdrop: "backdrop-blur-sm brightness-50 dark:mix-blend-darken",
      }}
    >
      <ModalContent>
        <ModalHeader>Create test {task?.title}</ModalHeader>

        <ModalBody>Test form here</ModalBody>

        <ModalFooter>Actions here</ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TaskTestForm;
