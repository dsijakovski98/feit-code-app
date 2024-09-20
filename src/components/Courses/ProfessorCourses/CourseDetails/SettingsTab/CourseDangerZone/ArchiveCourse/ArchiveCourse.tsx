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

const ArchiveCourse = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name, id: courseId, professorId: userId } = courseDetails;

  const queryClient = useQueryClient();

  const dialog = useToggle();

  const { mutate, isPending } = useMutation({
    mutationFn: archiveCourseToggle,
    onSuccess: async (success) => {
      if (!success) return;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [{ name: "courses", courseId }] }),
        queryClient.invalidateQueries({
          queryKey: [{ name: "courses", type: USER_TYPE.professor, userId }],
        }),
      ]);

      toast(`${name} course archived!`);
    },
    onError: (error) => toast.error(error.message),
  });

  return (
    <Fragment>
      <Button
        variant="ghost"
        color="default"
        className="w-[140px] border-foreground-300 py-[22px] text-sm font-semibold text-foreground lg:w-full"
        onPress={dialog.toggleOn}
        // TODO: Disabled based on permissions
      >
        Archive
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
              <ModalHeader className="text-2xl">Archive Course</ModalHeader>

              <ModalBody className="relative">
                <p>
                  Are you sure you want to{" "}
                  <span className="font-medium text-warning">archive this course?</span> It will be
                  marked as inactive.
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
                  color="warning"
                  isLoading={isPending}
                  onPress={() => mutate({ courseId, archived: true })}
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

export default ArchiveCourse;
