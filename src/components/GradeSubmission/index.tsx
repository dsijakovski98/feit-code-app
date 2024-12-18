import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCtx } from "@/hooks/useCtx";

const GradeSubmission = () => {
  const { submission } = useCtx(GradeSubmissionContext);
  console.log(submission);

  return <div className="bg-main p-8 lg:p-5">GradeSubmission</div>;
};

export default GradeSubmission;
