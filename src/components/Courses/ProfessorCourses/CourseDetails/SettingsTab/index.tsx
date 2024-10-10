import CourseDangerZone from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone";
import EditCourseForm from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/EditCourseForm";

const SettingsTab = () => {
  return (
    <section className="mx-auto !h-auto max-w-[90ch] space-y-24 pb-8 md:max-w-full">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">General</h2>

        <div className="pl-4">
          <EditCourseForm />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-danger">Danger Zone</h2>

        <div className="pl-4">
          <CourseDangerZone />
        </div>
      </div>
    </section>
  );
};

export default SettingsTab;
