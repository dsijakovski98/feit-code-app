import { Suspense } from "react";

import { Spinner } from "@nextui-org/react";

import ProfessorProfile from "@/components/ProfileManagement/ProfessorProfile";
import StudentProfile from "@/components/ProfileManagement/StudentProfile";

import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfilePage = () => {
  const { userData } = useFCUser();

  return (
    <section className="h-full bg-primary-50/20 pt-4">
      <div className="mx-auto max-w-[75ch] lg:max-w-[90%]">
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
    </section>
  );
};

export default ProfilePage;
