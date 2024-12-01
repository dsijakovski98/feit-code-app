import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation } from "@tanstack/react-query";
import { InferInput, object, string } from "valibot";

import { Textarea } from "@nextui-org/react";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { removeStudentSession } from "@/actions/exam-session";
import { ExamDetailsContext } from "@/context/ExamDetailsContext";
import { StudentSessionContext } from "@/context/StudentSessionContext";
import { useCtx } from "@/hooks/useCtx";
import { FCProfessor, useFCUser } from "@/hooks/useFCUser";
import { Toggle } from "@/hooks/useToggle";

const RemoveReasonSchema = object({
  reason: string(),
});

type Props = {
  dialog: Toggle;
};

const RemoveSession = ({ dialog }: Props) => {
  const { examDetails } = useCtx(ExamDetailsContext);
  const { id: examId } = examDetails;

  const { session } = useCtx(StudentSessionContext);
  const { student, sessionId } = session;
  const { firstName, lastName } = student;

  const { userData } = useFCUser();

  const { control, getValues } = useForm<InferInput<typeof RemoveReasonSchema>>({
    resolver: valibotResolver(RemoveReasonSchema),
    defaultValues: {
      reason: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: removeStudentSession,
    onSuccess: (success) => {
      if (!success) return;

      toast(`Student ${firstName} ${lastName} has been removed from the exam.`);
      dialog.toggleOff();
    },
    onError: (error) => toast.error(error.message),
  });

  const onConfirm = () => {
    if (!userData) return;

    const { firstName, lastName, type: teacherType } = userData.user as FCProfessor;

    const reason = getValues("reason");
    const remover = `${firstName} ${lastName}`;

    mutate({ examId, sessionId, removed: { reason, remover, teacherType } });
  };

  return (
    <ConfirmDialog
      dialog={dialog}
      loading={isPending}
      color="danger"
      title="Remove from Exam?"
      description={
        <div className="space-y-1">
          <p>
            <span className="font-semibold">
              {firstName} {lastName}
            </span>{" "}
            will be removed from the session.
          </p>

          <Controller
            control={control}
            name="reason"
            disabled={isPending}
            render={({ field, fieldState }) => (
              <Textarea
                {...field}
                autoFocus
                size="lg"
                label="Reason"
                color="default"
                variant="underlined"
                placeholder="You can optionally add a reason for the removal."
                isDisabled={isPending}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                classNames={{
                  input: "placeholder:text-base",
                  label: "text-lg font-semibold !text-foreground lg:text-base",
                }}
              />
            )}
          />
        </div>
      }
      action={{ label: "Remove", onConfirm }}
    />
  );
};

export default RemoveSession;
