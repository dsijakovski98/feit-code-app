import { useMemo } from "react";

import { Chip } from "@nextui-org/chip";
import { User } from "@nextui-org/user";

import CategoryChip from "@/components/ui/CategoryChip";
import Timestamp from "@/components/ui/Timestamp";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useAvatar } from "@/hooks/useAvatar";
import { useCtx } from "@/hooks/useCtx";
import { useFCUser } from "@/hooks/useFCUser";
import { TEACHER_TYPE } from "@/types";

const userAvatarProps = {
  isBordered: true,
  className: "-ring-offset-1",
  color: "primary",
} as const;

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
  const professorFullName = useMemo(
    () => `${professor.firstName} ${professor.lastName}`,
    [professor.firstName, professor.lastName],
  );
  const assistantFullName = useMemo(
    () => `${assistant?.firstName} ${assistant?.lastName}`,
    [assistant?.firstName, assistant?.lastName],
  );
  return (
    <div className="space-y-10">
      <div>
        <h2 className="text-lg font-bold">
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

        <p className="mb-2 font-medium">{description}</p>
        <p className="text-sm text-foreground-300">
          Updated <Timestamp>{updatedAt}</Timestamp>
        </p>
      </div>

      <div className="space-y-6">
        <ul className="flex max-w-[40ch] flex-wrap items-center gap-2 lg:gap-1">
          {categories.map(({ category, categoryId }) => (
            <li key={categoryId}>
              <CategoryChip category={category} />
            </li>
          ))}
        </ul>

        <div className="flex w-fit flex-wrap items-end gap-8 lg:w-full lg:justify-between">
          <User
            name={
              <a href={`mailto: ${professor.email}`} className="font-semibold">
                {userFullName === professorFullName ? "You" : professorFullName}
              </a>
            }
            description={<p className="text-sm">{TEACHER_TYPE.professor}</p>}
            avatarProps={{
              showFallback: true,
              src: professorAvatar ?? "",
              ...(userFullName === professorFullName ? userAvatarProps : {}),
            }}
            className="shrink-0"
          />

          {assistant ? (
            <User
              name={
                <a href={`mailto:${assistant.email}`} className="font-semibold">
                  {userFullName === assistantFullName ? "You" : assistantFullName}
                </a>
              }
              description={<p className="text-sm">{TEACHER_TYPE.assistant}</p>}
              avatarProps={{
                showFallback: true,
                src: assistantAvatar ?? "",
                ...(userFullName === assistantFullName ? userAvatarProps : {}),
              }}
              className="shrink-0"
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
