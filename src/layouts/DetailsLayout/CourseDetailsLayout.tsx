import { Navigate, Outlet, useParams } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useCourseDetails } from "@/hooks/course/useCourseDetails";

const CourseDetailsLayout = () => {
  const { id } = useParams<{ id: string }>();

  const { error } = useCourseDetails(id);

  if (error) {
    return <Navigate to={ROUTES.courses} replace />;
  }

  return <Outlet />;
};

export default CourseDetailsLayout;
