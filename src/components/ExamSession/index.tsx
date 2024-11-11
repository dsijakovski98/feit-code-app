import Split from "react-split";

import ExamCodeEditor from "@/components/ExamSession/ExamCodeEditor";
import LeaveSession from "@/components/ExamSession/LeaveSession";

import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";

const ExamSession = () => {
  const { exam } = useCtx(ExamSessionContext);
  const { task: activeTask } = useCtx(ExamSessionTaskContext);

  return (
    <main className="bg-gradient-to-b from-transparent via-background/30 to-background/80 *:h-full">
      <Split
        sizes={[70, 30]}
        minSize={[400, 400]}
        snapOffset={5}
        gutterSize={10}
        dragInterval={1}
        gutterAlign="center"
        direction="horizontal"
        cursor="col-resize"
        className="flex [&>.gutter]:rounded"
      >
        <div className="h-[90dvh] *:h-full">
          {exam.tasks.map((task) => task.id === activeTask.id && <ExamCodeEditor key={task.id} />)}
        </div>

        <div className="*:h-full">
          <Split
            sizes={[50, 50]}
            snapOffset={5}
            gutterSize={10}
            dragInterval={1}
            gutterAlign="center"
            direction="vertical"
            cursor="row-resize"
          >
            <div className="max-h-full overflow-y-auto px-8">
              {/* TODO: Task details UI */}
              <LeaveSession />
            </div>

            <div className="max-h-full overflow-y-auto bg-slate-900 px-8 py-5 font-mono text-white">
              Console here
              {/* TODO: Console + Actions UI */}
            </div>
          </Split>
        </div>
      </Split>
    </main>
  );
};

export default ExamSession;
