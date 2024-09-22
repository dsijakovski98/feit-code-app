import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";
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
    <div className="flex h-full justify-between gap-2 overflow-hidden rounded-md border border-content3 bg-content1 font-sans shadow-md dark:border-transparent dark:bg-primary-50">
      <div className="flex h-full w-[32ch] flex-col justify-between space-y-5 overflow-hidden p-6 lg:space-y-2 lg:p-4">
        <div>
          <span className="text-sm font-semibold text-primary dark:text-primary-700">
            {academicYear}
          </span>

          <h3 className="flex w-full items-end gap-4 truncate text-xl font-semibold lg:text-lg">
            {name}
          </h3>
        </div>

        <p>
          Joined <Timestamp>{joinedAt}</Timestamp>
        </p>
      </div>

      <div className="grid place-items-center">
        <Button isIconOnly variant="light" color="default" className="h-full rounded-l-none px-6">
          <Link to={id} aria-label="Open course details">
            <Icon name="right" className="h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default StudentCourseCard;
