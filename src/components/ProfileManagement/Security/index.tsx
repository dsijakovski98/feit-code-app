import { useMemo } from "react";

import { useUser } from "@clerk/clerk-react";

import DeleteProfile from "@/components/ProfileManagement/Security/DeleteProfile";
import ResetPassword from "@/components/ProfileManagement/Security/ResetPassword";

import { getAuthStrategy } from "@/utils";

const SecuritySettings = () => {
  const { user } = useUser();
  const authStrategy = useMemo(() => getAuthStrategy(user), [user]);

  return (
    <section className="space-y-16 pt-8">
      <div className="flex items-start justify-between gap-8">
        <div className="relative shrink-0">
          <h3 className="text-lg font-semibold">Password</h3>
          <p className="font-light">Reset your password, obtain new credentials.</p>

          {authStrategy && (
            <p className="absolute left-0 w-max translate-y-px text-[13px] font-medium text-warning-600 dark:text-warning">
              <span className="font-bold">{authStrategy}</span> login: Cannot reset password
            </p>
          )}
        </div>

        <ResetPassword />
      </div>

      <div className="flex items-start justify-between gap-8">
        <div>
          <h3 className="text-lg font-semibold">Delete Profile</h3>
          <p className="font-light">Permanently delete your profile from the face of the planet.</p>
        </div>

        <DeleteProfile />
      </div>
    </section>
  );
};

export default SecuritySettings;
