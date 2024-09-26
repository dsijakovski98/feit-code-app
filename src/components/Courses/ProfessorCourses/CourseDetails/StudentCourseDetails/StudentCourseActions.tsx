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
    <div className="flex h-full flex-col gap-7 font-sans">
      <div className="flex items-start justify-between gap-16 text-2xl font-semibold">
        <h4 className="text-pretty">You & This Course</h4>
        <p>{academicYear}</p>
      </div>

      {joinedData ? (
        <div className="grid h-full grid-cols-2 gap-8">
          <div className="flex h-full flex-col justify-between lg:gap-10">
            <p className="text-lg">
              You joined this course <Timestamp>{joinedData.joinedAt}</Timestamp>.
            </p>

            <div className="mt-auto">
              <p className="text-8xl font-bold">{joinedData.grade ?? "N/A"}</p>
              <p className="pl-2 text-lg">Your grade this semester</p>
            </div>
          </div>

          <div>
            {/* TODO: Implement exam UI */}
            <p className="text-end text-lg font-semibold text-foreground-300">No upcoming exam.</p>
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
