import CourseDangerZone from "@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/SettingsTab/CourseDangerZone";
import EditCourseForm from "@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/SettingsTab/EditCourseForm";

const SettingsTab = () => {
  return (
    <section className="mx-auto max-w-[80ch] space-y-20 pb-8 md:max-w-full">
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
