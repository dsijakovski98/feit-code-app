import { useEffect, useMemo, useState } from "react";

import dayjs, { Dayjs } from "dayjs";

const getHours = (seconds: number) => Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
const getMinutes = (seconds: number) => Math.floor((seconds % (60 * 60)) / 60);
const getSeconds = (seconds: number) => Math.floor(seconds % 60);

const calcDuration = (targetDate: Dayjs) => {
  const targetDateUtc = dayjs.tz(targetDate, "UTC");
  const nowUtc = dayjs.tz(dayjs(), "UTC");

  return targetDateUtc.diff(nowUtc, "seconds");
};

export const useCountdown = (targetDate: Dayjs) => {
  const [duration, setDuration] = useState(calcDuration(targetDate));
  const countdown = useMemo(
    () => ({
      hours: getHours(duration),
      minutes: getMinutes(duration),
      seconds: getSeconds(duration),
    }),
    [duration],
  );

  const done = useMemo(() => duration <= 0, [duration]);

  useEffect(() => {
    const timer = setInterval(() => {
      const newDuration = calcDuration(targetDate);
      setDuration(newDuration);

      if (newDuration <= 0) {
        clearInterval(timer);
      }

      return () => {
        clearInterval(timer);
      };
    }, 1000);
  }, [targetDate]);

  return { countdown, done };
};
