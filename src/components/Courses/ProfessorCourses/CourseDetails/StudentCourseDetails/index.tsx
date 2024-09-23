import { User } from "@nextui-org/user";

import StudentCourseActions from "@/components/Courses/ProfessorCourses/CourseDetails/StudentCourseDetails/StudentCourseActions";
import CategoryChip from "@/components/ui/CategoryChip";
import Timestamp from "@/components/ui/Timestamp";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useAvatar } from "@/hooks/useAvatar";
import { useCtx } from "@/hooks/useCtx";
import { TEACHER_TYPE } from "@/types";

import "./styles.css";

const StudentCourseDetails = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name, description, professor, assistant, categories, updatedAt } = courseDetails;

  const [professorAvatar] = useAvatar(courseDetails?.professorId);
  const [assistantAvatar] = useAvatar(courseDetails?.assistantId ?? "");

  return (
    <section className="details bg-main h-full p-8 lg:block lg:h-auto lg:space-y-6 lg:p-5">
      <div className="space-y-10 [grid-area:details]">
        <div>
          <h2 className="text-2xl font-semibold">{name}</h2>

          <p className="text-lg font-medium">{description}</p>

          <p className="text-base text-foreground-300">
            Updated <Timestamp>{updatedAt}</Timestamp>
          </p>
        </div>

        <div className="space-y-4">
          <ul className="flex max-w-[40ch] flex-wrap items-center gap-2 lg:gap-1">
            {categories.map(({ category, categoryId }) => (
              <li key={categoryId}>
                <CategoryChip size="sm" category={category} />
              </li>
            ))}
          </ul>

          <div className="space-y-2">
            <p className="text-lg font-semibold">Taught by</p>

            <div className="flex w-fit flex-wrap items-end gap-16 lg:w-full lg:justify-between">
              <User
                name={
                  <a href={`mailto: ${professor.email}`} className="text-base font-semibold">
                    {professor.firstName} {professor.lastName}
                  </a>
                }
                description={<p className="text-base">{TEACHER_TYPE.professor}</p>}
                avatarProps={{
                  size: "lg",
                  showFallback: true,
                  src: professorAvatar ?? "",
                }}
              />

              {assistant ? (
                <User
                  name={
                    <a href={`mailto:${assistant.email}`} className="text-base font-semibold">
                      {assistant.firstName} {assistant.lastName}
                    </a>
                  }
                  description={<p className="text-base">{TEACHER_TYPE.assistant}</p>}
                  avatarProps={{
                    size: "lg",
                    showFallback: true,
                    src: assistantAvatar ?? "",
                  }}
                />
              ) : (
                <p className="shrink font-semibold text-foreground-300">
                  There is no assistant for this course yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="[grid-area:actions]">
        <StudentCourseActions />
      </div>

      {/* TODO: Implement stats UI */}
      <div className="[grid-area:stats]">Stats here</div>
    </section>
  );
};

export default StudentCourseDetails;
