import { Suspense } from "react";

import { Spinner } from "@nextui-org/react";

import ProfessorProfile from "@/components/ProfileManagement/ProfessorProfile";
import StudentProfile from "@/components/ProfileManagement/StudentProfile";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfilePage = () => {
  const { userData } = useFCUser();

  return (
    <div className="mx-auto h-full max-w-[80ch] lg:max-w-[90%]">
      {userData ? (
        <Suspense fallback={null}>
          {userData.type === USER_TYPE.student ? <StudentProfile /> : <ProfessorProfile />}
        </Suspense>
      ) : (
        <div className="grid h-full w-full place-items-center">
          <Spinner size="lg" className="scale-[2]" />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
