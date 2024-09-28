import CourseDetails from "@/components/Courses/CourseDetails";
import StudentCourseActions from "@/components/Courses/ProfessorCourses/CourseDetails/StudentCourseDetails/StudentCourseActions";

import "./styles.css";

const StudentCourseDetails = () => {
  return (
    <section className="details bg-main h-full p-8 lg:block lg:h-auto lg:space-y-6 lg:p-5">
      <div className="[grid-area:details]">
        <CourseDetails />
      </div>

      <div className="[grid-area:actions]">
        <StudentCourseActions />
      </div>

      {/* TODO: Implement stats UI */}
      <div className="[grid-area:stats]">Stats here</div>
    </section>
  );
};

export default StudentCourseDetails;
