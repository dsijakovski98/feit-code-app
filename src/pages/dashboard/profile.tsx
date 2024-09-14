import { Suspense, lazy } from "react";

import { Spinner } from "@nextui-org/react";
import { Tab, Tabs } from "@nextui-org/tabs";

import SecuritySettings from "@/components/ProfileManagement/Security";

import { useFCUser } from "@/hooks/useFCUser";
import { useResponsive } from "@/hooks/useResponsive";
import { USER_TYPE } from "@/types";

const ProfessorProfile = lazy(() => import("@/components/ProfileManagement/ProfessorProfile"));
const StudentProfile = lazy(() => import("@/components/ProfileManagement/StudentProfile"));

const ProfilePage = () => {
  const { userData } = useFCUser();
  const { isMobile } = useResponsive();

  return (
    <section className="overflow-y-scroll bg-primary-50/20 pt-4">
      <div className="mx-auto max-w-[75ch] md:max-w-full">
        {userData ? (
          <Tabs
            fullWidth
            size={isMobile ? "md" : "lg"}
            variant="underlined"
            aria-label="Profile tabs"
            destroyInactiveTabPanel={false}
            classNames={{
              tabContent: "text-foreground group-data-[selected]:font-semibold",
              panel: "pt-6 px-10 md:px-8",
            }}
          >
            <Tab key="profile" title="Profile">
              <Suspense fallback={null}>
                {userData.type === USER_TYPE.student ? <StudentProfile /> : <ProfessorProfile />}
              </Suspense>
            </Tab>

            <Tab key="security" title="Security">
              <SecuritySettings />
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
