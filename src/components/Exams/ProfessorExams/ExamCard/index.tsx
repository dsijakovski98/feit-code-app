import { Link } from "react-router-dom";

import { InferSelectModel } from "drizzle-orm";

import { Chip } from "@nextui-org/react";

import { courses, exams } from "@/db/schema";

import Button from "@/components/ui/Button";

import { parseExamStatus } from "@/utils";
import { examStatusColor } from "@/utils/colors";
import { formatTimestamp } from "@/utils/dates";

type Props = {
  exam: InferSelectModel<typeof exams> & {
    course: Pick<InferSelectModel<typeof courses>, "name">;
  };
};

const ExamCard = ({ exam }: Props) => {
  const { id, course, name, language, startsAt, status } = exam;

  return (
    <div className="h-full w-[36ch] space-y-16 overflow-hidden rounded-lg border border-content3 bg-content1 p-4 font-sans shadow-md dark:border-content1 dark:bg-background sm:w-[34ch] sm:space-y-20">
      <div className="space-y-1.5">
        <div>
          <span className="text-sm font-semibold text-primary dark:text-primary-700">{course.name}</span>
          <h3 className="truncate text-lg font-semibold lg:text-lg">
            {name}・{language}
          </h3>
        </div>

        <p className="text-foreground-300">{formatTimestamp(startsAt)}</p>
      </div>

      <div className="flex items-center justify-between gap-6">
        <Chip size="sm" color={examStatusColor(status)} classNames={{ content: "font-semibold text-xs" }}>
          {parseExamStatus(status)}
        </Chip>

        <Button
          as={Link}
          // @ts-expect-error NextUI not passing through 'as' props
          to={id}
          size="sm"
          variant="light"
          color="default"
          className="px-5 text-sm lg:px-0"
        >
          Details
        </Button>
      </div>
    </div>
  );
};

export default ExamCard;
