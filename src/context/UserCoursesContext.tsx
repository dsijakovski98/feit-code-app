import { PropsWithChildren, createContext } from "react";

type UserCoursesContext = {
  courseIds: string[];
};

export const UserCoursesContext = createContext<UserCoursesContext | null>(null);

type Props = UserCoursesContext & PropsWithChildren;

const UserCoursesProvider = ({ children, ...ctx }: Props) => {
  return <UserCoursesContext.Provider value={ctx}>{children}</UserCoursesContext.Provider>;
};

export default UserCoursesProvider;
