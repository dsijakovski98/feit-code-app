import { eq } from "drizzle-orm";

import { submissions } from "@/db/schema";

import { SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";

type FeedbackOptions = {
  submissionId: string;
  feedback: string;
};
export const addFeedback = async ({ submissionId, feedback }: FeedbackOptions) => {
  try {
    await db
      .update(submissions)
      .set({
        feedback,
        status: SUBMISSION_STATUS.graded,
      })
      .where(eq(submissions.id, submissionId));

    // TODO: Notify student that their exam has been graded

    return true;
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to submit feedback!");
  }
};

type Options = Pick<FeedbackOptions, "submissionId">;
export const updateSubmissionGrading = async ({ submissionId }: Options) => {
  try {
    await db
      .update(submissions)
      .set({ status: SUBMISSION_STATUS.inProgress })
      .where(eq(submissions.id, submissionId));

    // TODO: Notify student that their exam is being graded

    return true;
  } catch (e) {
    // TODO: Sentry logging
    console.log({ e });

    throw new Error("Failed to update submission status to In progress...");
  }
};
