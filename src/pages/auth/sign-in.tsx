import { Fragment } from "react/jsx-runtime";

import AuthPageWindow from "@/layouts/AuthPageWindow";
import PageMeta from "@/layouts/PageMeta";

import SignInForm from "@/components/AuthForms/SignIn";

import { ROUTES } from "@/constants/routes";

const SignInPage = () => {
  return (
    <Fragment>
      <PageMeta
        title="FEIT Code | Sign In"
        description="Sign in to your FEIT Code account and start coding!"
      />

      <AuthPageWindow title="Sign in" href={ROUTES.signIn} heading="Welcome back!">
        <SignInForm />
      </AuthPageWindow>
    </Fragment>
  );
};

export default SignInPage;
