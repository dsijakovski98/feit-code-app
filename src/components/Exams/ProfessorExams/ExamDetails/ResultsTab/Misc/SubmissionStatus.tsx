import { useMemo } from "react";

import { Chip } from "@nextui-org/chip";

import type { SubmissionStatus } from "@/constants/enums";
import { submissionStatusColor, submissionStatusLabel } from "@/utils/exams/results";

type Props = {
  status: SubmissionStatus;
};

const SubmissionStatus = ({ status }: Props) => {
  const label = useMemo(() => submissionStatusLabel(status), [status]);
  const color = useMemo(() => submissionStatusColor(status), [status]);

  return (
    <Chip size="sm" color={color} classNames={{ content: "text-sm px-1.5 font-medium" }}>
      {label}
    </Chip>
  );
};

export default SubmissionStatus;
