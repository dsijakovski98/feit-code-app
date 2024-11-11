import clsx, { ClassValue } from "clsx";

import { UseCountdown } from "@/hooks/useCountdown";

type Props = {
  countdown: UseCountdown["countdown"];
  className?: ClassValue;
};

const TimeLeft = ({ countdown, className = "" }: Props) => {
  return (
    <div className={clsx("flex items-center gap-0.5 font-mono", className)}>
      <p>
        {countdown.hours < 10 && "0"}
        {countdown.hours}
      </p>
      <p>:</p>
      <p>
        {countdown.minutes < 10 && "0"}
        {countdown.minutes}
      </p>
      <p>:</p>
      <p>
        {countdown.seconds < 10 && "0"}
        {countdown.seconds}
      </p>
    </div>
  );
};

export default TimeLeft;
