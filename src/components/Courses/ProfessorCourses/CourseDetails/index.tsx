import { Suspense, lazy, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Tab, Tabs } from "@nextui-org/tabs";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { useInvalidRoute } from "@/hooks/useInvalidRoute";
import { USER_TYPE } from "@/types";

const GeneralTab = lazy(() => import("@/components/Courses/ProfessorCourses/CourseDetails/GeneralTab"));
const StudentsTab = lazy(() => import("@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab"));
const SettingsTab = lazy(() => import("@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab"));

const TABS = {
  general: "#general",
  students: "#students",
  settings: "#settings",
};

const ProfessorCourseDetails = () => {
  const { userData } = useFCUser();
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { assistantId, professorId } = courseDetails;

  const { hash, pathname } = useLocation();

  const tabKeys = useMemo(() => {
    const keys = [TABS.general];

    if (userData?.type !== USER_TYPE.professor) {
      return keys;
    }

    if ([professorId, assistantId].includes(userData.user.id)) {
      keys.push(TABS.students);
    }

    if (userData.user.id === professorId) {
      keys.push(TABS.settings);
    }

    return keys;
  }, [userData, professorId, assistantId]);

  const { invalidRoute } = useInvalidRoute({ tabKeys });

  if (invalidRoute) {
    return <Navigate to={pathname + TABS.general} replace />;
  }

  return (
    <section className="bg-main h-auto pt-0 lg:h-full">
      <div className="mx-auto max-w-[140ch] lg:mx-0 lg:max-w-full">
        <Tabs
          size="lg"
          fullWidth
          variant="underlined"
          aria-label="Course details tabs"
          selectedKey={hash}
          defaultSelectedKey={TABS.general}
          classNames={{
            base: "!px-0 sticky top-[85px] lg:top-0 bg-transparent z-20",
            tabContent: "text-foreground group-data-[selected]:font-semibold",
            tabList: "!mx-0 py-5 bg-main",
            panel:
              "pt-3 px-10 lg:px-5 overflow-y-scroll h-[calc(100dvh-85px-80px)] lg:max-h-[calc(100dvh-85px-80px)]",
          }}
        >
          <Tab key={TABS.general} title="General" href={TABS.general}>
            <Suspense fallback={null}>
              <GeneralTab />
            </Suspense>
          </Tab>

          {tabKeys.includes(TABS.students) && (
            <Tab key={TABS.students} title="Students" href={TABS.students}>
              <Suspense fallback={null}>
                <StudentsTab />
              </Suspense>
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

export default ProfessorCourseDetails;
