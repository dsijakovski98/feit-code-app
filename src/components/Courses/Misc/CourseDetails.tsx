import { useMemo } from "react";

import { Chip } from "@nextui-org/chip";

import CourseTeacher from "@/components/Courses/Misc/CourseTeacher";
import CategoryChip from "@/components/ui/CategoryChip";
import Timestamp from "@/components/ui/Timestamp";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useAvatar } from "@/hooks/useAvatar";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { TEACHER_TYPE } from "@/types";

const CourseDetails = () => {
  const { userData } = useFCUser();
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name, description, professor, assistant, categories, archived, updatedAt } = courseDetails;
  const [professorAvatar] = useAvatar(courseDetails?.professorId);
  const [assistantAvatar] = useAvatar(courseDetails?.assistantId ?? "");

  const userFullName = useMemo(
    () => `${userData?.user.firstName} ${userData?.user.lastName}`,
    [userData?.user.firstName, userData?.user.lastName],
  );

  return (
    <div className="space-y-16">
      <div className="flex items-start justify-between gap-6">
        <div>
          <h2 className="text-xl font-semibold">
            {name}{" "}
            {archived && (
              <Chip
                size="sm"
                color="default"
                className="ml-2 -translate-y-1 px-2"
                classNames={{ content: "font-semibold text-sm" }}
              >
                Archived
              </Chip>
            )}
          </h2>

          <p className="mb-1 font-medium">{description}</p>
          <p className="text-foreground-300">
            Updated <Timestamp>{updatedAt}</Timestamp>
          </p>
        </div>

        <p className="text-xl font-semibold">{courseDetails.academicYear}</p>
      </div>

      <div className="space-y-8">
        <ul className="flex max-w-[40ch] flex-wrap items-center gap-2 lg:gap-1">
          {categories.map(({ category, categoryId }) => (
            <li key={categoryId}>
              <CategoryChip category={category} />
            </li>
          ))}
        </ul>

        <div className="flex w-fit flex-wrap items-end gap-8 lg:w-full lg:justify-between">
          <CourseTeacher
            teacher={professor}
            type={TEACHER_TYPE.professor}
            userFullName={userFullName}
            avatarUrl={professorAvatar}
          />

          {assistant ? (
            <CourseTeacher
              teacher={assistant}
              type={TEACHER_TYPE.assistant}
              userFullName={userFullName}
              avatarUrl={assistantAvatar}
            />
          ) : (
            <p className="shrink font-semibold text-foreground-300">This course doesn't have an assistant.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
