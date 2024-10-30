import { Link } from "react-router-dom";

import { InferSelectModel } from "drizzle-orm";

import { Avatar, Chip } from "@nextui-org/react";

import { courses, exams } from "@/db/schema";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";
import { parseExamStatus } from "@/utils";
import { examStatusColor } from "@/utils/colors";
import { formatTimestamp } from "@/utils/dates";

type Props = {
  exam: InferSelectModel<typeof exams> & {
    course: Pick<InferSelectModel<typeof courses>, "name" | "id">;
  };
};

const ExamCard = ({ exam }: Props) => {
  const { id, course, name, language, startsAt, status } = exam;

  const { userData } = useFCUser();

  if (!userData) return null;

  const { type } = userData;

  return (
    <div className="h-full space-y-16 rounded-lg border border-content3 bg-content1 p-4 font-sans shadow-md dark:border-content1 dark:bg-background sm:space-y-20">
      <div className="flex items-start justify-between gap-6">
        <div className="w-[36ch] space-y-2 overflow-hidden sm:w-[34ch]">
          <div>
            <span className="text-sm font-semibold">{course.name}</span>
            <h3 className="truncate text-lg font-semibold leading-[1.2]">
              {name}・{language}
            </h3>
          </div>

          <p className="text-foreground-300">{formatTimestamp(startsAt)}</p>
        </div>

        <Avatar
          size="sm"
          color={examStatusColor(status)}
          fallback={<Icon name="exam" className="scale-[1.3]" />}
        />
      </div>

      <div className="flex items-center justify-between gap-6">
        <Chip size="sm" color={examStatusColor(status)} classNames={{ content: "font-semibold text-sm p-2" }}>
          {parseExamStatus(status)}
        </Chip>

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
      </div>
    </div>
  );
};

export default ExamCard;
