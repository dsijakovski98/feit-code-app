import { Link } from "react-router-dom";

import { Spinner } from "@nextui-org/react";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { useLatestExam } from "@/hooks/course/useLatestExam";
import { useCtx } from "@/hooks/useCtx";

const CourseExamInfo = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id } = courseDetails;

  const { data, isLoading } = useLatestExam(id);

  if (isLoading) {
    return (
      <div className="grid h-full place-items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (data === null) {
    return (
      <div className="grid h-full place-items-center content-center gap-3">
        <p className="font-semibold text-foreground-300">You don't have an upcoming exam yet.</p>

        <Button
          size="sm"
          as={Link}
          // @ts-expect-error NextUI not passing through 'as' props
          to="new-exam"
          startContent={<Icon name="add" className="h-4 w-4" />}
          className="text-xs"
        >
          New exam
        </Button>
      </div>
    );
  }

  return <div>CourseExamInfo</div>;
};

export default CourseExamInfo;
