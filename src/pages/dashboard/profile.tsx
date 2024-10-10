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
    <section className="bg-main min-h-full p-4 pt-0">
      <div className="mx-auto h-full max-w-[90ch] md:max-w-full">
        {userData ? (
          <Tabs
            fullWidth
            size="lg"
            variant="underlined"
            aria-label="Profile tabs"
            destroyInactiveTabPanel={false}
            classNames={{
              base: "!px-0 sticky top-20 lg:top-0 transparent z-20",
              tabContent: "text-foreground group-data-[selected]:font-semibold",
              tabList: "bg-main py-5",
              panel: "pt-3 px-10 md:px-6",
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
