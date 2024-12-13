import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";

import { useCourseDetails } from "@/hooks/course/useCourseDetails";

const CourseDetailsLayout = () => {
  const { id } = useParams<{ id: string }>();
  const { pathname } = useLocation();

  const { data } = useCourseDetails(id);

  useEffect(() => {
    if (pathname.endsWith("new-exam")) {
      document.title = "FEIT Code | New Exam";
      return;
    }

    if (data?.name) {
      document.title = `FEIT Code | Course: ${data.name}`;
    }
  }, [pathname, data?.name]);

  return <Outlet />;
};

export default CourseDetailsLayout;
