import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "@/components/ui/Button";

import { ROUTES } from "@/constants/routes";
import { useOngoingExamAlert } from "@/hooks/exam/useOngoingExamAlert";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  courseIds?: string[];
  join: {
    label: string;
    getHref: (examId: string) => string;
  };
};

const ExamAlert = ({ courseIds, join }: Props) => {
  const { ongoingExam, isLoading } = useOngoingExamAlert(courseIds);

  const { pathname } = useLocation();

  const onExamsPath = useMemo(() => {
    return pathname.startsWith(`${ROUTES.dashboard}${ROUTES.exams}/${ongoingExam?.id}`);
  }, [pathname, ongoingExam?.id]);

  const show = useToggle(true);

  if (isLoading || onExamsPath || !show.open) {
    return null;
  }

  if (!ongoingExam) {
    return null;
  }

  return (
    <div
      role="alert"
      className="fixed inset-x-0 bottom-0 flex animate-appearance-in items-center justify-center gap-6 bg-secondary p-3 px-5 text-center text-secondary-foreground lg:bottom-[64px] lg:flex-col lg:gap-4"
    >
      <p className="font-medium leading-none">
        <span className="text-lg font-bold">
          {ongoingExam?.course.name}・{ongoingExam?.name}
        </span>{" "}
        is happening right now...
      </p>

      <div className="flex items-center gap-4 lg:w-full *:lg:basis-full">
        <Button
          as={Link}
          // @ts-expect-error NextUI not passing through 'as' props
          to={join.getHref(ongoingExam?.id)}
          size="sm"
          className="border-secondary-default bg-secondary-foreground px-7 py-[18px] text-sm font-bold text-secondary lg:w-full lg:text-base"
        >
          {join.label}
        </Button>

        <Button
          size="sm"
          color="default"
          variant="bordered"
          className="border-secondary-foreground px-5 py-[18px] text-sm text-secondary-foreground"
          onPress={show.toggleOff}
        >
          Dismiss
        </Button>
      </div>
    </div>
  );
};

export default ExamAlert;
