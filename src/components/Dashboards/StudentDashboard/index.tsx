import { DashboardWindow } from "@/components/ui/DashboardWindow";

// TODO: Implement
const StudentDashboard = () => {
  return (
    <div className="grid h-full grid-cols-3 grid-rows-[auto_1fr_1fr_1fr] gap-6">
      <DashboardWindow className="col-span-2 row-span-1">
        <p>Announcements board</p>
      </DashboardWindow>

      <DashboardWindow className="col-span-1 col-start-3 row-span-4">
        <p>Courses board</p>
      </DashboardWindow>

      <DashboardWindow className="col-span-2 row-span-3">
        <p>Overall stats</p>
      </DashboardWindow>
    </div>
  );
};

export default StudentDashboard;
