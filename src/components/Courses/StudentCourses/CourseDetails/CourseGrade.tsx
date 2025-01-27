import { Spinner } from "@heroui/spinner";
import { Tooltip } from "@heroui/tooltip";
import { useQuery } from "@tanstack/react-query";

import Icon from "@/components/ui/Icon";

import { getCourseGrade } from "@/actions/courses";
import { JoinedCourseContext } from "@/context/JoinedCourseContext";
import { useCtx } from "@/hooks/useCtx";
import { GRADE_RULES } from "@/utils/courses/grade";

const CourseGrade = () => {
  const { joinedData } = useCtx(JoinedCourseContext);
  const { studentId, courseId } = joinedData;

  const { data: grade, isPending } = useQuery({
    queryKey: [{ name: "course-grade", courseId, studentId }],
    queryFn: async () => {
      return await getCourseGrade({ studentId, courseId });
    },
  });

  return (
    <div className="flex flex-col gap-1 space-y-1 md:items-center">
      <div className="grid aspect-square h-[70px] w-[70px] shrink-0 place-items-center rounded-md bg-default dark:bg-default-100">
        {isPending ? <Spinner /> : <p className="text-5xl font-semibold">{grade ?? "-"}</p>}
      </div>

      <Tooltip
        placement="right-end"
        content={
          <ol>
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
