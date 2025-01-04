import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { JoinedCourseContext } from "@/context/JoinedCourseContext";
import { useCtx } from "@/hooks/useCtx";

// TODO: Exam history modal UI
const ExamHistory = () => {
  const { joinedData } = useCtx(JoinedCourseContext);

  return (
    <Button
      size="lg"
      color="default"
      variant="light"
      isDisabled={!joinedData.grade}
      startContent={<Icon name="history" className="h-5 w-5" />}
    >
      Exam History
    </Button>
  );
};

export default ExamHistory;
