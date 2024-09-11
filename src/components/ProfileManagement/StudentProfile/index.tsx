import { Tab, Tabs } from "@nextui-org/tabs";

import PrivacySettings from "@/components/ProfileManagement/PrivacySettings";
import ProfileTab from "@/components/ProfileManagement/StudentProfile/ProfileTab";

import { useStudentProfile } from "@/hooks/students/useStudentProfile";

const StudentProfile = () => {
  const { student } = useStudentProfile();

  return (
    <section className="mx-auto max-w-[64ch]">
      <Tabs
        fullWidth
        size="lg"
        variant="underlined"
        aria-label="Profile tabs"
        destroyInactiveTabPanel={false}
        classNames={{
          tabContent: "text-foreground group-data-[selected]:font-semibold",
          panel: "pt-4",
        }}
      >
        <Tab key="profile" title="Profile">
          {student && <ProfileTab student={student} />}
        </Tab>

        <Tab key="privacy" title="Privacy Settings">
          <PrivacySettings />
        </Tab>
      </Tabs>
    </section>
  );
};

export default StudentProfile;
