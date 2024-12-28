import {
  InferInput,
  NonEmptyAction,
  RegexAction,
  SchemaWithPipe,
  StringSchema,
  TrimAction,
  nonEmpty,
  object,
  pipe,
  regex,
  string,
  trim,
} from "valibot";

import { SubmissionDetails } from "@/hooks/submission/useSubmissionDetails";

export const createFeedbackSchema = (tasks: SubmissionDetails["exam"]["tasks"]) => {
  return object({
    ...tasks.reduce(
      (schema, task) => {
        schema[task.title] = pipe(
          string(),
          trim(),
          nonEmpty("Required!"),
          regex(/^\d+$/, "Must be a positive number!"),
        );

        return schema;
      },
      {} as Record<
        string,
        SchemaWithPipe<
          [
            StringSchema<undefined>,
            TrimAction,
            NonEmptyAction<string, "Required!">,
            RegexAction<string, "Must be a positive number!">,
          ]
        >
      >,
    ),
  });
};

export type FeedbackSchema = InferInput<ReturnType<typeof createFeedbackSchema>>;
