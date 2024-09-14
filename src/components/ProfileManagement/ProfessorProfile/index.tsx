import ProfessorProfileForm from "@/components/ProfileManagement/ProfessorProfile/ProfileForm";
import ProfessorProfileSkeleton from "@/components/ProfileManagement/ProfessorProfile/Skeleton";

import { useProfessorProfile } from "@/hooks/professors/useProfessorProfile";

const ProfessorProfile = () => {
  const { professor } = useProfessorProfile();

  return professor ? <ProfessorProfileForm professor={professor} /> : <ProfessorProfileSkeleton />;
};

export default ProfessorProfile;
