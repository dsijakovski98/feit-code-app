import { PropsWithChildren, createContext } from "react";

import { CourseDetails } from "@/hooks/course/useCourseDetails";

type CourseDetailsContext = {
  courseDetails: CourseDetails;
};

export const CourseDetailsContext = createContext<CourseDetailsContext | null>(null);
CourseDetailsContext.displayName = "CourseDetailsContext";

type Props = CourseDetailsContext & PropsWithChildren;

const CourseDetailsProvider = ({ courseDetails, children }: Props) => {
  return (
    <CourseDetailsContext.Provider value={{ courseDetails }}>
      {children}
    </CourseDetailsContext.Provider>
  );
};

export default CourseDetailsProvider;
