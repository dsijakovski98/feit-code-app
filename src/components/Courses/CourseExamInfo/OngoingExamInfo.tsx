import { InferSelectModel } from "drizzle-orm";

import { exams } from "@/db/schema";

type Props = {
  exam: InferSelectModel<typeof exams>;
};

// TODO: Implement UI
const OngoingExamInfo = ({ exam }: Props) => {
  console.log(exam);
  return <div>OngoingExamInfo</div>;
};

export default OngoingExamInfo;
