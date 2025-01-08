import clsx from "clsx";
import { InferSelectModel } from "drizzle-orm";

import { Tooltip } from "@nextui-org/react";

import { exams } from "@/db/schema";

import Timestamp from "@/components/ui/Timestamp";

type Props = {
  exam: Pick<InferSelectModel<typeof exams>, "id" | "name" | "language" | "startsAt"> & {
    course: { id: string; name: string };
  };
  color?: "default" | "light";
};

const ExamStat = ({ exam, color = "default" }: Props) => {
  const { name, language, startsAt, course } = exam;
  const fullName = `${name}・${language}`;

  return (
    <Tooltip content={fullName} placement="top-start" classNames={{ content: "font-serif p-2" }}>
      <div>
        <p
          className={clsx("text-sm font-semibold", {
            "text-content4": color === "default",
            "text-foreground-300": color === "light",
          })}
        >
          {course.name}
        </p>

        <p className="line-clamp-1 text-base font-semibold">
          {fullName} (<Timestamp>{startsAt}</Timestamp>)
        </p>
      </div>
    </Tooltip>
  );
};

export default ExamStat;
