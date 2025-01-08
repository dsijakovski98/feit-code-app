import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

import ExamStat from "@/components/Dashboards/Misc/ExamStat";

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
  const { id, course } = upcomingExam;

  const href = type === USER_TYPE.student ? `${ROUTES.courses}/${course.id}` : `${ROUTES.exams}/${id}`;

  return (
    <Link to={href} className="w-fit">
      <ExamStat exam={upcomingExam} />
    </Link>
  );
};

export default UpcomingExam;
