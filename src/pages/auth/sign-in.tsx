import { Helmet } from "react-helmet";
import { Fragment } from "react/jsx-runtime";

import AuthPageWindow from "@/layouts/AuthPageWindow";

import SignInForm from "@/components/AuthForms/SignIn";

import { ROUTES } from "@/constants/routes";

const SignInPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>FEIT Code | Sign In</title>
        <meta name="description" content="Sign in to your FEIT Code account and start coding!" />
      </Helmet>

      <AuthPageWindow title="Sign in" href={ROUTES.signIn} heading="Welcome back!">
        <SignInForm />
      </AuthPageWindow>
    </Fragment>
  );
};

export default SignInPage;
