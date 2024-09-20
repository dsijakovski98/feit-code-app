import { User } from "@nextui-org/react";

import CategoryChip from "@/components/ui/CategoryChip";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useAvatar } from "@/hooks/useAvatar";
import { useCtx } from "@/hooks/useCtx";
import { TEACHER_TYPE } from "@/types";

import "./styles.css";

const GeneralTab = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name, description, professor, assistant, categories } = courseDetails;

  const [professorAvatar] = useAvatar(courseDetails?.professorId);
  const [assistantAvatar] = useAvatar(courseDetails?.assistantId ?? "");

  return (
    <div className="general lg:block lg:space-y-8">
      <div className="space-y-6 [grid-area:details]">
        <div>
          <h4 className="text-2xl font-semibold">{name}</h4>
          <p className="text-lg">{description}</p>
        </div>

        <div className="space-y-2">
          <h5 className="text-lg font-semibold">Categories</h5>

          <ul className="flex max-w-[40ch] flex-wrap items-center gap-2">
            {categories.map(({ category, categoryId }) => (
              <li key={categoryId}>
                <CategoryChip category={category} />
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2">
          <h5 className="text-lg font-semibold">Taught by</h5>

          <div className="flex w-fit items-end gap-16 lg:w-full lg:flex-wrap lg:justify-between">
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
              <p className="font-semibold text-foreground-300">
                There is no assistant for this course yet.
              </p>
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
