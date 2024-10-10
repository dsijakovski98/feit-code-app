import { useMemo } from "react";

import { InferSelectModel } from "drizzle-orm";

import { exams } from "@/db/schema";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { formatTimestamp } from "@/utils/dates";

type Props = {
  exam: InferSelectModel<typeof exams>;
};

const NewExamInfo = ({ exam }: Props) => {
  const { startsAt } = exam;
  const timestamp = useMemo(() => formatTimestamp(startsAt), [startsAt]);

  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <p>Taking place</p>
        <p className="text-lg font-bold">{timestamp}</p>
      </div>

      <Button
        size="lg"
        color="default"
        variant="bordered"
        className="group"
        endContent={
          <Icon
            name="right"
            className="h-5 w-5 transition-transform group-hover:translate-x-1 group-focus:translate-x-1"
          />
        }
      >
        Exam details
      </Button>
    </div>
  );
};

export default NewExamInfo;
