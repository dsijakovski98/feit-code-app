import clsx from "clsx";

import Icon from "@/components/ui/Icon";

import { ExamCard } from "@/hooks/exam/useExams";

type Props = { isLink?: boolean } & Pick<ExamCard, "name" | "language" | "course">;

const ExamCardHeader = ({ name, language, course, isLink = false }: Props) => {
  return (
    <div>
      <p
        className={clsx("text-sm font-semibold", {
          "flex items-baseline gap-1 transition-colors group-hover:text-primary": isLink,
        })}
      >
        <span>{course.name}</span>
        {isLink && (
          <span>
            <Icon name="link" className="h-3 w-3" />
          </span>
        )}
      </p>

      <div
        className={clsx("truncate text-lg font-semibold leading-[1.2]", {
          "transition-colors group-hover:text-primary": isLink,
        })}
      >
        {name}・{language}
      </div>
    </div>
  );
};

export default ExamCardHeader;
