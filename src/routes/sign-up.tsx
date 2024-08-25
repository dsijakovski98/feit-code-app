import AuthPageWindow from "@/layouts/AuthPageWindow";

import SignUpForm from "@/components/AuthForms/SignUp";

import { ROUTES } from "@/constants/routes";

const SignUpPage = () => {
  return (
    <AuthPageWindow title="Sign up" href={ROUTES.signUp} heading="Have FEIT and join us!">
      <SignUpForm />
    </AuthPageWindow>
  );
};

export default SignUpPage;
