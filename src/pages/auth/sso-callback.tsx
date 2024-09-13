import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

import { ROUTES } from "@/constants/routes";

// https://clerk.com/docs/custom-flows/oauth-connections#create-the-sign-up-and-sign-in-flow
const CallbackSSO = () => {
  return (
    <AuthenticateWithRedirectCallback
      continueSignUpUrl={ROUTES.signIn}
      signInForceRedirectUrl={ROUTES.welcome}
      signUpForceRedirectUrl={ROUTES.welcome}
      signInUrl={ROUTES.signIn}
      signUpUrl={ROUTES.signUp}
    />
  );
};

export default CallbackSSO;
