import { PropsWithChildren } from "react";

import { Chip } from "@nextui-org/react";

import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { parseExamStatus } from "@/utils";
import { examStatusColor } from "@/utils/colors";

const DetailsHeader = ({ children }: PropsWithChildren) => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { status } = examDetails;

  return (
    <div className="flex items-start justify-between gap-6">
      <div>{children}</div>

      <Chip color={examStatusColor(status)} classNames={{ content: "text-sm font-semibold" }}>
        {parseExamStatus(status)}
      </Chip>
    </div>
  );
};

export default DetailsHeader;
