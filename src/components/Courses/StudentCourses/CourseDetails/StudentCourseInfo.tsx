import { Spinner } from "@nextui-org/spinner";

import JoinCourse from "@/components/Courses/Forms/JoinCourse";
import ActiveExam from "@/components/Courses/StudentCourses/CourseDetails/ActiveExam";
import CourseGrade from "@/components/Courses/StudentCourses/CourseDetails/CourseGrade";
import ExamHistory from "@/components/Courses/StudentCourses/CourseDetails/ExamHistory";
import Timestamp from "@/components/ui/Timestamp";

import CourseCardProvider from "@/context/CourseCardContext";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import JoinedCourseProvider from "@/context/JoinedCourseContext";
import { useStudentJoinedCourse } from "@/hooks/student/useStudentJoinedCourse";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

const StudentCourseInfo = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id: courseId, name } = courseDetails;

  const { userData } = useFCUser();
  const { data: joinedData, isPending } = useStudentJoinedCourse(userData?.user.id, courseId);

  if (!userData || isPending) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (joinedData === null) {
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

  if (!joinedData) return null;

  return (
    <JoinedCourseProvider joinedData={joinedData}>
      <div className="flex h-full flex-col justify-between gap-20">
        <div className="flex items-start justify-between gap-6">
          <div>
            <h2 className="text-xl font-semibold">You & This Course</h2>
            <p>
              You joined <Timestamp>{joinedData.joinedAt}</Timestamp>
            </p>
          </div>

          <ExamHistory />
        </div>

        <div className="flex items-end justify-between gap-6">
          <CourseGrade />

          <ActiveExam />
        </div>
      </div>
    </JoinedCourseProvider>
  );
};

export default StudentCourseInfo;
