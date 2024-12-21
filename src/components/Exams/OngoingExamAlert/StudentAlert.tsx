import ExamAlert from "@/components/Exams/OngoingExamAlert/ExamAlert";

import { useStudentOngoingExam } from "@/hooks/student/useStudentOngoingExam";
import { USER_TYPE } from "@/types";

type Props = {
  studentId: string;
};

const StudentExamAlert = ({ studentId }: Props) => {
  const { data: exam } = useStudentOngoingExam(studentId);

  if (!exam) return null;

  return <ExamAlert exam={exam} userType={USER_TYPE.student} />;
};

export default StudentExamAlert;
