import { Suspense, lazy } from "react";

import { Spinner } from "@nextui-org/react";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorProfile = lazy(() => import("@/components/ProfileManagement/ProfessorProfile"));
const StudentProfile = lazy(() => import("@/components/ProfileManagement/StudentProfile"));

const ProfileManagement = () => {
  const { userData } = useFCUser();

  if (!userData) {
    return (
      <div className="mt-32 w-full text-center">
        <Spinner size="lg" className="scale-[2]" />
      </div>
    );
  }

  const { type } = userData;

  return (
    <Suspense fallback={null}>
      {type === USER_TYPE.student ? <StudentProfile /> : <ProfessorProfile />}
    </Suspense>
  );
};

export default ProfileManagement;
