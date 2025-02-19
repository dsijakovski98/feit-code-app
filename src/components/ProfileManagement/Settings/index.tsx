import { Fragment, useMemo } from "react";

import { useUser } from "@clerk/clerk-react";

import DeleteProfile from "@/components/ProfileManagement/Settings/DeleteProfile";
import ResetPassword from "@/components/ProfileManagement/Settings/ResetPassword";

import { getAuthStrategy } from "@/utils";

const ProfileSettings = () => {
  const { user } = useUser();
  const authStrategy = useMemo(() => getAuthStrategy(user), [user]);

  return (
    <section className="space-y-14">
      <div className="space-y-3">
        <h2 className="w-fit rounded-lg bg-default px-2 py-0.5 text-lg font-semibold text-default-foreground">
          Security
        </h2>

        <div className="flex items-start justify-between gap-52 px-4 xl:gap-20 lg:flex-col lg:gap-6 md:gap-4">
          <div className="lg:space-y-1">
            <h3 className="text-lg font-semibold">Password</h3>

            <p>
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

      <div className="space-y-4">
        <h2 className="w-fit rounded-lg bg-danger px-2 py-0.5 text-lg font-semibold text-danger-foreground">
          Danger Zone
        </h2>

        <div className="flex items-start justify-between gap-8 px-4 lg:flex-col lg:gap-4">
          <div className="lg:space-y-1">
            <h3 className="text-lg font-semibold">Delete Profile</h3>
            <p>Permanently delete your profile from the face of the planet.</p>
          </div>

          <DeleteProfile />
        </div>
      </div>
    </section>
  );
};

export default ProfileSettings;
