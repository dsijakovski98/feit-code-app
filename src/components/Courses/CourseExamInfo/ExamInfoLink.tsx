import { useMemo } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { InferSelectModel } from "drizzle-orm";

import { Chip } from "@nextui-org/chip";

import { exams } from "@/db/schema";

import { EXAM_STATUS } from "@/constants/enums";
import { ROUTES } from "@/constants/routes";
import { parseExamStatus } from "@/utils";
import { examStatusColor } from "@/utils/colors";
import { canStartExam, formatTimestamp } from "@/utils/dates";

type Props = {
  exam: InferSelectModel<typeof exams>;
};

const ExamInfoLink = ({ exam }: Props) => {
  const { id, startsAt, name, language, status } = exam;

  const timestamp = useMemo(() => formatTimestamp(startsAt), [startsAt]);

  const readyToStart = useMemo(
    () => status === EXAM_STATUS.new && canStartExam(startsAt),
    [startsAt, status],
  );

  const statusLabel = useMemo(() => parseExamStatus(status), [status]);

  return (
    <Link to={`${ROUTES.dashboard}${ROUTES.exams}/${id}#general`} className="group space-y-0.5 *:font-sans">
      <div className="flex items-start justify-between gap-6">
        <div className="*:transition-[filter] group-hover:*:brightness-75 group-focus:*:brightness-75">
          <p>Latest Exam</p>

          <h2 className={clsx("text-xl font-bold")}>
            {name}・{language}
          </h2>
        </div>

        <Chip
          color={readyToStart ? "secondary" : examStatusColor(status)}
          classNames={{ content: "font-semibold text-sm" }}
        >
          {readyToStart ? "Ready to Start" : statusLabel}
        </Chip>
      </div>

      <p className="text-lg text-foreground-300 transition-[filter] group-hover:brightness-75 group-focus:brightness-75">
        {timestamp}
      </p>
    </Link>
  );
};

export default ExamInfoLink;
