import { Fragment } from "react";
import { Link } from "react-router-dom";

import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import ExamHistoryItem from "@/components/Courses/StudentCourses/CourseDetails/ExamHistory/ExamHistoryItem";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { SUBMISSION_STATUS } from "@/constants/enums";
import { ROUTES } from "@/constants/routes";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { JoinedCourseContext } from "@/context/JoinedCourseContext";
import { useStudentExamHistory } from "@/hooks/student/useStudentExamHistory";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const ExamHistory = () => {
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { name } = courseDetails;

  const { joinedData } = useCtx(JoinedCourseContext);
  const { studentId, courseId } = joinedData;

  const dialog = useToggle();

  const { data: examHistory, isPending } = useStudentExamHistory({ studentId, courseId });

  return (
    <Fragment>
      <Button
        color="default"
        variant="ghost"
        isLoading={isPending}
        isDisabled={!examHistory}
        startContent={!isPending && <Icon name="history" className="h-5 w-5" />}
        onPress={dialog.toggleOn}
        className="text-sm"
      >
        Exam History
      </Button>

      {examHistory && (
        <Modal
          isOpen={dialog.open}
          onClose={dialog.toggleOff}
          hideCloseButton
          size="3xl"
          placement="center"
          backdrop="opaque"
          classNames={{
            base: "font-serif",
            backdrop: "bg-background/50",
            header: "border-b border-b-content3 dark:border-b-content3/50 py-3 text-2xl",
            body: "py-4",
          }}
        >
          <ModalContent>
            <ModalHeader className="block">
              <p className="text-2xl">{name}</p>

              <p className="text-base font-normal">Exam History</p>
            </ModalHeader>

            <ModalBody>
              <ScrollShadow className="max-h-[500px] pr-2">
                <Listbox
                  variant="flat"
                  items={examHistory}
                  aria-label={`History of exams for ${courseDetails.name}.`}
                  emptyContent={"You have not taken any exams yet..."}
                  classNames={{ emptyContent: "text-foreground-300 p-0" }}
                >
                  {(historyItem) => (
                    <ListboxItem
                      key={historyItem.id}
                      textValue={historyItem.exam.name}
                      className="rounded-lg p-3"
                    >
                      {historyItem.status === SUBMISSION_STATUS.graded ? (
                        <Link
                          target="_blank"
                          aria-label={`${historyItem.exam.name} feedback`}
                          to={`${ROUTES.exams}?fb=${historyItem.exam.id}`}
                        >
                          <ExamHistoryItem isLink historyItem={historyItem} />
                        </Link>
                      ) : (
                        <ExamHistoryItem historyItem={historyItem} />
                      )}
                    </ListboxItem>
                  )}
                </Listbox>
              </ScrollShadow>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Fragment>
  );
};

export default ExamHistory;
