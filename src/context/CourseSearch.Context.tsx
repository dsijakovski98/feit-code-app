import { PropsWithChildren, createContext } from "react";

type CourseSearchContext = {
  search: string;
};

export const CourseSearchContext = createContext<CourseSearchContext | null>(null);

type Props = CourseSearchContext & PropsWithChildren;

const CourseSearchProvider = ({ children, ...ctx }: Props) => {
  return <CourseSearchContext.Provider value={ctx}>{children}</CourseSearchContext.Provider>;
};

export default CourseSearchProvider;
