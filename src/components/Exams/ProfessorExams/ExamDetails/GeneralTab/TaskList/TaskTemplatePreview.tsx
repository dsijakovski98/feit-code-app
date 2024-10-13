import { InferSelectModel } from "drizzle-orm";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { Spinner } from "@nextui-org/react";

import { tasks } from "@/db/schema";

import CodeEditor from "@/components/CodeEditor";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useTaskTemplate } from "@/hooks/task/useTaskTemplate";
import { useCtx } from "@/hooks/useCtx";

type Props = {
  onClose: () => void;
  task: InferSelectModel<typeof tasks> | null;
};

const TaskTemplatePreview = ({ onClose, task }: Props) => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { language } = examDetails;

  const { data: template, isLoading } = useTaskTemplate(task?.templateUrl);

  return (
    <Modal
      size="3xl"
      backdrop="blur"
      placement="center"
      hideCloseButton
      isOpen={!!task}
      onClose={onClose}
      classNames={{
        backdrop: "backdrop-blur-sm brightness-50 dark:mix-blend-darken",
      }}
    >
      <ModalContent className="pb-4">
        <ModalHeader className="items-start justify-between gap-4 pb-2 text-lg">
          <h3>
            {task && task.orderIndex + 1}. {task?.title}
          </h3>
        </ModalHeader>

        <ModalBody>
          {isLoading && (
            <div className="grid h-[30dvh] place-items-center">
              <Spinner size="lg" />
            </div>
          )}

          {template && (
            <CodeEditor
              height="30dvh"
              readOnly
              editable={false}
              value={template}
              language={language}
              className="text-base"
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default TaskTemplatePreview;
