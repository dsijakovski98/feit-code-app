import ArchiveCourse from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone/ArchiveCourse";
import DeleteCourse from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone/DeleteCourse";

const CourseDangerZone = () => {
  return (
    <section className="space-y-12 pt-8">
      <div className="flex items-center justify-between gap-8 lg:flex-col lg:gap-9">
        <div className="relative shrink-0">
          <h3 className="text-lg font-semibold">Archive</h3>
          <p>
            This will mark your course as being <span className="font-semibold">inactive</span>. You
            can always activate it later.
          </p>
        </div>

        <ArchiveCourse />
      </div>

      <div className="flex items-start justify-between gap-8 lg:flex-col lg:gap-4">
        <div>
          <h3 className="text-lg font-semibold">Delete</h3>
          <p>Permanently delete this course from the face of the planet.</p>
        </div>

        <DeleteCourse />
      </div>
    </section>
  );
};

export default CourseDangerZone;
