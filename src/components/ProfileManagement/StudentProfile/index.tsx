import StudentProfileForm from "@/components/ProfileManagement/StudentProfile/ProfileForm";
import StudentProfileSkeleton from "@/components/ProfileManagement/StudentProfile/Skeleton";

import { useStudentProfile } from "@/hooks/students/useStudentProfile";

const StudentProfile = () => {
  const { student } = useStudentProfile();

  return student ? <StudentProfileForm student={student} /> : <StudentProfileSkeleton />;
};

export default StudentProfile;
