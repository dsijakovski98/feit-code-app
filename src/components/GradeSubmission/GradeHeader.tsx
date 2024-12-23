import { Link } from "react-router-dom";

import { Tab, Tabs } from "@nextui-org/tabs";

import Icon from "@/components/ui/Icon";
import TaskTabs from "@/components/ui/TaskTabs";

import { ROUTES } from "@/constants/routes";
import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCtx } from "@/hooks/useCtx";
import { UseState } from "@/types";
import { FeedbackView } from "@/types/exams";

type Props = {
  feedbackView: FeedbackView;
  setFeedbackView: UseState<FeedbackView>[1];
};

const GradeHeader = ({ feedbackView, setFeedbackView }: Props) => {
  const { submission, activeTask, setActiveId } = useCtx(GradeSubmissionContext);
  const { exam, student } = submission;

  return (
    <div className="space-y-8 px-8 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link
          to={`${ROUTES.dashboard}${ROUTES.exams}/${exam.id}#results`}
          className="flex -translate-x-2 items-center gap-1 text-lg font-medium text-foreground-400 transition-colors hover:text-primary focus:text-primary"
        >
          <Icon name="left" className="h-5 w-5" />
          <span>Back to Results</span>
        </Link>

        <Tabs
          size="lg"
          radius="full"
          color="default"
          variant="light"
          selectedKey={feedbackView}
          onSelectionChange={(e) => setFeedbackView(e.toString() as FeedbackView)}
          classNames={{
            tab: "w-fit min-w-[6dvw]",
            tabContent:
              "text-foreground !text-sm font-medium group-data[selected=true]:text-default-foreground",
          }}
        >
          <Tab
            key="code"
            title={
              <div className="flex items-center gap-2">
                <Icon name="code" className="h-5 w-5" />
                <span>Code</span>
              </div>
            }
          />
          <Tab
            key="feedback"
            title={
              <div className="flex items-center gap-2">
                <Icon name="grade" className="h-5 w-5" />
                <span>Feedback</span>
              </div>
            }
          />
        </Tabs>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">
            {exam.name}・{exam.language}
          </h2>
          <p>
            {student.firstName} {student.lastName}, {student.indexNumber}/{student.indexYear} {student.major}
          </p>
        </div>

        <TaskTabs tasks={exam.tasks} activeId={activeTask.id} onSelect={setActiveId} />
      </div>
    </div>
  );
};

export default GradeHeader;
