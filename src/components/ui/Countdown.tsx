import { PropsWithChildren } from "react";

import clsx, { ClassValue } from "clsx";
import { Dayjs } from "dayjs";

import TimeLeft from "@/components/ui/TimeLeft";

import { useCountdown } from "@/hooks/useCountdown";

type Props = {
  targetDate: Dayjs;
  className?: ClassValue;
} & PropsWithChildren;

const Countdown = ({ targetDate, className = "", children }: Props) => {
  const { countdown, done } = useCountdown(targetDate);

  if (done) {
    return <p className={clsx("", className)}>{children || "Finished!"}</p>;
  }

  return <TimeLeft countdown={countdown} className={className} />;
};

export default Countdown;
