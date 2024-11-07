import { Fragment } from "react";

import Nav from "@/layouts/MainLayout/Nav";

import ExamSession from "@/components/ExamSession";
import SessionHandler from "@/components/ExamSession/SessionHandler";

import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";

const ExamSessionPage = () => {
  const { isMobile } = useCtx(ResponsiveContext);

  const { userData } = useFCUser();

  if (!userData) return null;

  return (
    <Fragment>
      <div className="bg-dots relative grid h-dvh grid-rows-[auto_1fr] gap-2">
        <Nav hideDivider className="!bg-transparent dark:bg-transparent" />

        {!isMobile && <ExamSession />}

        {isMobile && (
          <div className="absolute inset-0 grid place-items-center p-5 pt-0">
            <h1 className="text-center font-sans text-lg font-semibold">
              For the best experience, please use the Desktop version. Sorry for the inconvenience.
            </h1>
          </div>
        )}
      </div>

      <SessionHandler studentId={userData.user.id} />
    </Fragment>
  );
};

export default ExamSessionPage;
