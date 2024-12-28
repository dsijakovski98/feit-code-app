import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";
import { Listbox, ListboxItem } from "@nextui-org/listbox";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";

import SubmissionTest from "@/components/GradeSubmission/SubmissionTestsRunner/SubmissionTest";
import Button from "@/components/ui/Button";
import PresenceBlock from "@/components/ui/PresenceBlock";
import Stat from "@/components/ui/Stat";

import { TestResult, TestResultQueryKey, runTests } from "@/actions/grades";
import { CleanSubmissionCodeContext } from "@/context/CleanSubmissionCodeContext";
import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";

type Props = {
  dialog: Toggle;
};

const SubmissionTestsRunner = ({ dialog }: Props) => {
  const { getToken } = useAuth();

  const queryClient = useQueryClient();

  const { activeTask, submission } = useCtx(GradeSubmissionContext);
  const { title, tests } = activeTask;
  const { student, exam } = submission;
  const { language } = exam;

  const { data: cleanCode } = useCtx(CleanSubmissionCodeContext);

  const emptyResults = () => {
    return tests.reduce(
      (acc, test) => {
        acc[test.id] = null;
        return acc;
      },
      {} as Record<string, TestResult>,
    );
  };

  const [testResults, setTestResults] = useState(() => emptyResults());

  const testRuns = useMemo(() => Object.values(testResults).filter((result) => !!result), [testResults]);
  const showStats = useMemo(() => testRuns.length > 0, [testRuns.length]);

  const successCount = useMemo(() => testRuns.filter((result) => !!result?.success).length, [testRuns]);
  const failedCount = testRuns.length - successCount;

  const resetResults = () => {
    setTestResults(emptyResults());
  };

  const { mutate, isPending } = useMutation({
    mutationFn: runTests,
    onSuccess: (results) => {
      if (!results) return;

      Object.entries(results).forEach(([testId, result]) => {
        const testResultQueryKey: TestResultQueryKey = {
          name: "test-result",
          submissionId: submission.id,
          testId,
        };
        queryClient.setQueryData([testResultQueryKey], result);
      });

      setTestResults(results);
    },
  });

  const runAllTests = async () => {
    if (!cleanCode) return;

    resetResults();

    const cachedResultsData = queryClient.getQueriesData<TestResult>({
      queryKey: [{ name: "test-result", submissionId: submission.id }],
    });
    if (cachedResultsData) {
      const cachedResults = cachedResultsData.reduce(
        (acc, resultData) => {
          const [queryKey, testResult] = resultData;
          if (!testResult) return acc;

          const { testId } = queryKey[0] as TestResultQueryKey;

          acc[testId] = testResult;
          return acc;
        },
        {} as Record<string, TestResult>,
      );

      setTestResults(cachedResults);

      // No need to run mutation if all test results are cached
      if (cachedResultsData.length === tests.length) {
        return;
      }
    }

    const token = await getToken();

    if (!token) {
      toast.error("Token not found!");
      return;
    }

    mutate({ tests, token, code: cleanCode, language, name: title });
  };

  return (
    <Modal
      isOpen={dialog.open}
      onOpenChange={dialog.toggle}
      hideCloseButton
      size="5xl"
      placement="center"
      backdrop="opaque"
      classNames={{
        base: "font-serif",
        backdrop: "bg-background/50",
        header: "border-b border-b-content3 dark:border-b-content3/50 py-4",
        body: "py-6 !max-h-[600px] overflow-y-auto",
      }}
    >
      <ModalContent>
        <ModalHeader className="text-2xl">
          <div>
            <h2>Run Tests: {title}</h2>
            <p className="font-sans text-base font-normal">
              {student.firstName} {student.lastName}, {student.indexNumber}/{student.indexYear}{" "}
              {student.major}
            </p>
          </div>
        </ModalHeader>

        <ModalBody>
          <Listbox aria-label="List of test inputs/output" classNames={{ list: "space-y-6" }}>
            {tests.map((test, idx) => (
              <ListboxItem
                key={test.id}
                disableAnimation
                textValue={`Test ${idx + 1}`}
                className="!cursor-default rounded-lg !bg-transparent px-3 outline outline-content2 hover:!bg-transparent"
              >
                <SubmissionTest
                  test={test}
                  index={idx}
                  resultsLoading={isPending}
                  result={testResults[test.id]}
                  setTestResults={setTestResults}
                />
              </ListboxItem>
            ))}
          </Listbox>
        </ModalBody>

        <ModalFooter className="items-center gap-4">
          <div className="mr-auto">
            <PresenceBlock show={showStats} mode="appear">
              <div className="flex items-end gap-12 font-sans *:!text-sm">
                <Stat label="Total Runs" value={testRuns.length} size="sm" />
                <Stat label="Success" value={successCount} size="sm" />
                <Stat label="Fail" value={failedCount} size="sm" />
              </div>
            </PresenceBlock>
          </div>

          <PresenceBlock show={showStats} mode="appear">
            <Button className="px-6 text-base" color="default" onPress={resetResults} isDisabled={isPending}>
              Clear Tests
            </Button>
          </PresenceBlock>

          <Button className="px-6 text-base" color="success" onPress={runAllTests} isDisabled={isPending}>
            Run All Tests
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SubmissionTestsRunner;
