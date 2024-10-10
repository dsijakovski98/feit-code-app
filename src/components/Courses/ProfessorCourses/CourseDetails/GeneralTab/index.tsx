import CourseExamInfo from "@/components/Courses/CourseExamInfo";
import CourseDetails from "@/components/Courses/Misc/CourseDetails";

import "./styles.css";

const GeneralTab = () => {
  return (
    <div className="general lg:block lg:space-y-4">
      <div className="[grid-area:details]">
        <CourseDetails />
      </div>

      <div className="[grid-area:exam]">
        <CourseExamInfo />
      </div>

      <div className="[grid-area:stats]">Stats here</div>
    </div>
  );
};

export default GeneralTab;
