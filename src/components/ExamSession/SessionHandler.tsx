import { ExamSessionContext } from "@/context/ExamSessionContext";
import { useExamTimeOff } from "@/hooks/exam/useExamTimeOff";
import { useJoinExam } from "@/hooks/exam/useJoinExam";
import { useCtx } from "@/hooks/useCtx";

const SessionHandler = () => {
  const { student, exam } = useCtx(ExamSessionContext);
  const { id: studentId } = student;
  const { id: examId } = exam;

  useJoinExam({ examId, studentId });
  useExamTimeOff({ examId, studentId });

  return null;
};

export default SessionHandler;
