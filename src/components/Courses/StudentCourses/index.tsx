import ActiveCoursesList from "@/components/Courses/StudentCourses/ActiveCoursesList";
import StudentCoursesList from "@/components/Courses/StudentCourses/StudentCoursesList";

import { FCUser } from "@/hooks/useFCUser";

type Props = {
  user: NonNullable<FCUser>["user"];
};

const StudentCourses = ({ user }: Props) => {
  return (
    <div className="grid h-full grid-cols-1 grid-rows-[auto_auto_1fr] bg-content2 py-4 dark:bg-primary-50/70 lg:!bg-transparent">
      <section>
        <div className="px-8 lg:px-5">
          <h2 className="text-lg font-bold uppercase text-foreground/90">
            {user.firstName}'s Courses
          </h2>
        </div>

        <StudentCoursesList studentId={user.id} />
      </section>

      <section>
        <div className="px-8 lg:px-5">
          <h2 className="text-lg font-bold uppercase text-foreground/90">All Courses</h2>
        </div>

        <ActiveCoursesList />
      </section>
    </div>
  );
};

export default StudentCourses;
