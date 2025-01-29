import { Helmet } from "react-helmet";
import { Fragment } from "react/jsx-runtime";

import AuthPageWindow from "@/layouts/AuthPageWindow";

import SignUpForm from "@/components/AuthForms/SignUp";

import { ROUTES } from "@/constants/routes";

const SignUpPage = () => {
  return (
    <Fragment>
      <Helmet>
        <title>FEIT Code | Sign Up</title>
        <meta name="description" content="Create an account and join FEIT Code in no time!" />
      </Helmet>

      <AuthPageWindow title="Sign up" href={ROUTES.signUp} heading="Have FEIT and join us!">
        <SignUpForm />
      </AuthPageWindow>
    </Fragment>
  );
};

export default SignUpPage;
