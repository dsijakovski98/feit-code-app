import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

import { ROUTES } from "@/constants/routes";

// https://clerk.com/docs/custom-flows/oauth-connections#create-the-sign-up-and-sign-in-flow
const CallbackSSO = () => {
  return (
    <AuthenticateWithRedirectCallback
      signInForceRedirectUrl={ROUTES.welcome}
      signUpForceRedirectUrl={ROUTES.welcome}
    />
  );
};

export default CallbackSSO;
