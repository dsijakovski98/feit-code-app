import DeleteProfile from "@/components/ProfileManagement/Security/DeleteProfile";
import ResetPassword from "@/components/ProfileManagement/Security/ResetPassword";

const SecuritySettings = () => {
  return (
    <section className="space-y-16 px-8 pt-4">
      <div className="flex items-center justify-between gap-8">
        <div className="shrink-0">
          <h3 className="text-lg font-semibold">Password</h3>
          <p className="font-light">Reset your password, obtain new credentials.</p>
        </div>

        <ResetPassword />
      </div>

      <div className="flex items-center justify-between gap-8">
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
