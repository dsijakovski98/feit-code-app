import { ChipProps } from "@nextui-org/chip";

import { ROUTES } from "@/constants/routes";
import { MonitorSession } from "@/context/MonitorExamContext";
import { simplePlural } from "@/utils";

export const sessionStatusColor = (status: MonitorSession["status"]): ChipProps["color"] => {
  if (status === "Active") return "success";

  if (status === "Finished") return "primary";

  if (status === "Removed") return "danger";

  return "default";
};

export const sessionTimeOffDuration = (totalTimeOff: number) => {
  if (totalTimeOff < 60) {
    return `${totalTimeOff} ${simplePlural("second", totalTimeOff)}`;
  }

  const totalMinutes = Math.floor(totalTimeOff / 60);

  if (totalMinutes < 60) {
    return `${totalMinutes} ${simplePlural("minute", totalMinutes)}`;
  }

  const totalHours = Math.floor(totalMinutes / 60);

  return `${totalHours} ${simplePlural("hour", totalHours)}`;
};

export const gradeExamHref = (examId: string, studentId: string) => {
  return `${ROUTES.exams}/${examId}${ROUTES.gradeExam}/${studentId}`;
};
