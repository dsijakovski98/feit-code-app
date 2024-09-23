import { Link } from "react-router-dom";

import Icon from "@/components/ui/Icon";
import Timestamp from "@/components/ui/Timestamp";

import { StudentCourseType } from "@/hooks/student/useStudentCourses";

type Props = {
  courseData: StudentCourseType;
};

const StudentCourseCard = ({ courseData }: Props) => {
  const { course, joinedAt } = courseData;
  const { id, academicYear, name } = course;

  return (
    <div className="flex h-full items-end justify-between gap-2 rounded-lg border border-content3 bg-content1 p-6 font-sans shadow-lg outline outline-2 -outline-offset-[2px] outline-transparent transition-[outline] duration-400 hover:outline-primary dark:border-transparent dark:bg-background lg:p-4">
      <div className="flex h-full w-[28ch] flex-col justify-between space-y-8 lg:space-y-4">
        <div>
          <span className="text-sm font-semibold text-primary dark:text-primary-700">{academicYear}</span>

          <h3 className="flex w-full items-end gap-4 text-xl font-semibold lg:text-lg">{name}</h3>
        </div>

        <p>
          Joined <Timestamp>{joinedAt}</Timestamp>
        </p>
      </div>

      <Link to={id} className="group flex w-fit items-center justify-between gap-2 font-semibold lg:gap-1">
        Details{" "}
        <Icon
          name="right"
          className="h-5 w-5 -translate-x-2 translate-y-px scale-90 opacity-0 transition-[opacity_transform] group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 lg:translate-x-0 lg:opacity-100"
        />
      </Link>
    </div>
  );
};

export default StudentCourseCard;
