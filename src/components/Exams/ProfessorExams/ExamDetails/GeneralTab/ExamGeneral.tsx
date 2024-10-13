import Teacher from "@/components/ui/Teacher";
import Timestamp from "@/components/ui/Timestamp";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";

const ExamGeneral = () => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { name, language, createdAt, course } = examDetails;

  return (
    <div className="space-y-8">
      <div>
        <p className="font-semibold text-primary-600">{course.name}</p>
        <h2 className="text-xl font-semibold">
          {name}・{language}
        </h2>
        <p className="text-lg text-foreground-300">
          Created <Timestamp>{createdAt}</Timestamp>
        </p>
      </div>

      <Teacher teacher={course.professor} type="Exam facilitator" />
    </div>
  );
};

export default ExamGeneral;
