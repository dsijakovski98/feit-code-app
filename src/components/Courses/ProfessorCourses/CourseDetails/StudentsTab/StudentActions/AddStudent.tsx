import { Fragment, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { User } from "@nextui-org/user";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { addStudents } from "@/actions/students";
import { CourseDetailsContext } from "@/context/CourseDetailsContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useOutsideStudents } from "@/hooks/student/useOutsideStudents";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

const AddStudent = () => {
  const { isMobile } = useCtx(ResponsiveContext);
  const { courseDetails } = useCtx(CourseDetailsContext);
  const { id: courseId, students } = courseDetails;

  const dialog = useToggle();

  const joinedIds = useMemo(() => students.map(({ studentId }) => studentId), [students]);
  const { data: outsideStudents, isLoading } = useOutsideStudents(joinedIds);

  const [selectedStudents, setSelectedStudents] = useState<NonNullable<typeof outsideStudents>>([]);
  const [inputValue, setInputValue] = useState("");

  const studentOptions = useMemo(
    () =>
      outsideStudents?.filter(
        (student) => !selectedStudents.find((selectedStudent) => selectedStudent.id === student.id),
      ) ?? [],
    [selectedStudents, outsideStudents],
  );

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: addStudents,
    onSuccess: async (success) => {
      if (!success) return;

      await Promise.all([
        queryClient.invalidateQueries({ queryKey: [{ name: "students", joinedIds }] }),
        queryClient.invalidateQueries({ queryKey: [{ name: "courses", courseId }] }),
      ]);

      toast.success("New students joined the course!");
      dialog.toggleOff();
    },
  });

  const selectStudent = (studentId: string | null) => {
    if (!studentId) return;

    const outsideStudent = outsideStudents?.find((outsideStudent) => outsideStudent.id === studentId);

    if (!outsideStudent) return;

    setSelectedStudents((prev) => [...prev, outsideStudent]);
    setInputValue("");
  };

  const unselectStudent = (studentId: string) => {
    setSelectedStudents((prev) => prev.filter((student) => student.id !== studentId));
    setInputValue("");
  };

  const handleAddStudents = () => {
    const studentIds = selectedStudents.map((student) => student.id);

    mutate({ courseId, studentIds });
  };

  const renderStudentItem = (student: (typeof selectedStudents)[number]) => (
    <User
      name={`${student.firstName} ${student.lastName}`}
      description={student.email}
      avatarProps={{ className: "hidden" }}
      classNames={{
        name: "font-semibold text-base",
        description: "text-xs",
      }}
    />
  );

  return (
    <Fragment>
      <Button
        variant="light"
        color="default"
        isLoading={isLoading}
        onPress={dialog.toggleOn}
        size={isMobile ? "sm" : "md"}
        startContent={!isLoading && <Icon name="add" className="h-5 w-5" />}
        className="pl-3 lg:text-sm"
      >
        Add Students
      </Button>

      <Modal
        size="xl"
        isOpen={dialog.open}
        onOpenChange={dialog.toggle}
        hideCloseButton
        placement="center"
        backdrop="opaque"
        classNames={{
          base: "font-serif",
          backdrop: "bg-background/50",
          header: "border-b border-b-content3 dark:border-b-content3/50 py-3",
          body: "pb-0 pt-6",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader className="text-2xl">New Students</ModalHeader>

              <ModalBody className="relative mb-8">
                <div className="space-y-8">
                  <form className="flex gap-2">
                    <Autocomplete
                      size="lg"
                      variant="underlined"
                      isClearable={false}
                      label="Student select"
                      placeholder="Search by name"
                      description="Select students you want to add to this course."
                      defaultItems={studentOptions}
                      inputValue={inputValue}
                      onInputChange={setInputValue}
                      isDisabled={studentOptions.length === 0 || isPending}
                      onSelectionChange={(key) => selectStudent(key as string)}
                      inputProps={{
                        classNames: {
                          label: "font-semibold !text-foreground text-lg lg:text-base",
                          input: "placeholder:!text-foreground-200",
                          description: "text-sm text-foreground-300 font-semibold translate-y-0.5",
                        },
                      }}
                      classNames={{
                        clearButton: "p-0.5",
                        endContentWrapper: "*:h-6 *:w-6 *:min-w-0 -mr-0.5",
                      }}
                    >
                      {(student) => (
                        <AutocompleteItem
                          key={student.id}
                          textValue={`${student.firstName} ${student.lastName}`}
                        >
                          {renderStudentItem(student)}
                        </AutocompleteItem>
                      )}
                    </Autocomplete>
                    <button type="submit" hidden aria-hidden aria-label="Select student" />
                  </form>

                  <motion.ul layout className="max-h-[200px] space-y-4 overflow-y-scroll pl-1">
                    {selectedStudents.map((student) => (
                      <motion.li layout key={student.id} className="flex justify-between gap-8">
                        <div>{renderStudentItem(student)}</div>

                        <Button
                          isIconOnly
                          size="sm"
                          color="default"
                          variant="light"
                          radius="full"
                          aria-label="Remove selected student"
                          onPress={() => unselectStudent(student.id)}
                        >
                          <Icon name="close" className="h-5 w-5" />
                        </Button>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </ModalBody>

              <ModalFooter as={motion.div} layout>
                <Button
                  fullWidth
                  color="default"
                  variant="bordered"
                  onPress={onClose}
                  isDisabled={isPending}
                  className="text-sm"
                >
                  Cancel
                </Button>

                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  isLoading={isPending}
                  isDisabled={selectedStudents.length === 0}
                  onPress={handleAddStudents}
                  className="text-sm"
                >
                  Add Student{selectedStudents.length !== 1 && "s"}
                  <span className="-translate-x-1 font-sans">
                    {selectedStudents.length > 0 && `(${selectedStudents.length})`}
                  </span>
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default AddStudent;
