import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { removeStudent } from "@/actions/students";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { StudentContext } from "@/context/StudentContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
};

const RemoveStudent = ({ dialog }: Props) => {
  const {
    courseDetails: { id: courseId, name: courseName },
  } = useCtx(CourseDetailsContext);
  const {
    student: { id: studentId, firstName, lastName },
  } = useCtx(StudentContext);

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: removeStudent,
    onSuccess: async (success) => {
      if (!success) return;

      await queryClient.invalidateQueries({ queryKey: [{ name: "courses", courseId }] });

      toast(`${firstName} ${lastName} removed from ${courseName}.`);
      dialog.toggleOff();
    },
    onError: (error) => toast.error(error.message),
  });

  const onConfirm = () => {
    mutate({ studentId, courseId });
  };

  return (
    <ConfirmDialog
      dialog={dialog}
      loading={isPending}
      color="danger"
      title="Remove student?"
      description={
        <p>
          <span className="font-semibold">
            {firstName} {lastName}
          </span>{" "}
          will be removed from all course activities.
        </p>
      }
      action={{ label: "Remove", onConfirm }}
    />
  );
};

export default RemoveStudent;
