import { PropsWithChildren } from "react";

const TooltipLabel = ({ children }: PropsWithChildren) => {
  return <p className="text-sm font-semibold">{children}</p>;
};

export default TooltipLabel;
