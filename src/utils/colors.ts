import { EXAM_STATUS, ExamStatus } from "@/constants/enums";
import { ThemeColor } from "@/types";

export const examStatusColor = (status: ExamStatus): ThemeColor => {
  switch (status) {
    case EXAM_STATUS.new:
      return "primary";

    case EXAM_STATUS.completed:
      return "default";

    case EXAM_STATUS.ongoing:
      return "secondary";

    default:
      throw new Error(`Invalid exam status: ${status}`);
  }
};
