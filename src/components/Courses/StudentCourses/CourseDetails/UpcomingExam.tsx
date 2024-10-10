import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

import Icon from "@/components/ui/Icon";

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
    // TODO: Link to exam details page
    <Link to="#" className="group flex flex-col items-end gap-2">
      <p className="w-fit space-x-1 rounded-full bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground">
        <span>Upcoming exam</span>
        <Icon
          name="right"
          className="inline h-4 w-4 transition-transform group-hover:translate-x-1 group-focus:translate-x-1"
        />
      </p>

      <div className="text-end *:transition-colors">
        <p className="text-lg font-semibold group-hover:text-primary-600 group-focus:text-primary-600">
          {name}・{language}
        </p>
        <p className="font-sans group-hover:text-primary-600 group-focus:text-primary-600">
          {formatTimestamp(startsAt)}
        </p>
      </div>
    </Link>
  );
};

export default UpcomingExam;
