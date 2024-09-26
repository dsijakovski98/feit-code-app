import { Fragment } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

import { deleteCourse } from "@/actions/courses";
import { ROUTES } from "@/constants/routes";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPE } from "@/types";

const DeleteCourse = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name, id: courseId, professorId } = courseDetails;

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const dialog = useToggle();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: async (success) => {
      if (!success) return;

      await queryClient.invalidateQueries({
        queryKey: [{ name: "courses", type: USER_TYPE.professor, id: professorId }],
      });

      toast(`${name} course deleted!`);
      navigate(ROUTES.courses);
    },
    onError: (error) => toast.error(error.message),
  });

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
