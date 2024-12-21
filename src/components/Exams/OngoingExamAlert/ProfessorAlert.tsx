import ExamAlert from "@/components/Exams/OngoingExamAlert/ExamAlert";

import { useProfessorOngoingExam } from "@/hooks/professor/useProfessorOngoingExam";
import { USER_TYPE } from "@/types";

type Props = {
  professorId: string;
};

const ProfessorExamAlert = ({ professorId }: Props) => {
  const { data: exam } = useProfessorOngoingExam(professorId);

  if (!exam) return null;

  return <ExamAlert exam={exam} userType={USER_TYPE.professor} />;
};

export default ProfessorExamAlert;
