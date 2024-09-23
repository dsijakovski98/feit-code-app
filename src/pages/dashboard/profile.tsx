import { Suspense, lazy } from "react";

import { Spinner } from "@nextui-org/react";
import { Tab, Tabs } from "@nextui-org/tabs";

import ProfileSettings from "@/components/ProfileManagement/Settings";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorProfile = lazy(() => import("@/components/ProfileManagement/ProfessorProfile"));
const StudentProfile = lazy(() => import("@/components/ProfileManagement/StudentProfile"));

const ProfilePage = () => {
  const { userData } = useFCUser();

  return (
    <section className="bg-main h-full overflow-y-scroll py-4 lg:pt-2">
      <div className="mx-auto h-full max-w-[85ch] md:max-w-full">
        {userData ? (
          <Tabs
            fullWidth
            size="lg"
            variant="underlined"
            aria-label="Profile tabs"
            destroyInactiveTabPanel={false}
            classNames={{
              tabContent: "text-foreground group-data-[selected]:font-semibold",
              panel: "pt-6 px-10 md:px-6 lg:py-4",
            }}
          >
            <Tab key="profile" title="Profile">
              <Suspense fallback={null}>
                {userData.type === USER_TYPE.student ? <StudentProfile /> : <ProfessorProfile />}
              </Suspense>
            </Tab>

            <Tab key="settings" title="Settings">
              <ProfileSettings />
            </Tab>
          </Tabs>
        ) : (
          <div className="grid h-full place-items-center">
            <Spinner size="lg" className="scale-[2]" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
