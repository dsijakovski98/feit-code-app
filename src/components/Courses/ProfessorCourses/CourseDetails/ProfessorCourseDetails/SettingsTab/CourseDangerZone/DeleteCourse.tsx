import { Fragment } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import Button from "@/components/ui/Button";

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
        queryKey: [{ name: "courses", type: USER_TYPE.professor, professorId }],
      });

      toast(`${name} course deleted!`);
      navigate(ROUTES.courses);
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Fragment>
      <Button
        color="danger"
        className="w-[140px] py-[22px] text-sm font-semibold lg:w-full"
        onPress={dialog.toggleOn}
        // TODO: Disabled based on permissions
      >
        Delete Course
      </Button>

      <Modal
        isOpen={dialog.open}
        onOpenChange={dialog.toggle}
        hideCloseButton
        placement="center"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-background/50",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader className="text-2xl">Delete Course</ModalHeader>

              <ModalBody className="relative">
                <p>
                  Are you sure you want to{" "}
                  <span className="font-semibold text-danger">delete this course?</span> You cannot
                  undo this later.
                </p>
              </ModalBody>

              <ModalFooter>
                <Button
                  fullWidth
                  color="default"
                  variant="bordered"
                  isDisabled={isPending}
                  onPress={onClose}
                >
                  Go back
                </Button>

                <Button
                  fullWidth
                  type="submit"
                  color="danger"
                  isLoading={isPending}
                  onPress={() => mutate(courseId)}
                >
                  Delete
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default DeleteCourse;
