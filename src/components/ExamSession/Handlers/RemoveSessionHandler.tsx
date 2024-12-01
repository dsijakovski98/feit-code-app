import { useCallback, useState } from "react";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { ExamSessionContext } from "@/context/ExamSessionContext";
import { useLeaveExam } from "@/hooks/exam/useLeaveExam";
import { useDatabaseListen } from "@/hooks/firebase/useDatabaseListen";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { StudentSession } from "@/types/exams";

const RemoveSessionHandler = () => {
  const { exam, sessionIdState } = useCtx(ExamSessionContext);
  const [sessionId] = sessionIdState;

  const removeDialog = useToggle();
  const [removed, setRemoved] = useState<StudentSession["removed"]>();

  const onData = useCallback(
    (session: StudentSession | null) => {
      if (!session?.removed) return;

      setRemoved(session.removed);
      removeDialog.toggleOn();
    },
    [removeDialog],
  );

  useDatabaseListen(`exams/${exam.id}/activeStudents/${sessionId}`, onData);

  const { mutate, isPending } = useLeaveExam();

  const onConfirm = () => {
    if (!sessionId) return;

    mutate({ examId: exam.id, sessionId });
  };

  return (
    <ConfirmDialog
      color="default"
      cancelable={false}
      loading={isPending}
      dialog={removeDialog}
      title={`You have been removed from ${exam.name}!`}
      description={
        removed && (
          <div className="space-y-2">
            <p>
              <span className="font-semibold">
                {removed.teacherType} {removed.remover}
              </span>{" "}
              removed you from the exam.
            </p>

            {removed.reason && (
              <p>
                Reason: <br /> <span className="mt-2 font-semibold">{removed.reason}</span>
              </p>
            )}
          </div>
        )
      }
      action={{ label: "Continue", onConfirm }}
    />
  );
};

export default RemoveSessionHandler;
