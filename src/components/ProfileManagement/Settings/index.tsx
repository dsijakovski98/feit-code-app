import { Fragment, useMemo } from "react";

import { useUser } from "@clerk/clerk-react";

import DeleteProfile from "@/components/ProfileManagement/Settings/DeleteProfile";
import ResetPassword from "@/components/ProfileManagement/Settings/ResetPassword";

import { getAuthStrategy } from "@/utils";

const ProfileSettings = () => {
  const { user } = useUser();
  const authStrategy = useMemo(() => getAuthStrategy(user), [user]);

  return (
    <section className="space-y-14 pt-4">
      <div className="space-y-3">
        <h2 className="text-lg font-semibold">Security</h2>
        <div className="flex items-start justify-between gap-52 xl:gap-20 lg:flex-col lg:gap-6 md:gap-4">
          <div className="pl-4 lg:space-y-1">
            <h3 className="font-semibold">Password</h3>

            <p className="text-sm">
              {authStrategy ? (
                <Fragment>
                  You are logged in using <span className="font-bold">{authStrategy}</span>. We cannot reset
                  your password.
                </Fragment>
              ) : (
                "Reset your password, obtain new credentials."
              )}
            </p>
          </div>

          <ResetPassword />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-danger">Danger Zone</h2>
        <div className="flex items-start justify-between gap-8 lg:flex-col lg:gap-4">
          <div className="pl-4 lg:space-y-1">
            <h3 className="font-semibold">Delete Profile</h3>
            <p className="text-sm">Permanently delete your profile from the face of the planet.</p>
          </div>

          <DeleteProfile />
        </div>
      </div>
    </section>
  );
};

export default ProfileSettings;
