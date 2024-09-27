import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";
import { Avatar } from "@nextui-org/react";

import CourseActivity from "@/components/Courses/CourseCard/CourseActivity";
import Button from "@/components/ui/Button";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Icon from "@/components/ui/Icon";
import Timestamp from "@/components/ui/Timestamp";

import { leaveCourse } from "@/actions/courses";
import { StudentCourseType } from "@/hooks/student/useStudentCourses";
import { useToggle } from "@/hooks/useToggle";
import { USER_TYPE } from "@/types";

type Props = {
  courseData: StudentCourseType;
};

const StudentCourseCard = ({ courseData }: Props) => {
  const { course, joinedAt } = courseData;
  const { id: courseId, academicYear, name, description, archived } = course;

  const { userId: studentId } = useAuth();
  const queryClient = useQueryClient();

  const dialog = useToggle();

  const { mutate, isPending } = useMutation({
    mutationFn: leaveCourse,
    onSuccess: async (success) => {
      if (!success) return;

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: [{ name: "courses", type: USER_TYPE.student, studentId }],
        }),
        queryClient.invalidateQueries({
          queryKey: [{ name: "courses", type: "active" }],
        }),
      ]);

      toast(`You just left ${name}.`);
    },
    onError: (error) => toast.error(error.message),
  });

  const onConfirm = () => {
    if (!studentId) return;

    mutate({ studentId, courseId });
  };

  return (
    <div className="relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-lg border border-content3 bg-content1 p-4 font-sans shadow-md dark:border-transparent dark:bg-background">
      <div className="flex h-full w-[40ch] flex-col justify-start space-y-5 overflow-hidden lg:w-[30ch] lg:space-y-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-sm font-semibold text-primary dark:text-primary-700">{academicYear}</span>
            <h3 className="flex w-full items-end gap-4 truncate text-lg font-semibold lg:text-lg">{name}</h3>
          </div>

          <Avatar size="sm" color="primary" fallback={<Icon name="course" />} />
        </div>

        <p className="line-clamp-2 h-[5.5ch] pb-2 text-base font-medium text-foreground-400">{description}</p>

        <div className="flex items-center justify-between gap-4 empty:py-4">
          {!archived && (
            <Fragment>
              <p className="lg:text-sm">
                Joined <Timestamp>{joinedAt}</Timestamp>
              </p>

              <Button
                as={Link}
                // @ts-expect-error NextUI not passing through 'as' props
                to={courseId}
                // size="sm"
                variant="light"
                color="default"
                className="px-5 text-sm"
              >
                Details
              </Button>
            </Fragment>
          )}
        </div>
      </div>

      {archived && <CourseActivity label="Leave" onPress={dialog.toggleOn} />}

      <ConfirmDialog
        dialog={dialog}
        title={`Leave course?`}
        color="danger"
        description={
          <p>
            You will no longer be a part of <span className="font-semibold">{name}</span>.
          </p>
        }
        loading={isPending}
        action={{ label: "Leave", onConfirm }}
      />
    </div>
  );
};

export default StudentCourseCard;
