export type RecordValues<T extends Record<string, unknown>> = T[keyof T];
