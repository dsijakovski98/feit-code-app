import Split from "react-split";

import LeaveSession from "@/components/ExamSession/LeaveSession";

import { useFCUser } from "@/hooks/useFCUser";

const ExamSession = () => {
  const { userData } = useFCUser();

  if (!userData) return null;

  // TODO: Implement UI
  return (
    <main className="*:h-full">
      <Split
        sizes={[65, 35]}
        minSize={[800, 400]}
        maxSize={[Infinity, 800]}
        snapOffset={5}
        gutterSize={8}
        dragInterval={1}
        gutterAlign="center"
        direction="horizontal"
        cursor="col-resize"
        className="flex [&>.gutter]:rounded"
      >
        <div className="px-8">Code IDE here</div>

        <div className="*:h-full">
          <Split
            sizes={[50, 50]}
            snapOffset={5}
            gutterSize={8}
            dragInterval={1}
            gutterAlign="center"
            direction="vertical"
            cursor="row-resize"
          >
            <div className="px-8">
              <LeaveSession studentId={userData.user.id} />
            </div>

            <div className="p-8">Console here</div>
          </Split>
        </div>
      </Split>
    </main>
  );
};

export default ExamSession;
