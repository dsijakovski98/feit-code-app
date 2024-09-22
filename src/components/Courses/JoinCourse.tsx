import toast from "react-hot-toast";
import { Fragment } from "react/jsx-runtime";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Skeleton } from "@nextui-org/react";

import Button from "@/components/ui/Button";
import Timestamp from "@/components/ui/Timestamp";

import { joinCourse } from "@/actions/courses";
import { CourseCardContext } from "@/context/CourseCardContext";
import { useStudentJoinedCourse } from "@/hooks/student/useStudentJoinedCourse";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPE } from "@/types";

const JoinCourse = () => {
  const { course } = useCtx(CourseCardContext);
  const { id: courseId, name } = course;

  const { userData } = useFCUser();
  const queryClient = useQueryClient();
  const { data: joinedCourse, isLoading } = useStudentJoinedCourse(userData?.user.id, courseId);

  const modal = useToggle();

  const { mutate, isPending } = useMutation({
    mutationFn: joinCourse,
    onSuccess: async (success) => {
      if (!success) return;
      if (!userData) return;

      const studentId = userData.user.id;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [{ name: "courses", type: "active" }] }),
        queryClient.invalidateQueries({
          queryKey: [{ name: "courses", type: USER_TYPE.student, studentId }],
        }),
        queryClient.invalidateQueries({
          queryKey: [{ name: "courses", type: "joined", studentId, courseId }],
        }),
      ]);

      toast.success(`You joined ${name}!`);
      modal.toggleOff();
    },
    onError: (error) => toast.error(error.message),
  });

  if (!userData || isLoading) {
    return <Skeleton className="h-10 w-[90px] rounded-md" />;
  }

  if (joinedCourse) {
    return (
      <p>
        Joined <Timestamp>{joinedCourse.joinedAt}</Timestamp>
      </p>
    );
  }

  return (
    <Fragment>
      <Button className="px-8 text-sm" onPress={modal.toggleOn}>
        Join
      </Button>

      <Modal
        isOpen={modal.open}
        onOpenChange={modal.toggle}
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
              <ModalHeader className="text-2xl">Join Course</ModalHeader>

              <ModalBody className="relative">
                <p>
                  Are you sure you want to join{" "}
                  <span className="font-semibold text-primary-500">{name}?</span>
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
                  isLoading={isPending}
                  onPress={() => mutate({ courseId, studentId: userData.user.id })}
                >
                  Join
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default JoinCourse;
