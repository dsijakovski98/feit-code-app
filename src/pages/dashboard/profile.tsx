import { Spinner } from "@nextui-org/react";
import { Tab, Tabs } from "@nextui-org/tabs";

import ProfessorProfile from "@/components/ProfileManagement/ProfessorProfile";
import SecuritySettings from "@/components/ProfileManagement/Security";
import StudentProfile from "@/components/ProfileManagement/StudentProfile";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfilePage = () => {
  const { userData } = useFCUser();

  return (
    <section className="h-full bg-primary-50/20 pt-4">
      <div className="mx-auto max-w-[75ch] lg:max-w-[90%]">
        {userData ? (
          <Tabs
            fullWidth
            size="lg"
            variant="underlined"
            aria-label="Profile tabs"
            destroyInactiveTabPanel={false}
            classNames={{
              tabContent: "text-foreground group-data-[selected]:font-semibold",
              panel: "pt-6 px-10",
            }}
          >
            <Tab key="profile" title="Profile">
              {userData.type === USER_TYPE.student ? <StudentProfile /> : <ProfessorProfile />}
            </Tab>

            <Tab key="security" title="Security">
              <SecuritySettings />
            </Tab>
          </Tabs>
        ) : (
          <div className="grid h-full w-full place-items-center">
            <Spinner size="lg" className="scale-[2]" />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfilePage;
