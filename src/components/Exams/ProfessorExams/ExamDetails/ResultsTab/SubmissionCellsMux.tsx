import { Chip } from "@nextui-org/chip";

import SubmissionActions from "@/components/Exams/ProfessorExams/ExamDetails/ResultsTab/SubmissionActions";
import StudentCell from "@/components/ui/Table/Cells/StudentCell";
import Timestamp from "@/components/ui/Timestamp";

import { EXAM_RESULTS_COLUMNS } from "@/constants/exams";
import { ExamSubmissionContext } from "@/context/ExamSubmissionContext";
import { useAvatar } from "@/hooks/useAvatar";
import { useCtx } from "@/hooks/useCtx";
import { ColumnKey } from "@/types";
import { submissionStatusColor } from "@/utils/exams/results";

type Props = {
  columnKey: ColumnKey<typeof EXAM_RESULTS_COLUMNS.lg>;
};

const SubmissionCellsMux = ({ columnKey }: Props) => {
  const { submission } = useCtx(ExamSubmissionContext);
  const { student, submittedAt, status } = submission;
  const { firstName, lastName, email } = student;

  const [studentAvatar, isLoading] = useAvatar(student.id);

  if (columnKey === "student") {
    return (
      <StudentCell student={{ firstName, lastName, email }} avatar={{ url: studentAvatar, isLoading }} />
    );
  }

  if (columnKey === "timestamp") {
    return <Timestamp>{submittedAt}</Timestamp>;
  }

  if (columnKey === "status") {
    return (
      <Chip size="sm" color={submissionStatusColor(status!)} classNames={{ content: "text-sm" }}>
        {status}
      </Chip>
    );
  }

  if (columnKey === "actions") {
    return <SubmissionActions />;
  }

  return columnKey;
};

export default SubmissionCellsMux;
