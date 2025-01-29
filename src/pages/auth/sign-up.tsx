import { Fragment } from "react/jsx-runtime";

import AuthPageWindow from "@/layouts/AuthPageWindow";
import PageMeta from "@/layouts/PageMeta";

import SignUpForm from "@/components/AuthForms/SignUp";

import { ROUTES } from "@/constants/routes";

const SignUpPage = () => {
  return (
    <Fragment>
      <PageMeta title="FEIT Code | Sign Up" description="Create an account and join FEIT Code in no time!" />

      <AuthPageWindow title="Sign up" href={ROUTES.signUp} heading="Have FEIT and join us!">
        <SignUpForm />
      </AuthPageWindow>
    </Fragment>
  );
};

export default SignUpPage;
