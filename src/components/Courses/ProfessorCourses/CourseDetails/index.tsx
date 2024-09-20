import { Suspense, lazy, useMemo } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Tab, Tabs } from "@nextui-org/tabs";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { TEACHER_TYPE } from "@/types";

const GeneralTab = lazy(
  () => import("@/components/Courses/ProfessorCourses/CourseDetails/GeneralTab"),
);
const StudentsTab = lazy(
  () => import("@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab"),
);
const SettingsTab = lazy(
  () => import("@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab"),
);

const CourseDetailsTabs = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);

  const { hash, pathname } = useLocation();

  const invalidRoute = useMemo(() => {
    const keys = ["general", "students"];

    if (courseDetails.professor.type === TEACHER_TYPE.professor) {
      keys.push("settings");
    }

    return !hash || !keys.includes(hash.slice(1));
  }, [courseDetails.professor.type, hash]);

  if (invalidRoute) {
    return <Navigate to={pathname + "#general"} replace />;
  }

  return (
    <section className="h-full bg-primary-50/20 p-4">
      <div className="mx-auto max-w-[130ch] md:max-w-full">
        <Tabs
          fullWidth
          size="lg"
          variant="underlined"
          aria-label="Course details tabs"
          destroyInactiveTabPanel={false}
          selectedKey={hash}
          defaultSelectedKey="#general"
          classNames={{
            tabContent: "text-foreground group-data-[selected]:font-semibold",
            panel: "pt-4 px-10 md:px-6",
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

          {courseDetails.professor.type === TEACHER_TYPE.professor && (
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

export default CourseDetailsTabs;
