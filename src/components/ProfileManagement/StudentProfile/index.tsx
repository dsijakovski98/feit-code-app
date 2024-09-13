import { Tab, Tabs } from "@nextui-org/tabs";

import SecuritySettings from "@/components/ProfileManagement/Security";
import ProfileTab from "@/components/ProfileManagement/StudentProfile/ProfileTab";
import ProfileTabSkeleton from "@/components/ProfileManagement/StudentProfile/ProfileTab/Skeleton";

import { useStudentProfile } from "@/hooks/students/useStudentProfile";

const StudentProfile = () => {
  const { student } = useStudentProfile();

  return (
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
        {student ? <ProfileTab student={student} /> : <ProfileTabSkeleton />}
      </Tab>

      <Tab key="security" title="Security">
        <SecuritySettings />
      </Tab>
    </Tabs>
  );
};

export default StudentProfile;
