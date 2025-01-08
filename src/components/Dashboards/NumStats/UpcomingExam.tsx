import { Link } from "react-router-dom";

import { Spinner, Tooltip } from "@nextui-org/react";

import Timestamp from "@/components/ui/Timestamp";

import { ROUTES } from "@/constants/routes";
import { UserCoursesContext } from "@/context/UserCoursesContext";
import { type UpcomingExam, useUpcomingExam } from "@/hooks/exam/useUpcomingExam";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const UpcomingExam = () => {
  const { userData } = useFCUser();

  const { courseIds } = useCtx(UserCoursesContext);
  const { data: upcomingExam, isPending } = useUpcomingExam({ courseIds });

  if (isPending || !userData) {
    return <Spinner className="w-fit" color="default" size="lg" />;
  }

  if (!upcomingExam) {
    return <p className="text-lg font-medium">No upcoming exam found.</p>;
  }

  const { type } = userData;
  const { name, language, id, startsAt, course } = upcomingExam;

  const fullName = `${name}・${language}`;
  const href = type === USER_TYPE.student ? `${ROUTES.courses}/${course.id}` : `${ROUTES.exams}/${id}`;

  return (
    <Link to={href} className="w-fit">
      <Tooltip content={fullName} placement="top-start" classNames={{ content: "font-serif p-2" }}>
        <div>
          <p className="text-sm font-semibold text-content4">{course.name}</p>

          <p className="line-clamp-1 font-semibold">
            {fullName} (<Timestamp>{startsAt}</Timestamp>)
          </p>
        </div>
      </Tooltip>
    </Link>
  );
};

export default UpcomingExam;
