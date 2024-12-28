import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";

import { ROUTES } from "@/constants/routes";
import { useCourseDetails } from "@/hooks/course/useCourseDetails";

const CourseDetailsLayout = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const { data, error } = useCourseDetails(id);

  useEffect(() => {
    if (pathname.endsWith("new-exam")) {
      document.title = "FEIT Code | New Exam";
      return;
    }

    if (data?.name) {
      document.title = `FEIT Code | Course: ${data.name}`;
    }
  }, [pathname, data?.name]);

  if (error) {
    return <Navigate to={ROUTES.courses} replace />;
  }

  return <Outlet />;
};

export default CourseDetailsLayout;
