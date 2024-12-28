import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";

import SubmissionGeneral from "@/components/Exams/ProfessorExams/ExamDetails/ResultsTab/SubmissionDetails/SubmissionGeneral";
import PasteCountChart from "@/components/ui/ExamStats/PasteCountChart";
import TimeOffChart from "@/components/ui/ExamStats/TimeOffChart";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { ExamDetails } from "@/hooks/exam/useExamDetails";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
  submission: ExamDetails["submissions"][number] | null;
  onClose?: () => void;
};

const SubmissionDetails = ({ dialog, submission, onClose }: Props) => {
  const { examDetails } = useCtx(ExamDetailsContext);

  return (
    <Modal
      isOpen={dialog.open && !!submission}
      onOpenChange={dialog.toggle}
      onClose={onClose}
      hideCloseButton
      size="5xl"
      placement="center"
      backdrop="opaque"
      classNames={{
        base: "font-serif",
        backdrop: "bg-background/50",
        header: "border-b border-b-content3 dark:border-b-content3/50 py-4",
        body: "py-6",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-2xl">
          <h2>
            Exam Results: {examDetails.name}・{examDetails.language}
          </h2>
        </ModalHeader>

        <ModalBody className="space-y-6 font-sans">
          {submission && <SubmissionGeneral submission={submission} />}

          <div className="translate-y-3 -space-y-3">
            <h3 className="text-2xl font-semibold">Statistics</h3>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xl font-medium">Time spent off session</h4>

                <p className="text-foreground-300">
                  Time chunks (in minutes) when{" "}
                  <b>
                    {submission?.student.firstName} {submission?.student.lastName}
                  </b>{" "}
                  was off during the session.
                </p>
              </div>

              {submission && <PasteCountChart pasteCount={submission.pasteCount} />}
            </div>
          </div>

          {submission && <TimeOffChart timeOff={submission.timeOff} className="max-h-[300px]" />}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SubmissionDetails;
