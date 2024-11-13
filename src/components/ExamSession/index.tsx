import Split from "react-split";

import ExamCodeEditor from "@/components/ExamSession/ExamTask/CodeEditor";
import ExamTaskDescription from "@/components/ExamSession/ExamTask/Description";
import ExamTaskOutput from "@/components/ExamSession/ExamTask/Output";

import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskContext } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";

const ExamSession = () => {
  const { exam } = useCtx(ExamSessionContext);
  const { task: activeTask } = useCtx(ExamSessionTaskContext);

  return (
    <main className="border-t-8 border-t-content4 bg-gradient-to-b from-transparent via-background/30 to-background/80 *:h-full dark:border-t-content2">
      <Split
        sizes={[70, 30]}
        minSize={[400, 400]}
        snapOffset={5}
        gutterSize={10}
        dragInterval={1}
        gutterAlign="center"
        direction="horizontal"
        cursor="col-resize"
        className="flex"
      >
        <div className="h-[calc(90dvh-5.5px)] *:h-full">
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
            <div className="max-h-full overflow-y-auto px-8 pb-5 pt-2">
              <ExamTaskDescription />
            </div>

            <div className="max-h-full overflow-y-auto bg-slate-950 px-8">
              {exam.tasks.map((task) => task.id === activeTask.id && <ExamTaskOutput key={task.id} />)}
            </div>
          </Split>
        </div>
      </Split>
    </main>
  );
};

export default ExamSession;
