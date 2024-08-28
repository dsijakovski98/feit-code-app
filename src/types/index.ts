import { Dispatch, SetStateAction } from "react";

export type RecordValues<T extends Record<string, unknown>> = T[keyof T];

export type UseState<T> = [T, Dispatch<SetStateAction<T>>];

export type UserType = "student" | "professor";
