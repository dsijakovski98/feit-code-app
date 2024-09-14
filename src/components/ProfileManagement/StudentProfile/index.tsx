import StudentProfileForm from "@/components/ProfileManagement/StudentProfile/ProfileForm";
import StudentProfileSkeleton from "@/components/ProfileManagement/StudentProfile/Skeleton";

import { useProfile } from "@/hooks/useProfile";
import { USER_TYPE } from "@/types";

const StudentProfile = () => {
  const { profile } = useProfile(USER_TYPE.student);

  return profile ? <StudentProfileForm student={profile} /> : <StudentProfileSkeleton />;
};

export default StudentProfile;
