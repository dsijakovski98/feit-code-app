import CourseDetails from "@/components/Courses/Misc/CourseDetails";
import StudentCourseStats from "@/components/Courses/StudentCourses/CourseDetails/CourseStats";
import StudentCourseInfo from "@/components/Courses/StudentCourses/CourseDetails/StudentCourseInfo";

import "./styles.css";

const StudentCourseDetails = () => {
  return (
    <section className="details bg-main h-full p-8 lg:block lg:h-auto lg:space-y-6 lg:p-5 lg:pb-20">
      <div className="[grid-area:details]">
        <CourseDetails />
      </div>

      <div className="[grid-area:actions]">
        <StudentCourseInfo />
      </div>

      <div className="grid place-items-center [grid-area:stats]">
        <StudentCourseStats />
      </div>
    </section>
  );
};

export default StudentCourseDetails;
