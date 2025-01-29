import { Fragment } from "react/jsx-runtime";

import AuthPageWindow from "@/layouts/AuthPageWindow";
import PageMeta from "@/layouts/PageMeta";

import ForgotPasswordForm from "@/components/AuthForms/SignIn/ForgotPassword";

import { ROUTES } from "@/constants/routes";

const ForgotPassword = () => {
  return (
    <Fragment>
      <PageMeta
        title="FEIT Code | Forgot Password"
        description="Reset and update your password in a matter of seconds."
      />

      <AuthPageWindow title="Forgot password" href={ROUTES.forgotPassword} heading="Don't worry, it happens">
        <ForgotPasswordForm />
      </AuthPageWindow>
    </Fragment>
  );
};

export default ForgotPassword;
