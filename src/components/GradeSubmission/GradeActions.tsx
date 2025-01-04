import { Fragment } from "react";

import { Tooltip } from "@nextui-org/tooltip";

import SubmissionTests from "@/components/GradeSubmission/SubmissionTestsRunner";
import Button from "@/components/ui/Button";

import { LANGUAGES_CONFIG } from "@/constants/code/languages";
import { CleanSubmissionCodeContext } from "@/context/CleanSubmissionCodeContext";
import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  runCode: () => void;
  loading?: boolean;
};

const GradeActions = ({ runCode, loading = false }: Props) => {
  const { activeTask, submission } = useCtx(GradeSubmissionContext);
  const { tests } = activeTask;

  const { isLoading } = useCtx(CleanSubmissionCodeContext);

  const testsSupported = !!LANGUAGES_CONFIG[submission.exam.language].supportsTests;
  const testsAvailable = tests.length > 0;

  const testsDialog = useToggle();

  return (
    <Fragment>
      <div className="sticky bottom-0 flex w-[calc(100%+(2*32px))] -translate-x-8 items-center justify-between gap-4 bg-slate-950 px-8 pb-5">
        <Button
          fullWidth
          color="success"
          onPress={runCode}
          isLoading={loading}
          className="!font-mono text-sm"
        >
          Run Code
        </Button>

        {testsSupported && (
          <Tooltip
            isDisabled={testsAvailable}
            content="Tests not available for this task."
            classNames={{ content: "font-serif text-base px-2" }}
          >
            <div className="basis-full">
              <Button
                fullWidth
                isLoading={isLoading}
                isDisabled={loading || !testsAvailable}
                onPress={testsDialog.toggleOn}
                className="!font-mono text-sm"
              >
                Run Tests
              </Button>
            </div>
          </Tooltip>
        )}
      </div>

      <SubmissionTests dialog={testsDialog} />
    </Fragment>
  );
};

export default GradeActions;
