import clsx from "clsx";

import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";

import CategoryChip from "@/components/ui/CategoryChip";
import Teacher from "@/components/ui/Teacher";
import Timestamp from "@/components/ui/Timestamp";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { TEACHER_TYPE } from "@/types";

const CourseDetails = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name, description, professor, assistant, categories, archived, updatedAt } = courseDetails;

  return (
    <div className="space-y-16">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold">
            {name}{" "}
            {archived && (
              <Chip
                size="sm"
                color="default"
                className="ml-2 -translate-y-1 px-2"
                classNames={{ content: "font-semibold text-sm" }}
              >
                Archived
              </Chip>
            )}
          </h2>

          <Tooltip
            content={description}
            className="max-w-[60ch] p-2"
            classNames={{ content: "font-sans font-medium text-base" }}
          >
            <p className="mb-1 line-clamp-3 font-medium text-foreground-400">{description}</p>
          </Tooltip>
          <p>
            Updated <Timestamp>{updatedAt}</Timestamp>
          </p>
        </div>

        <p className="text-xl font-semibold">{courseDetails.academicYear}</p>
      </div>

      <div className="space-y-8">
        <ul className="flex max-w-[40ch] flex-wrap items-center gap-2 lg:gap-1">
          {categories.map(({ category, categoryId }) => (
            <li key={categoryId}>
              <CategoryChip category={category} />
            </li>
          ))}
        </ul>

        <div
          className={clsx("flex w-fit flex-wrap items-end gap-8 lg:w-full lg:justify-between", {
            "items-center": !assistant,
          })}
        >
          <Teacher teacher={professor} type={TEACHER_TYPE.professor} />

          {assistant ? (
            <Teacher teacher={assistant} type={TEACHER_TYPE.assistant} />
          ) : (
            <p className="max-w-[20ch] shrink text-sm text-foreground-300">
              This course doesn't have an assistant.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
