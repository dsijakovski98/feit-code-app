import { Fragment } from "react/jsx-runtime";

import { Avatar } from "@nextui-org/react";

import CourseActions from "@/components/Courses/CourseCard/CourseActions";
import CourseActivity from "@/components/Courses/CourseCard/CourseActivity";
import CourseCategories from "@/components/Courses/CourseCard/CourseCategories";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Icon from "@/components/ui/Icon";

import CourseCardProvider, { CourseCardContext } from "@/context/CourseCardContext";
import { useDeleteCourse } from "@/hooks/course/useDeleteCourse";
import { useToggle } from "@/hooks/useToggle";

const CourseCard = (props: CourseCardContext) => {
  const { course } = props;
  const { id, name, academicYear, archived, description, professorId } = course;

  const dialog = useToggle();

  const { mutate, isPending } = useDeleteCourse({ name, professorId });

  const onConfirm = () => {
    mutate(id);
  };

  return (
    <CourseCardProvider {...props}>
      <div className="relative flex h-full flex-col justify-between gap-2 overflow-hidden rounded-lg border border-content3 bg-content1 p-4 font-sans shadow-md dark:border-content1 dark:bg-background lg:p-4">
        <div className="flex h-full w-[40ch] flex-col justify-start space-y-5 overflow-hidden lg:w-[30ch] lg:space-y-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-sm font-semibold text-primary dark:text-primary-700">{academicYear}</span>
              <h3 className="flex w-full items-end gap-4 truncate text-lg font-semibold lg:text-lg">
                {name}
              </h3>
            </div>

            <Avatar size="sm" color="primary" fallback={<Icon name="course" />} />
          </div>

          <p className="line-clamp-2 h-[5.5ch] pb-2 text-base font-medium text-foreground-400">
            {description}
          </p>

          <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-start">
            {!archived && (
              <Fragment>
                <CourseCategories />
                <CourseActions />
              </Fragment>
            )}
          </div>
        </div>

        {archived && <CourseActivity label="Delete" onPress={dialog.toggleOn} />}

        <ConfirmDialog
          dialog={dialog}
          loading={isPending}
          color="danger"
          title="Delete Course?"
          description="You cannot undo this later."
          action={{ label: "Delete", onConfirm }}
        />
      </div>
    </CourseCardProvider>
  );
};

export default CourseCard;
