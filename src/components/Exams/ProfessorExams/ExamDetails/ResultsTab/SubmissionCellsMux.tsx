import SubmissionStatus from "@/components/Exams/ProfessorExams/ExamDetails/ResultsTab/Misc/SubmissionStatus";
import SubmissionActions from "@/components/Exams/ProfessorExams/ExamDetails/ResultsTab/SubmissionActions";
import StudentCell from "@/components/ui/Table/Cells/StudentCell";
import Timestamp from "@/components/ui/Timestamp";

import { EXAM_RESULTS_COLUMNS } from "@/constants/exams";
import { ExamSubmissionContext } from "@/context/ExamSubmissionContext";
import { useCtx } from "@/hooks/useCtx";
import { ColumnKey } from "@/types";

type Props = {
  columnKey: ColumnKey<typeof EXAM_RESULTS_COLUMNS.lg>;
};

const SubmissionCellsMux = ({ columnKey }: Props) => {
  const { submission } = useCtx(ExamSubmissionContext);
  const { student, submittedAt, status } = submission;
  const { firstName, lastName, email, avatarUrl } = student;

  if (columnKey === "student") {
    return <StudentCell student={{ firstName, lastName, email }} avatar={{ url: avatarUrl }} />;
  }

  if (columnKey === "timestamp") {
    return <Timestamp>{submittedAt}</Timestamp>;
  }

  if (columnKey === "status") {
    return <SubmissionStatus status={status!} />;
  }

  if (columnKey === "actions") {
    return <SubmissionActions />;
  }

  return columnKey;
};

export default SubmissionCellsMux;
