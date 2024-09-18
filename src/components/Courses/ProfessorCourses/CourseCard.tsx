import { Link } from "react-router-dom";

import clsx from "clsx";

import { ProfessorCourseType } from "@/hooks/professor/useProfessorCourses";

type Props = {
  course: ProfessorCourseType;
};

const CourseCard = ({ course }: Props) => {
  const { name, description, academicYear, archived, students, exams, assistantId } = course;

  return (
    <Link
      to="#"
      className={clsx(
        "relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-md bg-background p-6 py-4 font-quicksand shadow-md",
        { "pointer-events-none": archived, group: !archived },
      )}
    >
      <div className="max-w-[30ch] overflow-hidden *:transition-colors *:group-hover:!text-primary">
        <h3 className="mb-2 flex w-full items-end gap-4 truncate text-xl font-semibold">
          {name}
          <span className="ml-auto inline-block rounded-lg bg-primary p-1.5 text-sm text-primary-foreground">
            {academicYear}
          </span>
        </h3>

        <p className="mb-3 truncate pb-1 text-medium font-medium text-foreground-300">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-10 *:transition-colors *:group-hover:!text-primary">
        <div>
          <p className="text-3xl font-bold">{students.length}</p>
          <p>Students</p>
        </div>

        <div>
          <p className="text-3xl font-bold">{exams.length}</p>
          <p>Exams</p>
        </div>

        <div>
          <p className="text-2xl font-bold">{assistantId ? "YES" : "NO"}</p>
          <p>Assistant</p>
        </div>
      </div>

      {archived && (
        <div className="absolute inset-0 bg-foreground-200/20 backdrop-grayscale">
          <p className="text-centers absolute inset-x-0 bottom-1/2 z-10 w-[calc(100%+40px)] -translate-x-5 translate-y-1/2 rotate-[-15deg] bg-slate-900 py-1.5 text-center text-sm font-bold uppercase text-white">
            Archived
          </p>
        </div>
      )}
    </Link>
  );
};

export default CourseCard;
