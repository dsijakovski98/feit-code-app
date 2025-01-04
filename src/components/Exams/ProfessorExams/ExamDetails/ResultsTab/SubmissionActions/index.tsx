import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";

import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/dropdown";

import SubmissionDetails from "@/components/Exams/ProfessorExams/ExamDetails/ResultsTab/SubmissionDetails";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { SUBMISSION_STATUS } from "@/constants/enums";
import { ExamSubmissionContext } from "@/context/ExamSubmissionContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { gradeExamHref } from "@/utils/exams/sessions";

const SubmissionActions = () => {
  const { isMobileSm } = useCtx(ResponsiveContext);
  const { submission } = useCtx(ExamSubmissionContext);
  const { examId, studentId, status } = submission;

  const submissionDialog = useToggle();

  const gradeHref = useMemo(() => gradeExamHref(examId, studentId), [examId, studentId]);

  const disabledKeys = useMemo(() => (status === SUBMISSION_STATUS.graded ? ["grade"] : []), [status]);

  if (isMobileSm) {
    return (
      <Fragment>
        <Dropdown placement="bottom-end" closeOnSelect>
          <DropdownTrigger>
            <Button isIconOnly color="default" variant="light" radius="full" className="p-1.5">
              <Icon name="more" />
            </Button>
          </DropdownTrigger>

          <DropdownMenu disabledKeys={disabledKeys}>
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
                onPress={submissionDialog.toggleOn}
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
              startContent={<Icon name="grade" className="h-6 w-6" />}
            >
              <p className="w-fit text-base font-semibold">Grade Student</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <SubmissionDetails dialog={submissionDialog} submission={submission} />
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
      isDisabled={status === SUBMISSION_STATUS.graded}
    >
      <Icon name="grade" />
    </Button>
  );
};

export default SubmissionActions;
