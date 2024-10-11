import { useMemo } from "react";
import { Link } from "react-router-dom";

import clsx from "clsx";
import { InferSelectModel } from "drizzle-orm";

import { Chip } from "@nextui-org/react";

import { exams } from "@/db/schema";

import { parseExamStatus } from "@/utils";
import { examStatusColor } from "@/utils/colors";
import { formatTimestamp } from "@/utils/dates";

type Props = {
  exam: InferSelectModel<typeof exams>;
};

const NewExamInfo = ({ exam }: Props) => {
  const { id, startsAt, name, language, status } = exam;
  const timestamp = useMemo(() => formatTimestamp(startsAt), [startsAt]);

  return (
    <Link to={id} className="group space-y-0.5 *:font-sans">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="transition-colors group-hover:text-primary-600 group-focus:text-primary-600">
            Latest
          </p>
          <h2
            className={clsx(
              "text-xl font-bold transition-colors group-hover:text-primary-600 group-focus:text-primary-600",
            )}
          >
            {name}・{language}
          </h2>
        </div>

        <Chip color={examStatusColor(status)} classNames={{ content: "font-semibold text-sm" }}>
          {parseExamStatus(status)}
        </Chip>
      </div>

      <p className="text-lg text-foreground-300 transition-colors group-hover:text-primary-600 group-focus:text-primary-600">
        {timestamp}
      </p>
    </Link>
  );
};

export default NewExamInfo;
