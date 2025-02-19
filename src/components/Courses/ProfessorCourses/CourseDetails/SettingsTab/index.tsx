import CourseDangerZone from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone";
import EditCourseForm from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/EditCourseForm";

const SettingsTab = () => {
  return (
    <section className="mx-auto max-w-[85ch] space-y-12 lg:pb-16 md:max-w-full">
      <div className="space-y-4">
        <h2 className="w-fit rounded-lg bg-default px-2 py-0.5 text-lg font-semibold text-default-foreground">
          Edit Course
        </h2>

        <div className="px-4">
          <EditCourseForm />
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="w-fit rounded-lg bg-danger px-2 py-0.5 text-lg font-semibold text-danger-foreground">
          Danger Zone
        </h2>

        <div className="px-4">
          <CourseDangerZone />
        </div>
      </div>
    </section>
  );
};

export default SettingsTab;
