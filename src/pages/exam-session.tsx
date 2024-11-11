import { Fragment, useState } from "react";

import { Tab, Tabs } from "@nextui-org/tabs";

import NavActions from "@/layouts/MainLayout/Nav/NavActions";

import ExamSession from "@/components/ExamSession";
import SessionHandler from "@/components/ExamSession/SessionHandler";

import { ExamSessionContext } from "@/context/ExamSessionContext";
import { ExamSessionTaskProvider } from "@/context/ExamSessionTaskContext";
import { useCtx } from "@/hooks/useCtx";

const ExamSessionPage = () => {
  const { exam } = useCtx(ExamSessionContext);
  const { tasks } = exam;

  const [currentTask, setCurrentTask] = useState(tasks[0]);

  const handleSelectTask = (taskId: string) => {
    const selectedTask = tasks.find((task) => task.id === taskId);
    if (!selectedTask) return;

    setCurrentTask(selectedTask);
  };

  return (
    <Fragment>
      <div className="relative h-dvh">
        <div className="bg-dots absolute inset-0 z-[-1] brightness-75" />

        <div className="z-10 grid grid-rows-[auto_1fr]">
          <header className="px-8 py-6 lg:hidden">
            <nav className="flex items-center justify-between gap-6 lg:*:!pointer-events-none">
              <Tabs
                size="lg"
                color="primary"
                variant="light"
                selectedKey={currentTask.id}
                onSelectionChange={(e) => handleSelectTask(e.toString())}
                // @ts-expect-error Custom style property
                style={{ "--tasks": tasks.length }}
                classNames={{
                  tab: "min-w-[10dvw]",
                  tabList: "max-w-[calc(10dvw*var(--tasks))] max-w-[60dvw]",
                  tabContent: "text-foreground font-medium group-data[selected=true]:text-primary-foreground",
                }}
              >
                {tasks.map((task) => (
                  <Tab key={task.id} title={task.title} />
                ))}
              </Tabs>
              {/* TODO: Timer UI */}

              <NavActions />
            </nav>
          </header>

          <div className="lg:hidden lg:*:!pointer-events-none">
            <ExamSessionTaskProvider task={currentTask}>
              <ExamSession />
            </ExamSessionTaskProvider>
          </div>

          <div className="absolute inset-0 hidden place-items-center p-5 pt-0 lg:grid">
            <h1 className="text-center font-sans text-lg font-semibold">
              For the best experience, please use the Desktop version. Sorry for the inconvenience.
            </h1>
          </div>
        </div>
      </div>

      <SessionHandler />
    </Fragment>
  );
};

export default ExamSessionPage;
