import ArchiveCourse from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone/ArchiveCourse/ArchiveCourse";
import DeleteCourse from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone/DeleteCourse";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";

const CourseDangerZone = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { archived } = courseDetails;

  return (
    <section className="space-y-10">
      <div className="flex items-start justify-between gap-52 xl:gap-20 lg:flex-col lg:gap-6 md:gap-4">
        <div className="lg:space-y-1">
          <h3 className="text-lg font-semibold">{archived ? "Activate" : "Archive"}</h3>
          {archived ? (
            <p>
              This course is <span className="font-semibold">archived</span>.
            </p>
          ) : (
            <p>
              This will mark your course as <span className="font-semibold">archived</span>. You will not be
              able to change this later.
            </p>
          )}
        </div>

        <ArchiveCourse />
      </div>

      <div className="flex items-start justify-between gap-8 lg:flex-col lg:gap-4">
        <div className="lg:space-y-1">
          <h3 className="text-lg font-semibold">Delete</h3>
          <p>Permanently delete this course from the face of the planet.</p>
        </div>

        <DeleteCourse />
      </div>
    </section>
  );
};

export default CourseDangerZone;
