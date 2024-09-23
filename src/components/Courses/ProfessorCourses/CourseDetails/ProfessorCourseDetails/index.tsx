import { Suspense, lazy, useMemo } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";

import { Tab, Tabs } from "@nextui-org/tabs";

import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
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
    <section className="bg-main flex gap-2 p-4 pl-6 lg:flex-col lg:gap-4">
      <Link
        to={ROUTES.courses}
        className="flex h-fit w-fit items-center gap-1 pt-2.5 font-semibold uppercase transition-colors hover:text-primary-500 focus:text-primary-500 lg:gap-0.5 lg:pt-0 lg:text-lg"
      >
        <Icon name="left" className="h-6 w-6" />
        Courses
      </Link>

      <div className="max-w-[120ch] basis-full lg:max-w-full">
        <Tabs
          fullWidth
          size="lg"
          variant="underlined"
          aria-label="Course details tabs"
          destroyInactiveTabPanel={false}
          selectedKey={hash}
          defaultSelectedKey="#general"
          classNames={{
            base: "!px-0",
            tabContent: "text-foreground group-data-[selected]:font-semibold",
            panel: "pt-4 px-10 lg:px-8 md:px-0",
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
