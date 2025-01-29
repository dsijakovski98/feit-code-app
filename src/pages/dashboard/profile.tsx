import { Fragment, Suspense, lazy } from "react";

import { Spinner } from "@heroui/spinner";
import { Tab, Tabs } from "@heroui/tabs";

import PageMeta from "@/layouts/PageMeta";

import ProfileSettings from "@/components/ProfileManagement/Settings";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorProfile = lazy(() => import("@/components/ProfileManagement/ProfessorProfile"));
const StudentProfile = lazy(() => import("@/components/ProfileManagement/StudentProfile"));

const ProfilePage = () => {
  const { userData } = useFCUser();

  return (
    <Fragment>
      <PageMeta
        title="FEIT Code | Profile"
        description="See your profile details and update them as you need."
      />

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
                tabList: "bg-main py-4",
                panel: "pt-3 px-10 lg:px-2",
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
    </Fragment>
  );
};

export default ProfilePage;
