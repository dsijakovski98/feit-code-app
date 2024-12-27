import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";

import { useAuth } from "@clerk/clerk-react";
import { Accordion, AccordionItem } from "@nextui-org/accordion";

import TestParameterValue from "@/components/Tests/TestParameterValue";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { TestResult, runSingleTest } from "@/actions/grades";
import { CleanSubmissionCodeContext } from "@/context/CleanSubmissionCodeContext";
import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { SubmissionDetails } from "@/hooks/submission/useSubmissionDetails";
import { useCtx } from "@/hooks/useCtx";
import { UseState } from "@/types";
import { simplePlural } from "@/utils";

type Props = {
  test: SubmissionDetails["exam"]["tasks"][number]["tests"][number];
  index: number;

  result?: TestResult;
  setTestResults: UseState<Record<string, TestResult>>[1];

  resultsLoading?: boolean;
};

const SubmissionTest = ({ test, index, result, setTestResults, resultsLoading = false }: Props) => {
  const { getToken } = useAuth();

  const { submission, activeTask } = useCtx(GradeSubmissionContext);
  const { exam } = submission;
  const { title } = activeTask;

  const { data: cleanCode } = useCtx(CleanSubmissionCodeContext);

  const { mutate, isPending } = useMutation({
    mutationFn: runSingleTest,
    onSuccess: (testResult) => {
      if (!testResult) return;

      setTestResults((prev) => {
        prev[test.id] = testResult;
        return { ...prev };
      });
    },
    onError: (error) => toast.error(error.message),
  });

  const runTest = async () => {
    if (!cleanCode) return;

    const token = await getToken();

    if (!token) {
      toast.error("Token not found!");
      return;
    }

    mutate({ test, token, code: cleanCode, language: exam.language, name: title });
  };

  const isLoading = resultsLoading || isPending;

  const selectedKeys = result ? [test.id] : [];

  return (
    <div className={clsx("flex gap-3", result ? "items-start" : "items-center")}>
      <Accordion hideIndicator selectedKeys={selectedKeys} onSelectionChange={undefined}>
        <AccordionItem
          as={"div"}
          key={test.id}
          aria-label={`Test ${index + 1} header`}
          classNames={{ trigger: "py-1 cursor-default" }}
          title={
            <div className="flex">
              <div>
                <p className="text-sm font-medium">{simplePlural("Input", test.inputs.length)}</p>

                <ol className="flex items-center gap-3">
                  {test.inputs.map((input) => (
                    <li key={input.name} className="py-1">
                      <TestParameterValue
                        type={input.valueType}
                        value={input.value}
                        className="rounded-lg px-2 py-1 text-base outline outline-content2"
                      />
                    </li>
                  ))}
                </ol>
              </div>

              <div className="ml-auto flex flex-col items-end">
                <p className="text-sm font-medium">Output</p>
                <TestParameterValue type={test.outputType} value={test.outputValue} className="text-base" />
              </div>
            </div>
          }
        >
          {result && (
            <p
              className={clsx("font-sans text-base font-semibold", {
                "text-success": result.success,
                "text-danger": !result.success,
              })}
            >
              {result.message}
            </p>
          )}
        </AccordionItem>
      </Accordion>

      <div>
        {!result && (
          <Button
            isIconOnly
            size="lg"
            radius="full"
            variant="light"
            color="success"
            isLoading={isLoading}
            onPress={runTest}
            aria-label="Run this test to get results."
          >
            <Icon name="test" className="h-6 w-6" />
          </Button>
        )}

        {result && (
          <Button
            isIconOnly
            disableRipple
            size="lg"
            radius="full"
            variant="light"
            className="pointer-events-none"
            color={result.success ? "success" : "danger"}
          >
            <Icon name={result.success ? "check" : "close"} className="h-8 w-8" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SubmissionTest;
