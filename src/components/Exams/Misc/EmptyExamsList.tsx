import { useMemo } from "react";

import { ExamStatus } from "@/constants/enums";
import { parseExamStatus } from "@/utils";

type Props = {
  status: string;
  course: string;
};

const EmptyExamsList = ({ status, course }: Props) => {
  const statusValue = useMemo(
    () =>
      status === "all" ? "" : <span className="font-semibold">{parseExamStatus(status as ExamStatus)}</span>,
    [status],
  );

  const courseValue = useMemo(
    () =>
      course === "all" ? (
        ""
      ) : (
        <span>
          for <span className="font-semibold">{course}</span>
        </span>
      ),
    [course],
  );

  const emptyExamsMessage = useMemo(() => {
    if (!statusValue && !courseValue) return "No exams found";

    return (
      <span>
        No {statusValue} exams found {courseValue}
      </span>
    );
  }, [statusValue, courseValue]);

  return (
    <div className="grid h-full place-items-center p-8 text-center">
      <p className="text-lg text-foreground-300">{emptyExamsMessage}</p>
    </div>
  );
};

export default EmptyExamsList;
