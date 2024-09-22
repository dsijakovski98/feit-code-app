import { useMemo } from "react";

import { Chip } from "@nextui-org/react";

import CategoryChip from "@/components/ui/CategoryChip";

import { CourseCardContext } from "@/context/CourseCardContext";
import { useCtx } from "@/hooks/useCtx";
import { TEACHER_TYPE, USER_TYPE } from "@/types";

const CATEGORIES_SLICE = 3;

const CourseDescription = () => {
  const { course, mode } = useCtx(CourseCardContext);
  const { description, categories, professor } = course;

  const categoriesSlice = useMemo(
    () => categories.slice(0, CATEGORIES_SLICE).map(({ category }) => category),
    [categories],
  );
  const remainingCategories = useMemo(
    () => Math.min(Math.max(0, categories.length - CATEGORIES_SLICE), 9),
    [categories.length],
  );

  if (mode === USER_TYPE.student) {
    return (
      <div>
        <p className="text-sm font-semibold">{TEACHER_TYPE.professor}</p>
        <p className="text-lg">
          {professor.firstName} {professor.lastName}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <p className="truncate pb-1 text-medium text-foreground-400 lg:text-base">{description}</p>

      <ul className="flex min-h-[25px] flex-wrap items-center gap-1.5 lg:hidden">
        {categoriesSlice.map((category) => (
          <li key={category.label}>
            <CategoryChip category={category} />
          </li>
        ))}

        {remainingCategories > 0 && (
          <li>
            <Chip
              size="sm"
              className="text-xs lg:text-[11px]"
              color="primary"
              classNames={{
                content: "font-semibold",
              }}
            >
              +{remainingCategories}
            </Chip>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CourseDescription;
