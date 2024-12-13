import { useMemo } from "react";

import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useFinishExam } from "@/hooks/exam/useFinishExam";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

export const useSubmitExam = () => {
  const { task } = useCtx(ExamSessionTaskContext);
  const examSession = useCtx(ExamSessionContext);
  const { exam, student, tasksState, currentTaskState, submittedTasksState, stats } = examSession;
  const [, setCurrentTask] = currentTaskState;
  const [submittedTasks, setSubmittedTasks] = submittedTasksState;

  const submitToggle = useToggle();

  const submitMode = useMemo(() => {
    const totalTasks = exam.tasks.length;
    const submitted = submittedTasks.length;

    if (totalTasks === submitted + 1) {
      return "Finish";
    }

    return "Submit";
  }, [exam.tasks.length, submittedTasks.length]);

  const { mutate, isPending } = useFinishExam({ studentId: student.id });

  const handleSubmit = async () => {
    const newSubmitted = [...submittedTasks, task.id];
    setSubmittedTasks(newSubmitted);

    if (submitMode === "Finish") {
      if (!stats) return;

      mutate({ exam, tasksState, student, stats });

      return;
    }

    if (submitMode === "Submit") {
      const remainingTasks = exam.tasks.filter((task) => !newSubmitted.includes(task.id));
      setCurrentTask(remainingTasks[0]);

      submitToggle.toggleOff();
    }
  };

  return { submitToggle, submitMode, handleSubmit, isSubmitting: isPending };
};
