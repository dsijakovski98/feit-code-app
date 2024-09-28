import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";

const NewExamForm = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);

  return (
    <form id="new-exam-form" className="space-y-5 lg:pb-4">
      <div className="mb-12">
        <h2 className="text-2xl font-semibold">Create a new exam</h2>
        <p className="text-foreground-300 lg:text-sm">
          Construct the perfect exam and test your students' skills the right way.
        </p>
      </div>
    </form>
  );
};

export default NewExamForm;
