import { Fragment, useEffect } from "react";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

import RemoveStudent from "@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/StudentsTab/StudentActions/RemoveStudent";
import StudentDetails from "@/components/Courses/ProfessorCourses/CourseDetails/ProfessorCourseDetails/StudentsTab/StudentActions/StudentDetails";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ResponsiveContext } from "@/context/ResponsiveContext";
import { StudentContext } from "@/context/StudentContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const StudentActions = () => {
  const { isMobileSm } = useCtx(ResponsiveContext);
  const { student, joinedAt } = useCtx(StudentContext);

  const removeDialog = useToggle();
  const detailsDialog = useToggle();

  useEffect(() => {
    if (!isMobileSm && detailsDialog.open) {
      detailsDialog.toggleOff();
    }
  }, [isMobileSm, detailsDialog]);

  if (isMobileSm) {
    return (
      <Fragment>
        <Dropdown placement="bottom-end" className="min-w-min" closeOnSelect offset={0}>
          <DropdownTrigger title="View student details/Remove student">
            <Button isIconOnly color="default" variant="light" radius="full" className="p-1.5">
              <Icon name="more" />
            </Button>
          </DropdownTrigger>
          <DropdownMenu>
            <DropdownItem
              key="details"
              className="gap-4"
              textValue="View details"
              startContent={<Icon name="details" className="h-5 w-5" />}
              onPress={detailsDialog.toggleOn}
            >
              <p className="w-fit text-sm font-semibold">Details</p>
            </DropdownItem>

            <DropdownItem
              key="remove"
              className="gap-4"
              textValue="Remove student"
              startContent={<Icon name="trash" className="h-5 w-5 text-danger" />}
              onPress={removeDialog.toggleOn}
            >
              <p className="w-fit text-sm font-semibold text-danger">Remove</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <StudentDetails dialog={detailsDialog} student={student} joinedAt={joinedAt} />
        <RemoveStudent dialog={removeDialog} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Button
        isIconOnly
        color="danger"
        variant="light"
        radius="full"
        aria-label={`Remove ${student.firstName} ${student.lastName} from this course.`}
        className="p-1.5"
        onPress={removeDialog.toggleOn}
      >
        <Icon name="trash" />
      </Button>

      <RemoveStudent dialog={removeDialog} />
    </Fragment>
  );
};

export default StudentActions;
