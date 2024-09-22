import { Link } from "react-router-dom";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const EmptyProfessorCourses = () => {
  return (
    <div className="grid place-items-center gap-4 p-8 text-center">
      <p className="font-semibold text-foreground-300">
        You are not teaching any courses yet. Let's change that.
      </p>

      <Button
        as={Link}
        // @ts-expect-error NextUI not passing through 'as' props
        to="new"
        color="primary"
        startContent={<Icon name="add" className="h-5 w-5" />}
      >
        New Course
      </Button>
    </div>
  );
};

export default EmptyProfessorCourses;
