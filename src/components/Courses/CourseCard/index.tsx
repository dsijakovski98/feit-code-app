import clsx from "clsx";

import CourseActions from "@/components/Courses/CourseCard/CourseActions";
import CourseDescription from "@/components/Courses/CourseCard/CourseDescription";

import CourseCardProvider, { CourseCardContext } from "@/context/CourseCardContext";

const CourseCard = (props: CourseCardContext) => {
  const { course } = props;
  const { name, academicYear, archived } = course;

  return (
    <CourseCardProvider {...props}>
      <div className="relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-md border border-content3 bg-content1 p-6 font-sans shadow-md dark:border-transparent dark:bg-primary-50 lg:p-4">
        <div
          className={clsx(
            "flex h-full w-[36ch] flex-col justify-between space-y-5 overflow-hidden lg:space-y-2",
            {
              "!justify-start": archived,
            },
          )}
        >
          <div>
            <span className="text-sm font-semibold text-primary dark:text-primary-700">{academicYear}</span>

            <h3 className="flex w-full items-end gap-4 truncate text-xl font-semibold lg:text-lg">{name}</h3>
          </div>

          <CourseDescription />

          <CourseActions />
        </div>

        {archived && (
          <div className="pointer-events-none absolute inset-0 bg-foreground-200/20">
            <p className="text-centers absolute inset-x-0 bottom-0 z-10 bg-foreground-200 py-1 text-center text-xs font-bold uppercase text-white dark:bg-foreground-100">
              Archived
            </p>
          </div>
        )}
      </div>
    </CourseCardProvider>
  );
};

export default CourseCard;
