import { useEffect, useMemo, useRef, useState } from "react";

import { Dayjs } from "dayjs";

import { getSecondsRemaining } from "@/utils/dates";

const getHours = (seconds: number) => Math.floor((seconds % (60 * 60 * 24)) / (60 * 60));
const getMinutes = (seconds: number) => Math.floor((seconds % (60 * 60)) / 60);
const getSeconds = (seconds: number) => Math.floor(seconds % 60);

export const useCountdown = (targetDate: Dayjs) => {
  const [duration, setDuration] = useState(getSecondsRemaining(targetDate));
  const timerRef = useRef<NodeJS.Timeout | null>(null);

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
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setDuration((prev) => {
        const newDuration = prev - 1;

        if (newDuration <= 0 && timerRef.current) {
          clearInterval(timerRef.current);
        }

        return newDuration;
      });

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, 1000);
  }, [targetDate]);

  return { countdown, done, secondsRemaining: duration };
};

export type UseCountdown = ReturnType<typeof useCountdown>;
