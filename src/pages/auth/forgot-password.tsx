import AuthPageWindow from "@/layouts/AuthPageWindow";

import ForgotPasswordForm from "@/components/AuthForms/SignIn/ForgotPassword";

import { ROUTES } from "@/constants/routes";

const ForgotPassword = () => {
  return (
    <AuthPageWindow title="Forgot password" href={ROUTES.forgotPassword} heading="Don't worry, it happens">
      <ForgotPasswordForm />
    </AuthPageWindow>
  );
};

export default ForgotPassword;
