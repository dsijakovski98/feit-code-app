import { InferSelectModel } from "drizzle-orm";

import { exams } from "@/db/schema";

type Props = {
  exam: InferSelectModel<typeof exams>;
};

// TODO: Implement UI
const CompletedExamInfo = ({ exam }: Props) => {
  console.log(exam);

  return <div>CompletedExamInfo</div>;
};

export default CompletedExamInfo;
