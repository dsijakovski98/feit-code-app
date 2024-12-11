import { ChipProps } from "@nextui-org/react";

import { MonitorSession } from "@/context/MonitorExamContext";

export const sessionStatusColor = (status: MonitorSession["status"]): ChipProps["color"] => {
  if (status === "Active") return "success";

  if (status === "Finished") return "primary";

  if (status === "Removed") return "danger";

  return "default";
};

export const sessionTimeOffDuration = (totalTimeOff: number) => {
  const timePlural = (time: string, value: number) => `${time}${value !== 1 ? "s" : ""}`;

  if (totalTimeOff < 60) {
    return `${totalTimeOff} ${timePlural("second", totalTimeOff)}`;
  }

  const totalMinutes = Math.floor(totalTimeOff / 60);

  if (totalMinutes < 60) {
    return `${totalMinutes} ${timePlural("minute", totalMinutes)}`;
  }

  const totalHours = Math.floor(totalMinutes / 60);

  return `${totalHours} ${timePlural("hour", totalHours)}`;
};
