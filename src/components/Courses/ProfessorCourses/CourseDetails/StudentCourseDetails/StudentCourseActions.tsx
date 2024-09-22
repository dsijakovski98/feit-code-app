import Timestamp from "@/components/ui/Timestamp";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useStudentJoinedCourse } from "@/hooks/student/useStudentJoinedCourse";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";

const StudentCourseActions = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id: courseId, academicYear } = courseDetails;

  const { userData } = useFCUser();
  const { data: joinedData } = useStudentJoinedCourse(userData?.user.id, courseId);

  if (!userData || !joinedData) return null;

  return (
    <div className="flex h-full flex-col gap-7 font-sans">
      <div className="flex items-start justify-between gap-16 text-2xl font-semibold">
        <h4 className="text-pretty">You & This Course</h4>
        <p>{academicYear}</p>
      </div>

      <div className="grid h-full grid-cols-2 gap-8">
        <div className="flex h-full flex-col justify-between">
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
    </div>
  );
};

export default StudentCourseActions;
