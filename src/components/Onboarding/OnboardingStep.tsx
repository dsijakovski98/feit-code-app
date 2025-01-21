import { PropsWithChildren } from "react";

import PresenceBlock from "@/components/ui/PresenceBlock";

type Props = {
  active?: boolean;
} & PropsWithChildren;

const OnboardingStep = ({ active, children }: Props) => {
  return <PresenceBlock show={!!active}>{children}</PresenceBlock>;
};

export default OnboardingStep;
