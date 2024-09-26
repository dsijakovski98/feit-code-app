import { Suspense, lazy, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Tab, Tabs } from "@nextui-org/tabs";

import { useFCUser } from "@/hooks/useFCUser";
import { TEACHER_TYPE, USER_TYPE } from "@/types";

const GeneralTab = lazy(
  () => import("@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/GeneralTab"),
);
const StudentsTab = lazy(
  () => import("@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/StudentsTab"),
);
const SettingsTab = lazy(
  () => import("@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/SettingsTab"),
);

const ProfessorCourseDetails = () => {
  const { userData } = useFCUser();

  const { hash, pathname } = useLocation();

  const tabKeys = useMemo(() => {
    const keys = ["general", "students"];

    if (userData?.type === USER_TYPE.professor && userData.user.type === TEACHER_TYPE.professor) {
      keys.push("settings");
    }

    return keys;
  }, [userData]);

  const invalidRoute = useMemo(() => {
    return !hash || !tabKeys.includes(hash.slice(1));
  }, [hash, tabKeys]);

  if (invalidRoute) {
    return <Navigate to={pathname + "#general"} replace />;
  }

  return (
    <section className="bg-main p-4 pt-0">
      <div className="mx-auto max-w-[130ch] lg:mx-0 lg:max-w-full">
        <Tabs
          fullWidth
          size="lg"
          variant="underlined"
          aria-label="Course details tabs"
          destroyInactiveTabPanel={false}
          selectedKey={hash}
          defaultSelectedKey="#general"
          classNames={{
            base: "!px-0 sticky top-20 py-2 bg-main z-20",
            tabContent: "text-foreground group-data-[selected]:font-semibold",
            tabList: "!mx-0",
            panel: "pt-5 px-10 md:px-6",
          }}
        >
          <Tab key="#general" title="General" href="#general">
            <Suspense fallback={null}>
              <GeneralTab />
            </Suspense>
          </Tab>
          <Tab key="#students" title="Students" href="#students">
            <Suspense fallback={null}>
              <StudentsTab />
            </Suspense>
          </Tab>

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
