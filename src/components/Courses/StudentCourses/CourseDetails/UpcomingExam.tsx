import { Spinner } from "@nextui-org/react";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useLatestExam } from "@/hooks/exam/useLatestExam";
import { useCtx } from "@/hooks/useCtx";
import { formatTimestamp } from "@/utils/dates";

const UpcomingExam = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id: courseId } = courseDetails;

  const { data: exam, isLoading } = useLatestExam({ courseId, upcoming: true });

  if (isLoading) {
    return (
      <div className="grid w-[18ch] place-items-center py-4">
        <Spinner />
      </div>
    );
  }

  if (exam === null) {
    return <p className="text-lg font-semibold text-foreground-300">No upcoming exams yet.</p>;
  }

  if (!exam) return null;

  const { name, language, startsAt } = exam;

  return (
    <div className="flex flex-col items-end gap-2">
      <p className="w-fit space-x-1 rounded-full bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground">
        Upcoming exam
      </p>

      <div className="text-end">
        <p className="text-lg font-semibold">
          {name}・{language}
        </p>
        <p className="font-sans">{formatTimestamp(startsAt)}</p>
      </div>
    </div>
  );
};

export default UpcomingExam;
