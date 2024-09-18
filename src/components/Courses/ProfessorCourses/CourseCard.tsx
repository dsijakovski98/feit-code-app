import { useMemo } from "react";
import { Link } from "react-router-dom";

import { Chip } from "@nextui-org/react";

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

  // TODO: Maybe add quick actions (Edit, Delete) for professors only
  return (
    <div className="relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-md bg-background px-4 py-6 font-quicksand shadow-md">
      <div className="flex h-full max-w-[30ch] flex-col justify-between space-y-6 overflow-hidden">
        <div>
          <span className="text-sm font-semibold text-primary">{academicYear}</span>
          <h3 className="flex w-full items-end gap-4 truncate text-xl font-semibold">{name}</h3>
        </div>

        <div className="space-y-1.5">
          <p className="truncate pb-1 text-medium text-foreground-400">{description}</p>

          <ul className="flex flex-wrap items-center gap-2">
            {categoriesSlice.map(({ label }) => (
              <li key={label}>
                <Chip
                  size="sm"
                  className="text-xs"
                  classNames={{
                    content: "font-semibold",
                  }}
                >
                  {label}
                </Chip>
              </li>
            ))}

            {remainingCategories > 0 && (
              <li>
                <Chip
                  size="sm"
                  className="text-xs"
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
            className="group mt-auto flex items-center justify-between gap-0.5 p-2 pb-0 pl-0 font-medium"
          >
            Details{" "}
            <Icon
              name="right"
              className="h-5 w-5 -translate-x-2 translate-y-px opacity-0 transition-[opacity_transform] group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100"
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
