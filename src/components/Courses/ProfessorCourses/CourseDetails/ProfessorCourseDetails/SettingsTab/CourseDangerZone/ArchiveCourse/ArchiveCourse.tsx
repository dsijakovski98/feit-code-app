import { Fragment } from "react";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { archiveCourseToggle } from "@/actions/courses";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPE } from "@/types";

const ArchiveCourse = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name, id: courseId, professorId, archived } = courseDetails;

  const queryClient = useQueryClient();

  const dialog = useToggle();

  const { mutate, isPending } = useMutation({
    mutationFn: archiveCourseToggle,
    onSuccess: async (success) => {
      if (!success) return;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [{ name: "courses", courseId }] }),
        queryClient.invalidateQueries({
          queryKey: [{ name: "courses", type: USER_TYPE.professor, id: professorId }],
        }),
      ]);

      toast(`${name} course archived!`);
    },
    onError: (error) => toast.error(error.message),
  });

  const onConfirm = () => {
    mutate({ courseId, archived: true });
  };

  return (
    <Fragment>
      <Button
        variant="ghost"
        color="default"
        isDisabled={!!archived}
        className="w-[140px] shrink-0 border-foreground-300 py-[22px] text-sm font-semibold text-foreground lg:w-full"
        onPress={dialog.toggleOn}
      >
        Archive
      </Button>

      <ConfirmDialog
        dialog={dialog}
        loading={isPending}
        color="warning"
        title="Archive Course?"
        description="It will be marked as inactive."
        action={{ label: "Archive", onConfirm }}
      />
    </Fragment>
  );
};

export default ArchiveCourse;
