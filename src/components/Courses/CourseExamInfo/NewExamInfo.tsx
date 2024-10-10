import { useMemo } from "react";

import { InferSelectModel } from "drizzle-orm";

import { exams } from "@/db/schema";

import Button from "@/components/ui/Button";

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

      <Button size="lg" color="default" variant="ghost">
        Details
      </Button>
    </div>
  );
};

export default NewExamInfo;
