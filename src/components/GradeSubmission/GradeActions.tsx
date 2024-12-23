import Button from "@/components/ui/Button";

import { GradeSubmissionContext } from "@/context/GradeSubmissionContext";
import { useCtx } from "@/hooks/useCtx";

type Props = {
  runCode: () => void;
  loading?: boolean;
};

const GradeActions = ({ runCode, loading = false }: Props) => {
  const { activeTask } = useCtx(GradeSubmissionContext);
  console.log(activeTask);

  return (
    <div className="sticky bottom-0 flex w-[calc(100%+(2*32px))] -translate-x-8 items-center justify-between gap-4 bg-slate-950 px-8 pb-5">
      <Button fullWidth color="success" className="!font-mono text-sm" isLoading={loading} onPress={runCode}>
        Run Code
      </Button>

      <Button fullWidth className="!font-mono text-sm" disabled={loading}>
        Run Tests
      </Button>
    </div>
  );
};

export default GradeActions;
