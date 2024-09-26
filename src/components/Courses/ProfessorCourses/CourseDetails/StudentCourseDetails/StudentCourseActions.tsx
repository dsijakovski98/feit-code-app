import clsx from "clsx";

import { Avatar } from "@nextui-org/react";

import JoinCourse from "@/components/Courses/JoinCourse";
import Timestamp from "@/components/ui/Timestamp";

import CourseCardProvider from "@/context/CourseCardContext";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useStudentJoinedCourse } from "@/hooks/student/useStudentJoinedCourse";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const StudentCourseActions = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id: courseId, academicYear, name } = courseDetails;

  const { userData } = useFCUser();
  const { data: joinedData } = useStudentJoinedCourse(userData?.user.id, courseId);

  if (!userData) return null;

  return (
    <div className="flex h-full flex-col justify-between font-sans">
      <div className="flex items-start justify-between gap-12 text-lg font-semibold">
        <div>
          <h4 className="text-pretty">You & This Course</h4>

          {joinedData && (
            <p className="text-base font-normal">
              You joined <Timestamp>{joinedData.joinedAt}</Timestamp>.
            </p>
          )}
        </div>

        <p>{academicYear}</p>
      </div>

      {joinedData ? (
        <div className="flex justify-between gap-4">
          <div className="space-y-1">
            <Avatar
              size="lg"
              radius="md"
              name={joinedData.grade ?? "?"}
              classNames={{
                name: clsx("text-6xl font-semibold", {
                  "text-5xl": Number(joinedData.grade) === 10,
                }),
                base: "bg-default-100 w-16 h-16",
              }}
            />

            <p className="text-base">
              {joinedData.grade ? "Your grade this semester" : "You have no grade yet"}
            </p>
          </div>

          <div className="content-end">
            {/* TODO: Implement exam UI */}
            <p className="text-pretty font-semibold text-foreground-300">No upcoming exam at the moment</p>
          </div>
        </div>
      ) : (
        <div className="grid h-full place-items-center content-center gap-4">
          <p className="font-semibold text-foreground-300">You are not a member of {name} yet.</p>

          <CourseCardProvider course={courseDetails} mode={USER_TYPE.student}>
            <JoinCourse />
          </CourseCardProvider>
        </div>
      )}
    </div>
  );
};

export default StudentCourseActions;
