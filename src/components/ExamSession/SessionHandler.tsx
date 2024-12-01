import { ExamSessionContext } from "@/context/ExamSessionContext";
import { useExamTimeOff } from "@/hooks/exam/useExamTimeOff";
import { useJoinExam } from "@/hooks/exam/useJoinExam";
import { useCtx } from "@/hooks/useCtx";

const SessionHandler = () => {
  const { student, exam } = useCtx(ExamSessionContext);
  const { id: examId } = exam;

  // Create exam session in realtime DB on page load
  useJoinExam({ examId, student });

  // Handle window blur event
  useExamTimeOff({ examId, student });

  return null;
};

export default SessionHandler;
