import { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";

import { Spinner } from "@heroui/spinner";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import CourseDetailsProvider from "@/context/CourseDetailsContext";
import { useCourseDetails } from "@/hooks/course/useCourseDetails";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const ProfessorCourseDetails = lazy(() => import("@/components/Courses/ProfessorCourses/CourseDetails"));
const StudentCourseDetails = lazy(() => import("@/components/Courses/StudentCourses/CourseDetails"));

const CourseDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const { userData, isLoading: userIsLoading } = useFCUser();
  const { data: course, error, isLoading } = useCourseDetails(id);

  if (error) {
    return (
      <section className="bg-main grid h-full place-items-center content-center gap-4 pt-4 lg:pt-2">
        <h2 className="text-2xl font-medium text-danger">{error.message}</h2>
        <Button
          variant="light"
          color="default"
          as={Link}
          // @ts-expect-error NextUI not passing through 'as' props
          to={ROUTES.courses}
          className="text-base"
          startContent={<Icon name="left" className="h-5 w-5" />}
        >
          Back to Courses
        </Button>
      </section>
    );
  }

  if (isLoading || userIsLoading) {
    return (
      <section className="bg-main grid h-full place-items-center content-center gap-4 pt-4 lg:pt-2">
        <Spinner size="lg" className="scale-150" />
      </section>
    );
  }

  if (!course || !userData) {
    return null;
  }

  return (
    <CourseDetailsProvider courseDetails={course}>
      <Helmet>
        <title>FEIT Code Course | {course.name}</title>
        <meta name="description" content={course.description ?? course.name} />
      </Helmet>

      <Suspense fallback={null}>
        {userData.type === USER_TYPE.student ? <StudentCourseDetails /> : <ProfessorCourseDetails />}
      </Suspense>
    </CourseDetailsProvider>
  );
};

export default CourseDetailsPage;
