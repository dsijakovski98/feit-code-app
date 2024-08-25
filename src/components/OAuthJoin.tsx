import { OAuthStrategy } from "@clerk/types";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

type Props = {
  isSubmitting: boolean;
  oAuthJoin: (strategy: OAuthStrategy) => void;
};

const OAuthJoin = ({ isSubmitting, oAuthJoin }: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 lg:justify-center">
      <Button
        fullWidth
        size="lg"
        color="default"
        variant="bordered"
        disabled={isSubmitting}
        className="lg:px-3"
        onClick={() => oAuthJoin("oauth_google")}
      >
        <Icon name="google" className="min-h-6 min-w-6 lg:min-h-5 lg:min-w-5" />
        <span className="lg:text-sm">Join with Google</span>
      </Button>
      <Button
        fullWidth
        size="lg"
        color="default"
        variant="bordered"
        disabled={isSubmitting}
        className="lg:px-3"
        onClick={() => oAuthJoin("oauth_github")}
      >
        <Icon name="github" className="min-h-6 min-w-6 lg:min-h-5 lg:min-w-5" />
        <span className="lg:text-sm">Join with GitHub</span>
      </Button>
    </div>
  );
};

export default OAuthJoin;
