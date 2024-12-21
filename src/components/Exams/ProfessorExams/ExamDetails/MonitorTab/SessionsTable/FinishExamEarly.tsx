import { Fragment, useMemo } from "react";

import { Tooltip } from "@nextui-org/tooltip";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import PresenceBlock from "@/components/ui/PresenceBlock";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { MonitorExamContext } from "@/context/MonitorExamContext";
import { useEndExam } from "@/hooks/exam/useEndExam";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const FinishExamEarly = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { id: examId } = examDetails;

  const { studentSessions } = useCtx(MonitorExamContext);

  const canFinishEarly = useMemo(
    () => studentSessions.every((session) => session.status === "Finished"),
    [studentSessions],
  );

  const finishDialog = useToggle();

  const { mutate, isPending } = useEndExam({ examId });

  const onConfirm = () => {
    mutate(examId);
  };

  return (
    <Fragment>
      <PresenceBlock show={canFinishEarly} mode="appear">
        <Tooltip
          content="Everybody has finished. You can finish the exam early."
          classNames={{ content: "p-2 font-serif" }}
        >
          <Button color="default" onPress={finishDialog.toggleOn}>
            Finish Exam
          </Button>
        </Tooltip>
      </PresenceBlock>

      <ConfirmDialog
        color="primary"
        loading={isPending}
        dialog={finishDialog}
        title="Finish exam early?"
        description="Everybody has submitted their tasks, you can end end the exam early."
        action={{ label: "Finish", onConfirm }}
      />
    </Fragment>
  );
};

export default FinishExamEarly;
