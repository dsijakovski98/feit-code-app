import { useExamTimeOff } from "@/hooks/exam/useExamTimeOff";
import { useJoinExam } from "@/hooks/exam/useJoinExam";

const SessionActionsHandler = () => {
  // Create exam session in realtime DB on page load
  useJoinExam();

  // Handle window blur event
  useExamTimeOff();

  return null;
};

export default SessionActionsHandler;
