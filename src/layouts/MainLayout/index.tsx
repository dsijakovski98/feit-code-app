import { Outlet } from "react-router-dom";

import Nav from "@/layouts/MainLayout/Nav";
import Sidebar from "@/layouts/MainLayout/Sidebar";

const MainLayout = () => {
  return (
    <div className="grid min-h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr]">
      <div className="row-span-3">
        <Sidebar />
      </div>

      <div className="col-start-2 row-span-1 row-start-1">
        <Nav />
      </div>

      <main className="col-start-2 row-start-2 h-full">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
