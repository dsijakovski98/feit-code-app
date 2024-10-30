import { Fragment } from "react/jsx-runtime";

import JoinSessionHandler from "@/components/ExamSession/JoinSessionHandler";
import LeaveSession from "@/components/ExamSession/LeaveSession";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";

const ExamSessionPage = () => {
  const { examDetails } = useCtx(ExamDetailsContext);

  const { userData } = useFCUser();

  if (!userData) return null;

  // TODO: Implement UI
  return (
    <Fragment>
      <main className="h-dvh overflow-hidden bg-dots-light dark:bg-dots-dark">
        {examDetails.name}・{examDetails.language}
        <LeaveSession studentId={userData.user.id} />
      </main>

      <JoinSessionHandler studentId={userData.user.id} />
    </Fragment>
  );
};

export default ExamSessionPage;
