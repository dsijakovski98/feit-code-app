import { useMemo } from "react";

import { InferSelectModel } from "drizzle-orm";

import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";

import { categories } from "@/db/schema";

import CategoryChip from "@/components/ui/CategoryChip";

import { CourseCardContext } from "@/context/CourseCardContext";
import { useCtx } from "@/hooks/useCtx";

const CATEGORIES_SLICE = 2;

const getSortedSlice = (list: InferSelectModel<typeof categories>[], start?: number, end?: number) => {
  return list.slice(start, end).sort((catA, catB) => catA.label.localeCompare(catB.label));
};

const CourseCategories = () => {
  const { course } = useCtx(CourseCardContext);
  const { categories } = course;

  const categoriesList = useMemo(() => {
    return categories
      .map(({ category }) => category)
      .sort((catA, catB) => catA.label.length - catB.label.length); // Show shortest category labels first
  }, [categories]);

  const categoriesSlice = useMemo(
    () => getSortedSlice(categoriesList, 0, CATEGORIES_SLICE),
    [categoriesList],
  );
  const remainingCategories = useMemo(
    () => getSortedSlice(categoriesList, CATEGORIES_SLICE),
    [categoriesList],
  );

  const numRemaining = useMemo(
    () => Math.min(Math.max(0, categoriesList.length - CATEGORIES_SLICE), 9),
    [categoriesList.length],
  );

  return (
    <ul className="flex min-h-[25px] flex-wrap items-center gap-1.5 lg:gap-1">
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
                  <div key={label} className="flex items-center gap-0.5">
                    <li>{label}</li>
                    {idx < remainingCategories.length - 1 && <span className="text-xs font-bold">・</span>}
                  </div>
                ))}
              </ul>
            }
            classNames={{ content: "font-semibold text-sm font-serif" }}
          >
            <Chip
              size="sm"
              className="text-xs"
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
  );
};

export default CourseCategories;
