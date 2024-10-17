import { Fragment } from "react/jsx-runtime";

import TaskTestForm from "@/components/Tasks/Forms/TaskTestForm";
import TestPreview from "@/components/Tasks/Forms/TaskTestForm/TestPreview";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { TaskType } from "@/context/ExamFormContext";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  task: TaskType;
};

const TaskTestPreview = ({ task }: Props) => {
  const { tests } = task;

  const dialog = useToggle();

  return (
    <Fragment>
      <div className="space-y-2 pb-4">
        {tests.length === 0 && (
          <div className="space-y-3 text-center">
            <p className="text-lg font-semibold text-foreground-300">This task has no tests yet.</p>

            <Button
              color="default"
              startContent={<Icon name="add" className="h-5 w-5" />}
              className="text-sm"
              onPress={dialog.toggleOn}
            >
              Add Test
            </Button>
          </div>
        )}

        {tests.length > 0 && (
          <div className="space-y-4">
            <ol className="space-y-2">
              {tests.map((test, index) => (
                <li key={`Test ${index + 1}`}>
                  <TestPreview test={test} />
                </li>
              ))}
            </ol>

            <div className="text-center">
              <Button
                color="default"
                variant="light"
                startContent={<Icon name="add" className="h-5 w-5" />}
                className="px-6 text-sm"
                onPress={dialog.toggleOn}
              >
                Add Test
              </Button>
            </div>
          </div>
        )}
      </div>

      <TaskTestForm task={task} dialog={dialog} />
    </Fragment>
  );
};

export default TaskTestPreview;
