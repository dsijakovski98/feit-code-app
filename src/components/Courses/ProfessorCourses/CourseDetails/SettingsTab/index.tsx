import CourseDangerZone from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone";
import EditCourseForm from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/EditCourseForm";

const SettingsTab = () => {
  return (
    <section className="mx-auto !h-auto max-w-[85ch] space-y-14 pb-8 md:max-w-full">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Edit Course</h2>

        <div className="pl-4">
          <EditCourseForm />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-danger">Danger Zone</h2>

        <div className="pl-4">
          <CourseDangerZone />
        </div>
      </div>
    </section>
  );
};

export default SettingsTab;
