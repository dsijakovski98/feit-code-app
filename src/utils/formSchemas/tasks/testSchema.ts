import { InferInput, object } from "valibot";

export const TaskTestSchema = object({});

export type TaskTestSchema = InferInput<typeof TaskTestSchema>;
