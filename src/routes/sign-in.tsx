import AuthPageWindow from "@/layouts/AuthPageWindow";

import SignInForm from "@/components/AuthForms/SignIn";

import { ROUTES } from "@/constants/routes";

const SignInPage = () => {
  return (
    <AuthPageWindow title="Sign in" href={ROUTES.signIn} heading="Welcome back!">
      <SignInForm />
    </AuthPageWindow>
  );
};

export default SignInPage;
