import { useEffect, useMemo, useState } from "react";

import { Dayjs } from "dayjs";

import { getSecondsRemaining } from "@/utils/dates";

const getHours = (seconds: number) => Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
const getMinutes = (seconds: number) => Math.floor((seconds % (60 * 60)) / 60);
const getSeconds = (seconds: number) => Math.floor(seconds % 60);

export const useCountdown = (targetDate: Dayjs) => {
  const [duration, setDuration] = useState(getSecondsRemaining(targetDate));
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
      setDuration((prev) => {
        const newDuration = prev - 1;

        if (newDuration <= 0) {
          clearInterval(timer);
        }

        return newDuration;
      });

      return () => {
        clearInterval(timer);
      };
    }, 1000);
  }, [targetDate]);

  return { countdown, done, secondsRemaining: duration };
};

export type UseCountdown = ReturnType<typeof useCountdown>;
