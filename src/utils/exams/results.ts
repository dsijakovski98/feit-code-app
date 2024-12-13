import { ChipProps } from "@nextui-org/react";

import { SubmissionStatus } from "@/constants/enums";

export const submissionStatusColor = (status: SubmissionStatus): ChipProps["color"] => {
  if (status === "Submitted") return "default";

  if (status === "In Progress") return "secondary";

  if (status === "Graded") return "secondary";

  throw new Error(`Invalid submission status: ${status}`);
};
