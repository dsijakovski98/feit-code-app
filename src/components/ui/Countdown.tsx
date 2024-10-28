import clsx, { ClassValue } from "clsx";
import { Dayjs } from "dayjs";

import { useCountdown } from "@/hooks/useCountdown";

type Props = {
  targetDate: Dayjs;
  className?: ClassValue;
};

const Countdown = ({ targetDate, className = "" }: Props) => {
  const { countdown, done } = useCountdown(targetDate);

  if (done) {
    return <p className={clsx("", className)}>Finished!</p>;
  }

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

export default Countdown;
