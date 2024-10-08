import { Suspense, lazy, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Tab, Tabs } from "@nextui-org/tabs";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const GeneralTab = lazy(() => import("@/components/Courses/ProfessorCourses/CourseDetails/GeneralTab"));
const StudentsTab = lazy(() => import("@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab"));
const SettingsTab = lazy(() => import("@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab"));

const ProfessorCourseDetails = () => {
  const { userData } = useFCUser();
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { assistantId, professorId } = courseDetails;

  const { hash, pathname } = useLocation();

  const tabKeys = useMemo(() => {
    const keys = ["general"];

    if (userData?.type !== USER_TYPE.professor) {
      return keys;
    }

    if ([professorId, assistantId].includes(userData.user.id)) {
      keys.push("students");
    }

    if (userData.user.id === professorId) {
      keys.push("settings");
    }

    return keys;
  }, [userData, professorId, assistantId]);

  const invalidRoute = useMemo(() => {
    return !hash || !tabKeys.includes(hash.slice(1));
  }, [hash, tabKeys]);

  if (invalidRoute) {
    return <Navigate to={pathname + "#general"} replace />;
  }

  if (tabKeys.length === 1 && tabKeys[0] === "general") {
    return (
      <section className="bg-main min-h-full px-8 pt-5 lg:px-5">
        <Suspense fallback={null}>
          <GeneralTab />
        </Suspense>
      </section>
    );
  }

  return (
    <section className="bg-main min-h-full p-4 pt-0">
      <div className="mx-auto h-full max-w-[140ch] lg:mx-0 lg:max-w-full">
        <Tabs
          fullWidth
          size="lg"
          variant="underlined"
          aria-label="Course details tabs"
          destroyInactiveTabPanel={false}
          selectedKey={hash}
          defaultSelectedKey="#general"
          classNames={{
            base: "!px-0 sticky top-20 lg:top-0 bg-transparent z-20",
            tabContent: "text-foreground group-data-[selected]:font-semibold",
            tabList: "!mx-0 py-5 bg-main",
            panel: "pt-3 px-10 lg:px-5 md:px-0",
          }}
        >
          <Tab key="#general" title="General" href="#general">
            <Suspense fallback={null}>
              <GeneralTab />
            </Suspense>
          </Tab>

          {tabKeys.includes("students") && (
            <Tab key="#students" title="Students" href="#students">
              <Suspense fallback={null}>
                <StudentsTab />
              </Suspense>
            </Tab>
          )}

          {tabKeys.includes("settings") && (
            <Tab key="#settings" title="Settings" href="#settings">
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
