import { Fragment } from "react/jsx-runtime";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const SubmissionActions = () => {
  return (
    <Fragment>
      <Dropdown placement="bottom-end" closeOnSelect>
        <DropdownTrigger>
          <Button isIconOnly color="default" variant="light" radius="full" className="p-1.5">
            <Icon name="more" />
          </Button>
        </DropdownTrigger>

        <DropdownMenu>
          <DropdownSection
            showDivider
            className="hidden md:block"
            classNames={{ divider: "h-px opacity-[0.2]" }}
          >
            <DropdownItem
              key="details"
              className="hidden gap-4 md:flex"
              textValue="Details"
              startContent={<Icon name="details" className="h-6 w-6" />}
            >
              <p className="w-fit text-base font-semibold">Details</p>
            </DropdownItem>
          </DropdownSection>

          <DropdownItem
            key="grade"
            className="items-start gap-4"
            textValue="Grade, give feedback"
            startContent={<Icon name="grade" className="h-6 w-6" />}
          >
            {/* TODO: Grade UI + flow */}
            <p className="w-fit text-base font-semibold">Grade</p>
          </DropdownItem>

          <DropdownItem
            key="tests"
            className="gap-4"
            textValue="Run automatic tests"
            startContent={<Icon name="test" className="h-6 w-6 scale-90" />}
          >
            {/* Automated Tests UI + flow */}
            <p className="w-fit text-base font-semibold">Run Tests</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* TODO: Submission Details UI */}
    </Fragment>
  );
};

export default SubmissionActions;
