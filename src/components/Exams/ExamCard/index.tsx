import { Fragment, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import clsx from "clsx";

import { Avatar } from "@nextui-org/avatar";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/react";

import ExamCardHeader from "@/components/Exams/ExamCard/ExamCardHeader";
import ExamFeedback from "@/components/Exams/ExamFeedback";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { SUBMISSION_STATUS } from "@/constants/enums";
import { ROUTES } from "@/constants/routes";
import { type ExamCard } from "@/hooks/exam/useExams";
import { useFCUser } from "@/hooks/useFCUser";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPE } from "@/types";
import { parseExamStatus } from "@/utils";
import { examStatusColor } from "@/utils/colors";
import { formatTimestamp } from "@/utils/dates";
import { submissionStatusLabel } from "@/utils/exams/results";

type Props = {
  exam: ExamCard;
};

const ExamCard = ({ exam }: Props) => {
  const { id, course, name, language, startsAt, status, submissions } = exam;

  const { userData } = useFCUser();

  const [searchParams, setSearchParams] = useSearchParams();

  const feedbackDefaultOpen = useMemo(() => searchParams.get("fb") === id, [id, searchParams]);
  const feedbackDialog = useToggle(feedbackDefaultOpen);

  const submission = submissions[0];
  const submissionGraded = submission?.status === SUBMISSION_STATUS.graded;

  const [feedbackSeen, setFeedbackSeen] = useState(!!submission?.seen);

  const onSeen = () => {
    setFeedbackSeen(true);
  };

  const openExamFeedback = () => {
    setSearchParams((prev) => {
      prev.append("fb", id);
      return prev;
    });

    feedbackDialog.toggleOn();
  };

  if (!userData) return null;

  const { type } = userData;

  return (
    <Fragment>
      <div className="h-full space-y-16 rounded-lg border border-content3 bg-content1 p-4 font-sans shadow-md dark:border-content1 dark:bg-background sm:space-y-20">
        <div className="flex items-start justify-between gap-6">
          <div className="w-[36ch] space-y-2 overflow-hidden sm:w-[34ch]">
            {submissionGraded ? (
              <Tooltip
                placement="top"
                content={
                  <p>
                    Open <span className="font-semibold">{course.name}</span> Course
                  </p>
                }
                classNames={{ content: "font-serif" }}
              >
                <Link className="group outline-none" to={`${ROUTES.dashboard}${ROUTES.courses}/${course.id}`}>
                  <ExamCardHeader isLink name={name} language={language} course={course} />
                </Link>
              </Tooltip>
            ) : (
              <ExamCardHeader name={name} language={language} course={course} />
            )}

            <p className="text-foreground-300">{formatTimestamp(startsAt)}</p>
          </div>

          <Avatar
            size="sm"
            color={examStatusColor(status)}
            isBordered={submissionGraded && !feedbackSeen}
            fallback={<Icon name="exam" className="scale-[1.3]" />}
          />
        </div>

        <div
          className={clsx("flex items-center justify-between gap-6", {
            "!items-end": !!submission,
          })}
        >
          {submission ? (
            <div>
              <p className="text-sm">Submission</p>
              <p className="font-serif font-semibold">{submissionStatusLabel(submission.status!)}</p>
            </div>
          ) : (
            <Chip
              size="sm"
              color={examStatusColor(status)}
              classNames={{ content: "font-semibold text-sm p-2" }}
            >
              {parseExamStatus(status)}
            </Chip>
          )}

          {submissionGraded ? (
            <Button color="success" onPress={openExamFeedback} className={!feedbackSeen ? "!font-bold" : ""}>
              Feedback
            </Button>
          ) : (
            <Button
              as={Link}
              // @ts-expect-error NextUI not passing through 'as' props
              to={type === USER_TYPE.professor ? id : `${ROUTES.dashboard}${ROUTES.courses}/${course.id}`}
              variant="light"
              color="default"
              className="px-5 text-sm lg:px-0"
            >
              {type === USER_TYPE.professor ? "Details" : "Course"}
            </Button>
          )}
        </div>
      </div>

      {type === USER_TYPE.student && submissionGraded && (
        <ExamFeedback exam={exam} dialog={feedbackDialog} onSeen={onSeen} />
      )}
    </Fragment>
  );
};

export default ExamCard;
