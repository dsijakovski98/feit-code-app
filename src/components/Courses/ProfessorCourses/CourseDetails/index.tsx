import { Suspense, lazy } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { Tab, Tabs } from "@nextui-org/tabs";

const GeneralTab = lazy(
  () => import("@/components/Courses/ProfessorCourses/CourseDetails/GeneralTab"),
);
const SettingsTab = lazy(
  () => import("@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab"),
);
const StudentsTab = lazy(
  () => import("@/components/Courses/ProfessorCourses/CourseDetails/StudentsTab"),
);

const CourseDetailsTabs = () => {
  const { hash, pathname } = useLocation();

  if (!hash) {
    return <Navigate to={pathname + "#general"} replace />;
  }

  return (
    <section className="h-full overflow-y-scroll bg-primary-50/20 py-4">
      <div className="mx-auto h-full">
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
            panel: "pt-5 px-12 md:px-6",
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
          <Tab key="#settings" title="Settings" href="#settings">
            <Suspense fallback={null}>
              <SettingsTab />
            </Suspense>
          </Tab>
        </Tabs>
      </div>
    </section>
  );
};

export default CourseDetailsTabs;
