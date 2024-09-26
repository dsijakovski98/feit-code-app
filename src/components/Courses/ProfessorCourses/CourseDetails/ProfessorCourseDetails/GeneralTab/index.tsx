import CourseDetails from "@/components/Courses/CourseDetails";

import "./styles.css";

const GeneralTab = () => {
  return (
    <div className="general lg:block lg:space-y-4">
      <CourseDetails className="space-y-10 [grid-area:details]" />

      <div className="[grid-area:exam]">Latest exam here</div>

      <div className="[grid-area:stats]">Stats here</div>
    </div>
  );
};

export default GeneralTab;
