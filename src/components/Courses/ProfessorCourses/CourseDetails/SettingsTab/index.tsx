import CourseDangerZone from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone";
import EditCourseForm from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/EditCourseForm";

const SettingsTab = () => {
  return (
    <section className="mx-auto max-w-[85ch] space-y-14 lg:pb-16 md:max-w-full">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Edit Course</h2>

        <EditCourseForm />
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-danger">Danger Zone</h2>

        <CourseDangerZone />
      </div>
    </section>
  );
};

export default SettingsTab;
