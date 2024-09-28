import { OAuthStrategy, SignInResource, SignUpResource } from "@clerk/types";

import { ROUTES } from "@/constants/routes";

type JoinOptions = {
  strategy: OAuthStrategy;
  authResource?: SignInResource | SignUpResource;
};
export const joinOAuth = async ({ strategy, authResource }: JoinOptions) => {
  try {
    await authResource?.authenticateWithRedirect({
      strategy,
      redirectUrl: ROUTES.ssoCallback,
      redirectUrlComplete: ROUTES.welcome,
    });
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error(`Failed to join via ${strategy}. Status: ${authResource?.status}`);
  }
};
