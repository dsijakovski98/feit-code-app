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

  return (
    <div className="grid place-items-center p-8 text-center">
      <p className="text-lg text-foreground-300">
        No {statusValue} exams {courseValue}
      </p>
    </div>
  );
};

export default EmptyExamsList;
