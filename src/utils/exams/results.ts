import { ChipProps } from "@nextui-org/react";

import { SUBMISSION_STATUS, SubmissionStatus } from "@/constants/enums";

export const submissionStatusColor = (status: SubmissionStatus): ChipProps["color"] => {
  if (status === SUBMISSION_STATUS.submitted) return "default";

  if (status === SUBMISSION_STATUS.inProgress) return "secondary";

  if (status === SUBMISSION_STATUS.graded) return "secondary";

  throw new Error(`Invalid submission status: ${status}`);
};

export const submissionStatusLabel = (status: SubmissionStatus) => {
  if (status === SUBMISSION_STATUS.submitted) {
    return "Pending Grade";
  }

  if (status === SUBMISSION_STATUS.inProgress) {
    return "Grading";
  }

  if (status === SUBMISSION_STATUS.graded) {
    return "Graded";
  }

  throw new Error(`Invalid submission status: ${status}`);
};

export const submissionStatusDescription = (status: SubmissionStatus) => {
  if (status === SUBMISSION_STATUS.submitted) {
    return "This submission is awaiting to be graded.";
  }

  if (status === SUBMISSION_STATUS.inProgress) {
    return "You are currently grading this submission.";
  }

  if (status === SUBMISSION_STATUS.graded) {
    return "This submission has been graded.";
  }

  throw new Error(`Invalid submission status: ${status}`);
};
