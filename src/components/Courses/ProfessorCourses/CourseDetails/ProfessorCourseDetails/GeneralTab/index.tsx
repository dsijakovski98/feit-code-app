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

import "./styles.css";

const GeneralTab = () => {
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

  if (!userData) return null;

  return (
    <div className="general lg:block lg:space-y-6">
      <div className="max-w-[55ch] space-y-10 [grid-area:details] lg:max-w-full">
        <div>
          <h2 className="text-2xl font-semibold">
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
          <p className="mb-1 text-lg font-medium">{description}</p>
          <p className="text-base text-foreground-300">
            Updated <Timestamp>{updatedAt}</Timestamp>
          </p>
        </div>

        <div className="space-y-6">
          <ul className="flex max-w-[40ch] flex-wrap items-center gap-2">
            {categories.map(({ category, categoryId }) => (
              <li key={categoryId}>
                <CategoryChip size="sm" category={category} />
              </li>
            ))}
          </ul>

          <div className="flex w-fit items-end gap-12 lg:w-full lg:flex-wrap lg:justify-between">
            <User
              name={
                <a href={`mailto: ${professor.email}`} className="text-base font-semibold">
                  {userFullName === professorFullName ? "You" : professorFullName}
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
                    {userFullName === assistantFullName ? "You" : assistantFullName}
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
              <p className="font-semibold text-foreground-300">There is no assistant for this course yet.</p>
            )}
          </div>
        </div>
      </div>

      <div className="[grid-area:exam]">Latest exam here</div>

      <div className="[grid-area:stats]">Stats here</div>
    </div>
  );
};

export default GeneralTab;
