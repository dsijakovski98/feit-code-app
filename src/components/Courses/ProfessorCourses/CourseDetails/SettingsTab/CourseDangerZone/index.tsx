import { Suspense, lazy } from "react";

import DeleteCourse from "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone/DeleteCourse";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useCtx } from "@/hooks/useCtx";

const ActivateCourse = lazy(
  () =>
    import(
      "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone/ArchiveCourse/ActivateCourse"
    ),
);

const ArchiveCourse = lazy(
  () =>
    import(
      "@/components/Courses/ProfessorCourses/CourseDetails/SettingsTab/CourseDangerZone/ArchiveCourse/ArchiveCourse"
    ),
);

const CourseDangerZone = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { archived } = courseDetails;

  return (
    <section className="space-y-12 pt-8">
      <div className="flex items-center justify-between gap-8 lg:flex-col lg:gap-9">
        <div className="relative shrink-0">
          <h3 className="text-lg font-semibold">{archived ? "Activate" : "Archive"}</h3>
          {archived ? (
            <p>
              Bring this course back to <span className="font-semibold">active</span> status.
            </p>
          ) : (
            <p>
              This will mark your course as being <span className="font-semibold">inactive</span>.
            </p>
          )}
        </div>

        <Suspense fallback={null}>{archived ? <ActivateCourse /> : <ArchiveCourse />}</Suspense>
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
