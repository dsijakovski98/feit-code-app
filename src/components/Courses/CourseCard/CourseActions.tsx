import { Link } from "react-router-dom";

import clsx from "clsx";

import JoinCourse from "@/components/Courses/JoinCourse";
import Icon from "@/components/ui/Icon";

import { CourseCardContext } from "@/context/CourseCardContext";
import { useCtx } from "@/hooks/useCtx";
import { USER_TYPE } from "@/types";

const CourseActions = () => {
  const { course, mode } = useCtx(CourseCardContext);
  const { id, archived } = course;

  return (
    <div
      className={clsx("mt-auto flex items-center justify-between gap-4 p-2.5 pb-0.5 pl-0", {
        "flex-row-reverse": mode === USER_TYPE.student,
        "pb-2.5": archived,
      })}
    >
      <Link
        to={id}
        className="group flex w-fit items-center justify-between gap-2 font-semibold lg:gap-1"
      >
        Details{" "}
        <Icon
          name="right"
          className="h-5 w-5 -translate-x-2 translate-y-px scale-90 opacity-0 transition-[opacity_transform] group-hover:translate-x-0 group-hover:opacity-100 group-focus:translate-x-0 group-focus:opacity-100 lg:translate-x-0 lg:opacity-100"
        />
      </Link>

      {mode === USER_TYPE.student && <JoinCourse />}
    </div>
  );
};

export default CourseActions;
