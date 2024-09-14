import { useMemo } from "react";

import { useUser } from "@clerk/clerk-react";

import DeleteProfile from "@/components/ProfileManagement/Security/DeleteProfile";
import ResetPassword from "@/components/ProfileManagement/Security/ResetPassword";

import { getAuthStrategy } from "@/utils";

const SecuritySettings = () => {
  const { user } = useUser();
  const authStrategy = useMemo(() => getAuthStrategy(user), [user]);

  return (
    <section className="space-y-16 pt-8 lg:pt-0">
      <div className="flex items-start justify-between gap-8 lg:flex-col lg:gap-9">
        <div className="relative shrink-0">
          <h3 className="text-lg font-semibold">Password</h3>
          <p className="font-light lg:text-sm lg:font-normal">
            Reset your password, obtain new credentials.
          </p>

          {authStrategy && (
            <p className="absolute left-0 w-max translate-y-1 font-sans text-xs font-semibold text-foreground-200">
              <span className="font-bold">{authStrategy}</span> login: Cannot reset password
            </p>
          )}
        </div>

        <ResetPassword />
      </div>

      <div className="flex items-start justify-between gap-8 lg:flex-col lg:gap-4">
        <div>
          <h3 className="text-lg font-semibold">Delete Profile</h3>
          <p className="font-light lg:text-sm lg:font-normal">
            Permanently delete your profile from the face of the planet.
          </p>
        </div>

        <DeleteProfile />
      </div>
    </section>
  );
};

export default SecuritySettings;
