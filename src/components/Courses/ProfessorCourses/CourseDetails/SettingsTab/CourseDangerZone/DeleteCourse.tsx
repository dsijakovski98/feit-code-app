import { Fragment } from "react";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useDeleteCourse } from "@/hooks/course/useDeleteCourse";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const DeleteCourse = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name, id: courseId, professorId } = courseDetails;

  const dialog = useToggle();

  const { mutate, isPending } = useDeleteCourse({ name, professorId });

  const onConfirm = () => {
    mutate(courseId);
  };

  return (
    <Fragment>
      <Button color="danger" className="w-[140px] font-semibold lg:w-full" onPress={dialog.toggleOn}>
        Delete Course
      </Button>

      <ConfirmDialog
        dialog={dialog}
        loading={isPending}
        color="danger"
        title="Delete Course?"
        description="You cannot undo this later."
        action={{ label: "Delete", onConfirm }}
      />
    </Fragment>
  );
};

export default DeleteCourse;
