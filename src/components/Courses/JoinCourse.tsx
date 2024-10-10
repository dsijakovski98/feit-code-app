import { Fragment } from "react";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

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

  const dialog = useToggle();

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
      dialog.toggleOff();
    },
    onError: (error) => toast.error(error.message),
  });

  if (!userData || isLoading || joinedCourse) {
    return null;
  }

  const onConfirm = () => {
    mutate({ courseId, studentId: userData.user.id });
  };

  return (
    <Fragment>
      <Button variant="solid" className="px-6" onPress={dialog.toggleOn}>
        Join Course
      </Button>

      <ConfirmDialog
        dialog={dialog}
        loading={isPending}
        color="primary"
        title={`Join ${name}`}
        description="You will be able to take exams and receive news updates for this course."
        action={{ label: "Join", onConfirm }}
      />
    </Fragment>
  );
};

export default JoinCourse;
