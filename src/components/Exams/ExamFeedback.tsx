import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import MarkdownPreview from "@uiw/react-markdown-preview";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { User } from "@nextui-org/user";

import Timestamp from "@/components/ui/Timestamp";

import { seenFeedback } from "@/actions/grades";
import { ExamCard } from "@/hooks/exam/useExams";
import { useAvatar } from "@/hooks/useAvatar";
import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
  exam: ExamCard;
  onSeen: () => void;
};

const ExamFeedback = ({ exam, dialog, onSeen }: Props) => {
  const { submissions } = exam;
  const [submission] = submissions;

  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();

  const [avatarUrl, isLoading] = useAvatar(submission.graderId ?? "");

  const closeFeedback = () => {
    setSearchParams((prev) => {
      prev.delete("fb");
      return prev;
    });
  };

  const { mutate } = useMutation({
    mutationFn: seenFeedback,
    onSuccess: () => {
      onSeen();

      queryClient.invalidateQueries({
        queryKey: [{ name: "feedback-count", studentId: submission.studentId }],
      });
    },
  });

  useEffect(() => {
    if (!dialog.open) return;
    if (submission.seen) return;

    mutate(submission.id);
  }, [mutate, submission.id, submission.seen, dialog.open]);

  if (!submission) return null;

  const { submittedAt, feedback, grader } = submission;

  return (
    <Modal
      isOpen={dialog.open}
      onOpenChange={dialog.toggle}
      onClose={closeFeedback}
      hideCloseButton
      size="3xl"
      placement="center"
      backdrop="opaque"
      classNames={{
        base: "font-serif",
        backdrop: "bg-background/50",
        header: "border-b border-b-content3 dark:border-b-content3/50 py-3",
        body: "py-6",
      }}
    >
      <ModalContent>
        <ModalHeader className="flex-col">
          <p className="text-2xl">
            {exam.name}・{exam.language}
          </p>
          <p className="font-sans text-base font-medium *:font-medium">
            Feedback・<Timestamp>{submittedAt}</Timestamp>
          </p>
        </ModalHeader>

        <ModalBody className="block space-y-4 font-sans">
          {grader && (
            <a href={`mailto:${grader.email}`} className="group">
              <User
                name={`${grader.firstName} ${grader.lastName}`}
                description={grader.email}
                avatarProps={{ size: "lg", src: avatarUrl ?? "", showFallback: isLoading }}
                classNames={{
                  name: "text-base font-semibold group-hover:text-primary-600 transition-colors",
                  description: "text-base font-medium group-hover:text-primary-600 transition-colors",
                }}
              />
            </a>
          )}

          <MarkdownPreview source={feedback!} className="rounded-lg bg-background p-4" />

          <p className="text-end font-sans text-2xl font-semibold">
            {submission.points}/{exam.points} pts
          </p>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExamFeedback;
