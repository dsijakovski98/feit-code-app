import clsx from "clsx";

import { Spinner } from "@nextui-org/react";

import JoinCourse from "@/components/Courses/Forms/JoinCourse";
import ActiveExam from "@/components/Courses/StudentCourses/CourseDetails/ActiveExam";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Timestamp from "@/components/ui/Timestamp";

import CourseCardProvider from "@/context/CourseCardContext";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useStudentJoinedCourse } from "@/hooks/student/useStudentJoinedCourse";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const StudentCourseInfo = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id: courseId, name } = courseDetails;

  const { userData } = useFCUser();
  const { data: joinedData } = useStudentJoinedCourse(userData?.user.id, courseId);

  if (!userData) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!joinedData) {
    return (
      <div className="flex h-full flex-col">
        <h4 className="text-pretty text-xl font-semibold">You & This Course</h4>

        <div className="grid h-full place-items-center content-center gap-4">
          <p className="font-semibold text-foreground-300">You are not a member of {name} yet.</p>

          <CourseCardProvider course={courseDetails} mode={USER_TYPE.student}>
            <JoinCourse />
          </CourseCardProvider>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col justify-between gap-20">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold">You & This Course</h2>
          <p>
            You joined <Timestamp>{joinedData.joinedAt}</Timestamp>
          </p>
        </div>

        <Button
          size="lg"
          color="default"
          variant="light"
          isDisabled={!joinedData.grade}
          startContent={<Icon name="history" className="h-5 w-5" />}
          // TODO: Navigate to course exam history page
        >
          Exam History
        </Button>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="grid aspect-square max-h-[70px] max-w-[70px] place-items-center rounded-md bg-default dark:bg-default-100">
            <p
              className={clsx("text-5xl font-semibold", {
                "!text-4xl": joinedData.grade && joinedData.grade.length > 1,
              })}
            >
              {joinedData.grade ?? "-"}
            </p>
          </div>

          <p>Average grade</p>
        </div>

        <ActiveExam />
      </div>
    </div>
  );
};

export default StudentCourseInfo;
