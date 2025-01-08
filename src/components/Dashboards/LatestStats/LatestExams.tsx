import { Link } from "react-router-dom";

import { Chip, Listbox, ListboxItem, Skeleton } from "@nextui-org/react";

import ExamStat from "@/components/Dashboards/Misc/ExamStat";

import { ROUTES } from "@/constants/routes";
import { UserCoursesContext } from "@/context/UserCoursesContext";
import { useLatestExams } from "@/hooks/exam/useLatestExams";
import { useCtx } from "@/hooks/useCtx";
import { FCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";
import { parseExamStatus } from "@/utils";
import { examStatusColor } from "@/utils/colors";

const LATEST_EXAMS = 3;

const dummyExams = Array.from({ length: LATEST_EXAMS }).fill(0);

type Props = {
  userData: NonNullable<FCUser>;
};

const LatestExams = ({ userData }: Props) => {
  const { courseIds } = useCtx(UserCoursesContext);

  const { data: latestExams, isPending } = useLatestExams({ courseIds, limit: LATEST_EXAMS });

  return (
    <div className="flex h-full flex-col items-start gap-6">
      <div className="flex w-full items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Latest Exams</h2>

        <Link
          to={ROUTES.exams}
          className="border-b border-b-transparent font-medium leading-tight text-foreground-300 transition-colors hover:border-b-foreground-300"
        >
          View All
        </Link>
      </div>

      {isPending && (
        <div className="flex h-full max-h-[200px] w-full flex-1 flex-col justify-around lg:max-h-full lg:gap-6">
          {dummyExams.map((_, idx) => (
            <Skeleton key={`dummy-exam-${idx}`} className="h-9 w-full rounded-lg" />
          ))}
        </div>
      )}

      {latestExams === null && (
        <div className="grid h-full max-h-[200px] w-full flex-1 place-items-center lg:min-h-[200px]">
          <p className="text-foreground-300">No exams information available.</p>
        </div>
      )}

      {latestExams && (
        <Listbox
          as="ol"
          variant="flat"
          aria-label={`List of the ${LATEST_EXAMS} exams.`}
          classNames={{
            base: "p-0 h-full max-h-[200px] w-full flex-1 lg:max-h-full",
            list: "flex flex-col h-full justify-around lg:gap-6",
          }}
        >
          {latestExams.map((exam) => {
            const { type } = userData;
            const { id, course } = exam;

            return (
              <ListboxItem key={exam.id} className="rounded-lg" textValue={exam.name}>
                <Link
                  className="flex cursor-pointer items-center justify-between gap-4"
                  to={type === USER_TYPE.student ? `${ROUTES.courses}/${course.id}` : `${ROUTES.exams}/${id}`}
                >
                  <ExamStat exam={exam} color="light" />

                  <Chip
                    size="sm"
                    variant="light"
                    color={examStatusColor(exam.status)}
                    classNames={{ content: "font-semibold text-sm p-0" }}
                  >
                    {parseExamStatus(exam.status)}
                  </Chip>
                </Link>
              </ListboxItem>
            );
          })}
        </Listbox>
      )}
    </div>
  );
};

export default LatestExams;
