import { useState } from "react";

import { OAuthStrategy } from "@clerk/types";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

type Props = {
  joinType: "Join" | "Sign in";
  formLoading: boolean;
  oAuthJoin: (strategy: OAuthStrategy) => void;
};

const OAuthJoin = ({ oAuthJoin, joinType, formLoading }: Props) => {
  const [selectedStrategy, setSelectedStrategy] = useState<OAuthStrategy | null>(null);

  const handleJoin = (strategy: OAuthStrategy) => {
    setSelectedStrategy(strategy);
    oAuthJoin(strategy);
  };

  const isLoadingGoogle = formLoading && selectedStrategy === "oauth_google";
  const isLoadingGithub = formLoading && selectedStrategy === "oauth_github";

  return (
    <div className="flex items-center justify-between gap-4 lg:justify-center">
      <Button
        fullWidth
        size="lg"
        color="default"
        variant="bordered"
        disabled={formLoading}
        isLoading={isLoadingGoogle}
        onPress={() => handleJoin("oauth_google")}
        className="font-semibold lg:px-3"
      >
        {!isLoadingGoogle && <Icon name="google" className="min-h-6 min-w-6 lg:min-h-5 lg:min-w-5" />}
        <span className="lg:text-sm sm:hidden">{joinType} with Google</span>
      </Button>
      <Button
        fullWidth
        size="lg"
        color="default"
        variant="bordered"
        disabled={formLoading}
        isLoading={isLoadingGithub}
        onPress={() => handleJoin("oauth_github")}
        className="font-semibold lg:px-3"
      >
        {!isLoadingGithub && <Icon name="github" className="min-h-6 min-w-6 lg:min-h-5 lg:min-w-5" />}
        <span className="lg:text-sm sm:hidden">{joinType} with GitHub</span>
      </Button>
    </div>
  );
};

export default OAuthJoin;
