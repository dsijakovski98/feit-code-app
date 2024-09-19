import { useEffect } from "react";
import { Outlet, useParams } from "react-router-dom";

import { PAGE_TITLES } from "@/constants/routes";
import { useCourseDetails } from "@/hooks/course/useCourseDetails";

const CourseDetailsLayout = () => {
  const { id } = useParams<{ id: string }>();

  const { data } = useCourseDetails(id);

  useEffect(() => {
    if (!data?.name) return;

    document.title = `FEIT Code | ${PAGE_TITLES["/dashboard/courses"]}: ${data.name}`;
  }, [data?.name]);

  return <Outlet />;
};

export default CourseDetailsLayout;
