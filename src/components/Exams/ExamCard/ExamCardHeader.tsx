import clsx from "clsx";

import { ExamCard } from "@/hooks/exam/useExams";

type Props = { isLink?: boolean } & Pick<ExamCard, "name" | "language" | "course">;

const ExamCardHeader = ({ name, language, course, isLink = false }: Props) => {
  return (
    <div>
      <p
        className={clsx("text-sm font-semibold", {
          "transition-colors group-hover:text-primary group-focus:text-primary": isLink,
        })}
      >
        {course.name}
      </p>

      <div
        className={clsx("truncate text-lg font-semibold leading-[1.2]", {
          "transition-colors group-hover:text-primary group-focus:text-primary": isLink,
        })}
      >
        {name}・{language}
      </div>
    </div>
  );
};

export default ExamCardHeader;
