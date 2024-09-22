import { Fragment } from "react";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import Button from "@/components/ui/Button";

import { archiveCourseToggle } from "@/actions/courses";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPE } from "@/types";

const ActivateCourse = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name, id: courseId, professorId } = courseDetails;

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

      toast.success(`${name} course activated!`);
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Fragment>
      <Button
        variant="solid"
        color="default"
        className="w-[140px] bg-success py-[22px] text-sm font-semibold dark:border-success-300 dark:text-success-foreground lg:w-full"
        onPress={dialog.toggleOn}
      >
        Activate
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
              <ModalHeader className="text-2xl">Activate Course</ModalHeader>

              <ModalBody className="relative">
                <p>
                  Are you sure you want to{" "}
                  <span className="font-semibold text-success">activate this course?</span>
                </p>
              </ModalBody>

              <ModalFooter>
                <Button fullWidth color="default" variant="bordered" isDisabled={isPending} onPress={onClose}>
                  Go back
                </Button>

                <Button
                  fullWidth
                  type="submit"
                  color="success"
                  isLoading={isPending}
                  onPress={() => mutate({ courseId, archived: false })}
                >
                  Archive
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ActivateCourse;
