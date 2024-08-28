import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";

// https://clerk.com/docs/custom-flows/oauth-connections#create-the-sign-up-and-sign-in-flow
const CallbackSSO = () => {
  return <AuthenticateWithRedirectCallback />;
};

export default CallbackSSO;
