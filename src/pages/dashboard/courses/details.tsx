import { Link, useParams } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

import CourseDetailsTabs from "@/components/Courses/ProfessorCourses/CourseDetails";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import CourseDetailsProvider from "@/context/CourseDetailsContext";
import { useCourseDetails } from "@/hooks/course/useCourseDetails";

const CourseDetailsPage = () => {
  // TODO: Implement Course details page
  const { id } = useParams<{ id: string }>();

  const { data, error, isLoading } = useCourseDetails(id);

  if (error) {
    return (
      <section className="grid h-full place-items-center content-center gap-4 bg-primary-50/20 pt-4 lg:pt-2">
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

  if (isLoading || !data) {
    return (
      <section className="grid h-full place-items-center content-center gap-4 bg-primary-50/20 pt-4 lg:pt-2">
        <Spinner size="lg" className="scale-150" />
      </section>
    );
  }

  return (
    <CourseDetailsProvider courseDetails={data}>
      <CourseDetailsTabs />
    </CourseDetailsProvider>
  );
};

export default CourseDetailsPage;
