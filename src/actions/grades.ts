import { eq } from "drizzle-orm";

import { submissions } from "@/db/schema";

import { RunCodeOptions } from "@/actions/exam-session";
import { SUBMISSION_STATUS } from "@/constants/enums";
import { db } from "@/db";
import { SubmissionDetails } from "@/hooks/submission/useSubmissionDetails";

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

export type TestResult = {
  message: string;
  success: boolean;
} | null;

type SingleTestRunOptions = {
  test: SubmissionDetails["exam"]["tasks"][number]["tests"][number];
} & RunCodeOptions;
export const runSingleTest = async (_: SingleTestRunOptions) => {
  // TODO: AST parse endpoint

  // TODO: Check output type

  return { message: "Test ran successfully", success: true } satisfies TestResult;
};

type RunTestsOptions = {
  tests: Array<SingleTestRunOptions["test"]>;
} & RunCodeOptions;
export const runTests = async ({ tests, ...options }: RunTestsOptions) => {
  const results = await Promise.all(
    tests.map(async (test) => {
      const testResult = await runSingleTest({ test, ...options });
      return { id: test.id, testResult };
    }),
  );

  return results.reduce(
    (acc, result) => {
      acc[result.id] = result.testResult;
      return acc;
    },
    {} as Record<string, TestResult>,
  );
};
