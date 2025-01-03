import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "@/components/ui/Button";

import { OngoingExam } from "@/actions/exams";
import { ROUTES } from "@/constants/routes";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPE, UserType } from "@/types";

type Props = {
  exam: OngoingExam;
  userType: UserType;
};

const ExamAlert = ({ exam, userType }: Props) => {
  const { pathname } = useLocation();

  const show = useToggle(true);

  const onExamPath = useMemo(() => {
    return pathname.startsWith(`${ROUTES.dashboard}${ROUTES.exams}/${exam.id}`);
  }, [pathname, exam.id]);

  const onExamCoursePath = useMemo(() => {
    return pathname.startsWith(`${ROUTES.dashboard}${ROUTES.courses}/${exam.courseId}`);
  }, [pathname, exam.courseId]);

  const label = useMemo(() => (userType === USER_TYPE.student ? "Join Now" : "Monitor"), [userType]);

  const href = useMemo(() => {
    if (userType === USER_TYPE.student) {
      return `${ROUTES.examSession}/${exam.id}`;
    }

    return `${ROUTES.dashboard}${ROUTES.exams}/${exam.id}#monitor`;
  }, [userType, exam.id]);

  if (onExamPath || onExamCoursePath || !show.open) {
    return null;
  }

  return (
    <div
      role="alert"
      className="fixed inset-x-0 bottom-0 flex animate-appearance-in items-center justify-center gap-6 bg-secondary p-3 px-5 text-center text-secondary-foreground lg:bottom-[64px] lg:flex-col lg:gap-4"
    >
      <p className="font-medium leading-none">
        <span className="text-lg font-bold">
          {exam.course.name}・{exam.name}
        </span>{" "}
        is happening right now...
      </p>

      <div className="flex items-center gap-4 lg:w-full *:lg:basis-full">
        <Button
          as={Link}
          // @ts-expect-error NextUI not passing through 'as' props
          to={href}
          size="sm"
          className="border-secondary-default bg-secondary-foreground px-7 py-[18px] text-sm font-bold text-secondary lg:w-full lg:text-base"
        >
          {label}
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
