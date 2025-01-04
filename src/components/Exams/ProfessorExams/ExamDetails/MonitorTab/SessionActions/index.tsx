import { Fragment } from "react";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/dropdown";

import RemoveSession from "@/components/Exams/ProfessorExams/ExamDetails/MonitorTab/SessionActions/RemoveSession";
import SessionDetails from "@/components/Exams/ProfessorExams/ExamDetails/MonitorTab/SessionDetails";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ResponsiveContext } from "@/context/ResponsiveContext";
import { StudentSessionContext } from "@/context/StudentSessionContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const SessionActions = () => {
  const { isMobileSm } = useCtx(ResponsiveContext);
  const { session } = useCtx(StudentSessionContext);

  const removeDialog = useToggle();
  const detailsDialog = useToggle();

  if (isMobileSm) {
    return (
      <Fragment>
        <Dropdown isDisabled={!!session.removed} placement="bottom-end" closeOnSelect>
          <DropdownTrigger>
            <Button isIconOnly color="default" variant="light" radius="full" className="p-1.5">
              <Icon name="more" />
            </Button>
          </DropdownTrigger>

          <DropdownMenu>
            <DropdownItem
              key="details"
              className="gap-4"
              textValue="Session details"
              startContent={<Icon name="details" className="h-5 w-5" />}
              onPress={detailsDialog.toggleOn}
            >
              <p className="w-fit text-sm font-semibold">Session details</p>
            </DropdownItem>

            <DropdownItem
              key="remove"
              className="gap-4"
              textValue="Remove from exam"
              startContent={<Icon name="logout" className="h-5 w-5 text-danger" />}
              onPress={removeDialog.toggleOn}
            >
              <p className="w-fit text-sm font-semibold text-danger">Remove</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <SessionDetails dialog={detailsDialog} session={session} />
        <RemoveSession dialog={removeDialog} />
      </Fragment>
    );
  }

  return (
    <Fragment>
      <Button
        isIconOnly
        radius="full"
        variant="light"
        color="danger"
        className="p-2"
        isDisabled={!!session.removed || session.status === "Finished"}
        onPress={removeDialog.toggleOn}
      >
        <Icon name="logout" />
      </Button>

      <RemoveSession dialog={removeDialog} />
    </Fragment>
  );
};

export default SessionActions;
