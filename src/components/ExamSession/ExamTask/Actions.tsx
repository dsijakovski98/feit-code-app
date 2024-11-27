import { Fragment, useMemo } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Icon from "@/components/ui/Icon";

import { leaveExamSession } from "@/actions/exam-session";
import { ROUTES } from "@/constants/routes";
import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { useToggle } from "@/hooks/useToggle";
import { getExamIssueUrl } from "@/utils";

type Props = {
  runCode: () => void;
  loading: boolean;
};

const ExamTaskActions = ({ runCode, loading }: Props) => {
  const { userData } = useFCUser();
  const { exam, student, currentTaskState, submittedTasksState, tasksState } = useCtx(ExamSessionContext);
  const [, setTasks] = tasksState;
  const [, setCurrentTask] = currentTaskState;
  const [submittedTasks, setSubmittedTasks] = submittedTasksState;

  const { id: studentId } = student;
  const { id: examId } = exam;

  const { task, template } = useCtx(ExamSessionTaskContext);

  const navigate = useNavigate();

  const submitToggle = useToggle();
  const startOverToggle = useToggle();
  const leaveToggle = useToggle();

  const submitMode = useMemo(() => {
    const totalTasks = exam.tasks.length;
    const submitted = submittedTasks.length;

    if (totalTasks === submitted + 1) {
      return "Finish";
    }

    return "Submit";
  }, [exam.tasks.length, submittedTasks.length]);

  const examIssueUrl = useMemo(() => getExamIssueUrl(userData, task), [userData, task]);

  const { mutate, isPending } = useMutation({
    mutationFn: leaveExamSession,
    onSuccess: (success) => {
      if (!success) return;

      navigate(ROUTES.dashboard);
    },
    onError: (error) => toast.error(error.message),
  });

  const handleStartOver = () => {
    if (!task) return;
    if (!template) return;

    startOverToggle.toggleOff();
    setTasks((prev) => {
      prev[task.id].code = template;

      return { ...prev };
    });
  };

  const onConfirm = async () => {
    const newSubmitted = [...submittedTasks, task.id];
    setSubmittedTasks(newSubmitted);

    if (submitMode === "Submit") {
      const remainingTasks = exam.tasks.filter((task) => !newSubmitted.includes(task.id));
      setCurrentTask(remainingTasks[0]);

      submitToggle.toggleOff();
    }

    if (submitMode === "Finish") {
      // TODO: Finish exam

      submitToggle.toggleOff();
    }
  };

  return (
    <Fragment>
      <div className="sticky bottom-0 flex w-[calc(100%+(2*32px))] -translate-x-8 items-center justify-between gap-4 bg-slate-950 px-8 pb-5">
        <Button
          fullWidth
          color="success"
          className="!font-mono text-sm"
          isLoading={loading}
          onPress={runCode}
        >
          Run Code
        </Button>

        <Button fullWidth className="!font-mono text-sm" disabled={loading} onPress={submitToggle.toggleOn}>
          {submitMode}
        </Button>

        <Dropdown placement="top-end">
          <DropdownTrigger>
            <Button isIconOnly variant="light" radius="full" color="default">
              <Icon name="more" className="h-5 w-5" />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownSection
              showDivider
              title="Help"
              classNames={{ heading: "text-sm font-semibold", divider: "h-[0.5px] opacity-50" }}
            >
              <DropdownItem
                textValue="Start Over"
                startContent={<Icon name="restart" className="h-5 w-5" />}
                onPress={startOverToggle.toggleOn}
              >
                <p className="text-base">Start Over</p>
              </DropdownItem>

              <DropdownItem
                as={Link}
                target="_blank"
                // @ts-expect-error NextUI not passing through 'as' props
                to={examIssueUrl}
                aria-label="Report an Issue"
                startContent={<Icon name="info" className="h-5 w-5" />}
              >
                <p className="text-base">Report an Issue</p>
              </DropdownItem>
            </DropdownSection>

            <DropdownItem
              textValue="Leave"
              startContent={<Icon name="logout" className="h-5 w-5" />}
              onPress={leaveToggle.toggleOn}
            >
              <p className="text-base">Leave</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>

      <ConfirmDialog
        color="primary"
        dialog={submitToggle}
        title={submitMode === "Submit" ? "Submit task?" : "Finish exam?"}
        description={
          submitMode === "Submit" ? "You cannot undo this." : `Make sure you've double checked everything!`
        }
        action={{ label: submitMode, onConfirm }}
      />

      <ConfirmDialog
        color="primary"
        dialog={startOverToggle}
        title={`Start over with ${task.functionName}?`}
        description="You will lose your progress so far and start fresh."
        action={{ label: "Start Over", onConfirm: handleStartOver }}
      />

      <ConfirmDialog
        color="danger"
        loading={isPending}
        dialog={leaveToggle}
        title="Leave exam session?"
        description="You will lose all of your progress."
        action={{ label: "Leave", onConfirm: () => mutate({ examId, studentId }) }}
      />
    </Fragment>
  );
};

export default ExamTaskActions;
