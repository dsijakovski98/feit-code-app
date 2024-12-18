import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { ExamSubmissionContext } from "@/context/ExamSubmissionContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { gradeExamHref } from "@/utils/exams/sessions";

const SubmissionActions = () => {
  const { isMobileSm } = useCtx(ResponsiveContext);
  const { submission } = useCtx(ExamSubmissionContext);
  const { examId, studentId } = submission;

  const gradeHref = useMemo(() => gradeExamHref(examId, studentId), [examId, studentId]);

  if (isMobileSm) {
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
              as={Link}
              // @ts-expect-error NextUI not passing through 'as' props
              to={gradeHref}
              className="items-start gap-4"
              textValue="Grade, give feedback"
              startContent={<Icon name="grade" className="h-6 w-6" />}
            >
              {/* TODO: Grade UI + flow */}
              <p className="w-fit text-base font-semibold">Grade Student</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {/* TODO: Submission Details UI */}
      </Fragment>
    );
  }

  return (
    <Button
      as={Link}
      // @ts-expect-error NextUI not passing through 'as' props
      to={gradeHref}
      isIconOnly
      radius="full"
      variant="light"
      color="default"
      className="p-1.5"
    >
      <Icon name="grade" />
    </Button>
  );
};

export default SubmissionActions;
