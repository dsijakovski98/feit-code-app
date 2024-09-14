import ProfessorProfileForm from "@/components/ProfileManagement/ProfessorProfile/ProfileForm";
import ProfessorProfileSkeleton from "@/components/ProfileManagement/ProfessorProfile/Skeleton";

import { useProfile } from "@/hooks/useProfile";
import { USER_TYPE } from "@/types";

const ProfessorProfile = () => {
  const { profile } = useProfile(USER_TYPE.professor);

  return profile ? <ProfessorProfileForm professor={profile} /> : <ProfessorProfileSkeleton />;
};

export default ProfessorProfile;
