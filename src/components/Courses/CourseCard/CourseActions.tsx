import { Link } from "react-router-dom";

import clsx from "clsx";

import JoinCourse from "@/components/Courses/JoinCourse";
import Button from "@/components/ui/Button";

import { CourseCardContext } from "@/context/CourseCardContext";
import { useCtx } from "@/hooks/useCtx";
import { USER_TYPE } from "@/types";

const CourseActions = () => {
  const { course, mode } = useCtx(CourseCardContext);
  const { id } = course;

  return (
    <div className={clsx("mt-auto flex items-center justify-between gap-2 lg:w-full lg:pb-1")}>
      <Button
        as={Link}
        // @ts-expect-error NextUI not passing through 'as' props
        to={id}
        size="sm"
        variant="light"
        color="default"
        className="px-5 text-sm lg:px-0"
      >
        Details
      </Button>

      {mode === USER_TYPE.student && <JoinCourse />}
    </div>
  );
};

export default CourseActions;
