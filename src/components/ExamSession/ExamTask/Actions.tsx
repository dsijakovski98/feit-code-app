import { Fragment, useMemo } from "react";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  runCode: () => void;
  loading: boolean;
};

const ExamTaskActions = ({ runCode, loading }: Props) => {
  const { exam, currentTaskState, submittedTasksState } = useCtx(ExamSessionContext);
  const [, setCurrentTask] = currentTaskState;
  const [submittedTasks, setSubmittedTasks] = submittedTasksState;

  const { task } = useCtx(ExamSessionTaskContext);

  const submitToggle = useToggle();

  const submitMode = useMemo(() => {
    const totalTasks = exam.tasks.length;
    const submitted = submittedTasks.length;

    if (totalTasks === submitted + 1) {
      return "Finish";
    }

    return "Submit";
  }, [exam.tasks.length, submittedTasks.length]);

  const onConfirm = async () => {
    const newSubmitted = [...submittedTasks, task.id];
    setSubmittedTasks(newSubmitted);

    if (submitMode === "Submit") {
      const remainingTasks = exam.tasks.filter((task) => !newSubmitted.includes(task.id));
      setCurrentTask(remainingTasks[0]);

      submitToggle.toggleOff();
    }

    if (submitMode === "Finish") {
      // TODO: Finish exam

      submitToggle.toggleOff();
    }
  };

  return (
    <Fragment>
      <div className="sticky bottom-0 flex w-[calc(100%+(2*32px))] -translate-x-8 items-center justify-between gap-6 bg-slate-950 px-8 pb-5">
        <Button
          fullWidth
          color="success"
          className="!font-mono text-sm"
          isLoading={loading}
          onPress={runCode}
        >
          Run Code
        </Button>

        <Button fullWidth className="!font-mono text-sm" isLoading={loading} onPress={submitToggle.toggleOn}>
          {submitMode}
        </Button>
      </div>

      <ConfirmDialog
        color="primary"
        dialog={submitToggle}
        title={submitMode === "Submit" ? "Submit task?" : "Finish exam?"}
        description={
          submitMode === "Submit" ? "You cannot undo this." : `Make sure you've double checked everything!`
        }
        action={{ label: submitMode, onConfirm }}
      />
    </Fragment>
  );
};

export default ExamTaskActions;
