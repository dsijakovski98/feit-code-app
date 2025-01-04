import { Link, useParams } from "react-router-dom";

import { Spinner } from "@nextui-org/spinner";

import NewExamForm from "@/components/Exams/Forms/NewExamForm";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";
import CourseDetailsProvider from "@/context/CourseDetailsContext";
import ExamFormProvider from "@/context/ExamFormContext";
import { useCourseDetails } from "@/hooks/course/useCourseDetails";

const NewExamPage = () => {
  const { id } = useParams<{ id: string }>();

  const { data: courseDetails, isLoading, error } = useCourseDetails(id);

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

  if (isLoading) {
    return (
      <section className="bg-main grid h-full place-items-center content-center gap-4 pt-4 lg:pt-2">
        <Spinner size="lg" className="scale-150" />
      </section>
    );
  }

  return (
    <section className="bg-main flex h-full items-start gap-4 px-8 py-6 lg:flex-col lg:justify-start lg:gap-6 lg:px-5">
      <Link
        to={`${ROUTES.dashboard}${ROUTES.courses}/${id}`}
        className="flex w-fit items-center font-semibold uppercase transition-colors hover:text-primary-500 focus:text-primary-500 lg:-translate-x-1 lg:gap-0.5 lg:text-lg"
      >
        <Icon name="left" className="h-6 w-6" />
        Back to Course
      </Link>

      <div className="mx-auto h-full w-[80ch] -translate-x-[80px] -translate-y-1 xl:translate-x-0 lg:w-full lg:translate-y-0">
        {courseDetails && (
          <CourseDetailsProvider courseDetails={courseDetails}>
            <ExamFormProvider>
              <NewExamForm />
            </ExamFormProvider>
          </CourseDetailsProvider>
        )}
      </div>
    </section>
  );
};

export default NewExamPage;
