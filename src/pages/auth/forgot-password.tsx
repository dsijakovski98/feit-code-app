import { Helmet } from "react-helmet";
import { Fragment } from "react/jsx-runtime";

import AuthPageWindow from "@/layouts/AuthPageWindow";

import ForgotPasswordForm from "@/components/AuthForms/SignIn/ForgotPassword";

import { ROUTES } from "@/constants/routes";

const ForgotPassword = () => {
  return (
    <Fragment>
      <Helmet>
        <title>FEIT Code | Forgot Password</title>
        <meta name="description" content="Reset and update your password in a matter of seconds." />
      </Helmet>

      <AuthPageWindow title="Forgot password" href={ROUTES.forgotPassword} heading="Don't worry, it happens">
        <ForgotPasswordForm />
      </AuthPageWindow>
    </Fragment>
  );
};

export default ForgotPassword;
