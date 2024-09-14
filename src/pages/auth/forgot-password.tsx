import AuthPageWindow from "@/layouts/AuthPageWindow";

import { ROUTES } from "@/constants/routes";

const ForgotPassword = () => {
  return (
    <AuthPageWindow
      title="Forgot password"
      href={ROUTES.forgotPassword}
      heading="Don't worry, it happens"
    >
      Form here
      {/* <SignInForm /> */}
    </AuthPageWindow>
  );
};

export default ForgotPassword;
