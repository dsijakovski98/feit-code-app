import { OAuthStrategy } from "@clerk/types";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

type Props = {
  joinType: "Join" | "Sign in";
  isSubmitting: boolean;
  oAuthJoin: (strategy: OAuthStrategy) => void;
};

const OAuthJoin = ({ isSubmitting, oAuthJoin, joinType }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 lg:justify-center">
      <Button
        fullWidth
        size="lg"
        color="default"
        variant="bordered"
        disabled={isSubmitting}
        className="font-semibold lg:px-3"
        onPress={() => oAuthJoin("oauth_google")}
      >
        <Icon name="google" className="min-h-6 min-w-6 lg:min-h-5 lg:min-w-5" />
        <span className="lg:text-sm">{joinType} with Google</span>
      </Button>
      <Button
        fullWidth
        size="lg"
        color="default"
        variant="bordered"
        disabled={isSubmitting}
        className="font-semibold lg:px-3"
        onPress={() => oAuthJoin("oauth_github")}
      >
        <Icon name="github" className="min-h-6 min-w-6 lg:min-h-5 lg:min-w-5" />
        <span className="lg:text-sm">{joinType} with GitHub</span>
      </Button>
    </div>
  );
};

export default OAuthJoin;
