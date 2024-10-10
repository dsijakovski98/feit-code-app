import CourseDetails from "@/components/Courses/Misc/CourseDetails";
import StudentCourseInfo from "@/components/Courses/StudentCourses/CourseDetails/StudentCourseInfo";

import "./styles.css";

const StudentCourseDetails = () => {
  return (
    <section className="details bg-main h-full p-8 lg:block lg:h-auto lg:space-y-6 lg:p-5">
      <div className="[grid-area:details]">
        <CourseDetails />
      </div>

      <div className="[grid-area:actions]">
        <StudentCourseInfo />
      </div>

      {/* TODO: Implement stats UI */}
      <div className="[grid-area:stats]">Stats here</div>
    </section>
  );
};

export default StudentCourseDetails;
