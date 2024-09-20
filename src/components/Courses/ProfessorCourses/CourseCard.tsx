import { useMemo } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";

import { Chip } from "@nextui-org/react";

import CategoryChip from "@/components/ui/CategoryChip";
import Icon from "@/components/ui/Icon";

import { ProfessorCourseType } from "@/hooks/professor/useProfessorCourses";

type Props = {
  course: ProfessorCourseType;
};

const CATEGORIES_SLICE = 3;

const CourseCard = ({ course }: Props) => {
  const { id, name, description, academicYear, archived, categories } = course;

  const categoriesSlice = useMemo(
    () => categories.slice(0, CATEGORIES_SLICE).map(({ category }) => category),
    [categories],
  );
  const remainingCategories = useMemo(
    () => Math.min(Math.max(0, categories.length - CATEGORIES_SLICE), 9),
    [categories.length],
  );

  return (
    <div className="relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-md border border-content3 p-6 font-quicksand shadow-md dark:border-transparent dark:bg-primary-50 lg:p-4">
      <div
        className={clsx(
          "flex h-full w-[36ch] flex-col justify-between space-y-5 overflow-hidden lg:w-[30ch] lg:space-y-2",
          {
            "!justify-start": archived,
          },
        )}
      >
        <div>
          <span className="text-sm font-semibold text-primary">Course of {academicYear}</span>
          <h3 className="flex w-full items-end gap-4 truncate text-xl font-semibold lg:text-lg">
            {name}
          </h3>
        </div>

        <div className="space-y-2">
          <p className="truncate pb-1 text-medium text-foreground-400 lg:text-base">
            {description}
          </p>

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

        {!archived && (
          <Link
            to={id}
            className="group mt-auto flex w-fit items-center justify-between gap-2 p-2.5 pb-0 pl-0 font-semibold lg:gap-1"
          >
            Details{" "}
            <Icon
              name="right"
              className="h-5 w-5 -translate-x-2 translate-y-px scale-90 opacity-0 transition-[opacity_transform] group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 lg:translate-x-0 lg:opacity-100"
            />
          </Link>
        )}
      </div>

      {archived && (
        <div className="absolute inset-0 bg-foreground-200/20 backdrop-grayscale">
          <p className="text-centers absolute inset-x-0 bottom-0 z-10 bg-foreground-200 py-1 text-center text-xs font-bold uppercase text-white dark:bg-foreground-100">
            Archived
          </p>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
