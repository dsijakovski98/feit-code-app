import { useMemo } from "react";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import DetailsHeader from "@/components/Exams/ProfessorExams/ExamDetails/GeneralTab/Details/DetailsHeader";
import Button from "@/components/ui/Button";

import { startExam } from "@/actions/exams";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { canStartExam, formatTimestamp } from "@/utils/dates";

const UpcomingDetails = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { id, name, startsAt, durationMinutes, points, tasks } = examDetails;

  const timestamp = useMemo(() => formatTimestamp(startsAt), [startsAt]);
  const canStart = useMemo(() => canStartExam(startsAt), [startsAt]);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: startExam,
    onSuccess: async (success) => {
      if (!success) return;

      await queryClient.invalidateQueries({ queryKey: [{ name: "exams", examId: id }] });
      toast.success(`${name} exam started!`);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleStartExam = () => {
    mutate(id);
  };

  if (canStart) {
    return (
      <div className="grid h-full place-items-center content-center gap-4">
        <p className="text-2xl font-semibold">Ready to Start!</p>
        <Button color="secondary" onPress={handleStartExam} isLoading={isPending}>
          Start Exam
        </Button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between space-y-8">
      <DetailsHeader>
        <p>Taking place</p>
        <time className="text-lg font-semibold">{timestamp}</time>
      </DetailsHeader>

      <div className="flex items-end justify-between *:basis-full">
        <div className="grid justify-start">
          <p className="text-5xl font-semibold">{durationMinutes} min</p>
          <p>Duration</p>
        </div>

        <div className="grid justify-center">
          <p className="text-5xl font-semibold">{tasks.length}</p>
          <p>Tasks</p>
        </div>

        <div className="grid justify-end">
          <p className="text-5xl font-semibold">{points}</p>
          <p>Total Points</p>
        </div>
      </div>
    </div>
  );
};

export default UpcomingDetails;
