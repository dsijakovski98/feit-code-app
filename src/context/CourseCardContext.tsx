import { PropsWithChildren, createContext } from "react";

import { InferSelectModel } from "drizzle-orm";

import { categories, courses, professors } from "@/db/schema";

import { UserType } from "@/types";

export type CourseType = InferSelectModel<typeof courses> & {
  professor: InferSelectModel<typeof professors>;
  categories: Array<{ categoryId: string; category: InferSelectModel<typeof categories> }>;
};

export type CourseCardContext = {
  course: CourseType;
  mode: UserType;
};

export const CourseCardContext = createContext<CourseCardContext | null>(null);
CourseCardContext.displayName = "CourseCardContext";

type Props = CourseCardContext & PropsWithChildren;

const CourseCardProvider = ({ children, ...ctx }: Props) => {
  return <CourseCardContext.Provider value={ctx}>{children}</CourseCardContext.Provider>;
};

export default CourseCardProvider;
