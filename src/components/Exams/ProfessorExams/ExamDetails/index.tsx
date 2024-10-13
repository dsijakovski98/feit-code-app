import { Suspense, lazy, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Tab, Tabs } from "@nextui-org/tabs";

import { EXAM_STATUS } from "@/constants/enums";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { useInvalidRoute } from "@/hooks/useInvalidRoute";

const GeneralTab = lazy(() => import("@/components/Exams/ProfessorExams/ExamDetails/GeneralTab"));
const SettingsTab = lazy(() => import("@/components/Exams/ProfessorExams/ExamDetails/SettingsTab"));

const TABS = {
  general: "#general",
  monitor: "#monitor",
  results: "#results",
  settings: "#settings",
};

const ProfessorExamDetails = () => {
  const { userData } = useFCUser();
  const { examDetails } = useCtx(ExamDetailsContext);
  const {
    status,
    course: { professorId },
  } = examDetails;

  const { hash, pathname } = useLocation();

  const tabKeys = useMemo(() => {
    const keys = [TABS.general];

    if (status === EXAM_STATUS.ongoing) {
      keys.push(TABS.monitor);
    }

    if (status === EXAM_STATUS.completed) {
      keys.push(TABS.results);
    }

    if (userData?.user.id === professorId && status === EXAM_STATUS.new) {
      keys.push(TABS.settings);
    }

    return keys;
  }, [userData, professorId, status]);

  const { invalidRoute } = useInvalidRoute({ tabKeys });

  if (invalidRoute) {
    return <Navigate to={pathname + TABS.general} replace />;
  }

  return (
    <section className="bg-main h-auto p-4 pt-0">
      <div className="mx-auto h-full max-w-[140ch] lg:mx-0 lg:max-w-full">
        <Tabs
          fullWidth
          size="lg"
          variant="underlined"
          aria-label="Exam details tabs"
          destroyInactiveTabPanel={false}
          selectedKey={hash}
          defaultSelectedKey="#general"
          classNames={{
            base: "!px-0 sticky top-20 lg:top-0 bg-transparent z-20",
            tabContent: "text-foreground group-data-[selected]:font-semibold",
            tabList: "!mx-0 py-5 bg-main",
            panel: "pt-3 px-10 lg:px-5 overflow-y-scroll max-h-[calc(100dvh-85px-80px)]",
          }}
        >
          <Tab key={TABS.general} title="General" href={TABS.general}>
            <Suspense fallback={null}>
              <GeneralTab />
            </Suspense>
          </Tab>

          {tabKeys.includes(TABS.monitor) && (
            // TODO: Implement Monitor tab
            <Tab key={TABS.monitor} title="Monitor" href={TABS.monitor}>
              <Suspense fallback={null}>Monitor tab</Suspense>
            </Tab>
          )}

          {tabKeys.includes(TABS.results) && (
            // TODO: Implement Results tab
            <Tab key={TABS.results} title="Results" href={TABS.results}>
              <Suspense fallback={null}>Results tab</Suspense>
            </Tab>
          )}

          {tabKeys.includes(TABS.settings) && (
            <Tab key={TABS.settings} title="Settings" href={TABS.settings}>
              <Suspense fallback={null}>
                <SettingsTab />
              </Suspense>
            </Tab>
          )}
        </Tabs>
      </div>
    </section>
  );
};

export default ProfessorExamDetails;
