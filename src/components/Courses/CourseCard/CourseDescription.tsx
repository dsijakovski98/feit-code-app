import { Fragment, useMemo } from "react";

import { Chip, Tooltip } from "@nextui-org/react";

import CategoryChip from "@/components/ui/CategoryChip";

import { CourseCardContext } from "@/context/CourseCardContext";
import { useCtx } from "@/hooks/useCtx";
import { TEACHER_TYPE, USER_TYPE } from "@/types";

const CATEGORIES_SLICE = 3;

const CourseDescription = () => {
  const { course, mode } = useCtx(CourseCardContext);
  const { description, categories, professor } = course;

  const categoriesList = useMemo(() => categories.map(({ category }) => category), [categories]);

  const categoriesSlice = useMemo(() => categoriesList.slice(0, CATEGORIES_SLICE), [categoriesList]);
  const remainingCategories = useMemo(() => categoriesList.slice(CATEGORIES_SLICE), [categoriesList]);

  const numRemaining = useMemo(
    () => Math.min(Math.max(0, categoriesList.length - CATEGORIES_SLICE), 9),
    [categoriesList.length],
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

        {numRemaining > 0 && (
          <li className="cursor-pointer">
            <Tooltip
              content={
                <ul className="flex items-center gap-0.5">
                  {remainingCategories.map(({ label }, idx) => (
                    <Fragment>
                      <li key={label}>{label}</li>
                      {idx < remainingCategories.length - 1 && <span className="text-xs font-bold">・</span>}
                    </Fragment>
                  ))}
                </ul>
              }
              classNames={{ content: "font-semibold text-sm" }}
            >
              <Chip
                size="sm"
                className="text-xs"
                color="secondary"
                classNames={{
                  content: "font-semibold",
                }}
              >
                +{numRemaining}
              </Chip>
            </Tooltip>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CourseDescription;
