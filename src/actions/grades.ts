import { eq } from "drizzle-orm";

import { submissions } from "@/db/schema";

import { RunCodeOptions, runTaskCode } from "@/actions/exam-session";
import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { ProgrammingLanguage, SUBMISSION_STATUS } from "@/constants/enums";
import { PLACEHOLDER_COMMENT } from "@/constants/grades";
import { db } from "@/db";
import { SubmissionDetails } from "@/hooks/submission/useSubmissionDetails";
import { isNumber } from "@/utils";
import { parseParameterValue, testFuncArguments } from "@/utils/code";
import { functionNameFromTitle } from "@/utils/code/taskTemplates";

type FeedbackOptions = {
  submissionId: string;
  graderId: string;
  feedback: string;
  points: number;
};
export const addFeedback = async ({ submissionId, graderId, feedback, points }: FeedbackOptions) => {
  try {
    await db
      .update(submissions)
      .set({
        points,
        feedback,
        graderId,
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

export type TestResultQueryKey = {
  name: "test-result";
  submissionId: string;
  testId: string;
};

type SingleTestRunOptions = {
  test: SubmissionDetails["exam"]["tasks"][number]["tests"][number];
} & RunCodeOptions;
export const runSingleTest = async ({ code, name, language, test, token }: SingleTestRunOptions) => {
  const langConfig = LANGUAGES_CONFIG[language];

  if (!langConfig.supportsTests) {
    throw new Error(`This language doesn't support tests!`);
  }

  // Generate test call components
  const funcName = functionNameFromTitle(name);
  const args = testFuncArguments(test.inputs, language);

  // Generate actual test call expression
  const funcCall = `${funcName}(${args})`;
  const testCallExpression = langConfig.testCallExpression(funcCall);

  // Replace placeholder comment with test call expression
  const testCode = code.replace(`${langConfig.comment} ${PLACEHOLDER_COMMENT}`, testCallExpression);

  const output = await runTaskCode({ code: testCode, name, language, token });

  return compareOutput({ output, test, language });
};

type RunTestsOptions = {
  tests: Array<SingleTestRunOptions["test"]>;
} & RunCodeOptions;
export const runTests = async ({ tests, ...options }: RunTestsOptions) => {
  const results: Record<string, TestResult> = {};

  for (const test of tests) {
    const testResult = await runSingleTest({ test, ...options });
    results[test.id] = testResult;
  }

  return results;
};

type CompareOptions = {
  output: string;
  test: SingleTestRunOptions["test"];
  language: ProgrammingLanguage;
};
const compareOutput = ({ output, test, language }: CompareOptions): TestResult => {
  let success = false;
  const emptyValue = LANGUAGES_CONFIG[language].emptyValue;
  const taskOutput = output.trim();

  if (test.outputType === "string") {
    success = taskOutput === test.outputValue;
  }

  if (test.outputType === "empty") {
    success = !!emptyValue && taskOutput === emptyValue;
  }

  if (test.outputType === "number") {
    const numOutput = Number(taskOutput);

    success = isNumber(numOutput) && numOutput === Number(test.outputValue);
  }

  if (test.outputType === "boolean") {
    success = taskOutput.toLowerCase() === test.outputValue.toLowerCase();
  }

  if (!success) {
    const expected = parseParameterValue(test.outputValue, test.outputType, emptyValue);
    const received = parseParameterValue(taskOutput, test.outputType, emptyValue);

    return { message: `Expected  ${expected}, but received: ${received}`, success: false };
  }

  return { message: "Test ran successfully!", success: true };
};

export const seenFeedback = async (submissionId: string) => {
  await db.update(submissions).set({ seen: true }).where(eq(submissions.id, submissionId));
};
