import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/tooltip";

import Icon from "@/components/ui/Icon";

import { JoinedCourseContext } from "@/context/JoinedCourseContext";
import { useStudentCourseGrade } from "@/hooks/student/useStudentCourseGrade";
import { useCtx } from "@/hooks/useCtx";
import { GRADE_RULES } from "@/utils/courses/grade";

const CourseGrade = () => {
  const { joinedData } = useCtx(JoinedCourseContext);
  const { studentId, courseId } = joinedData;

  const { data: grade, isPending } = useStudentCourseGrade({ studentId, courseId });

  return (
    <div className="space-y-1">
      <div className="grid aspect-square max-h-[70px] max-w-[70px] place-items-center rounded-md bg-default dark:bg-default-100">
        {isPending ? <Spinner /> : <p className="text-5xl font-semibold">{grade ?? "-"}</p>}
      </div>

      <Tooltip
        placement="bottom"
        content={
          <ol className="space-y-0.5">
            <p className="text-base font-semibold">Grade Rules</p>

            {GRADE_RULES.map(([rule, grade]) => (
              <li key={rule} className="flex items-center justify-between gap-5 text-base">
                <p>{rule}</p>
                <p className="text-lg font-semibold">{grade}</p>
              </li>
            ))}
          </ol>
        }
      >
        <p>
          Course Grade <Icon name="info" className="inline h-4 w-4 -translate-y-px" />
        </p>
      </Tooltip>
    </div>
  );
};

export default CourseGrade;
