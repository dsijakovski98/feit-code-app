import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Nav from "@/layouts/MainLayout/Nav";
import Sidebar from "@/layouts/MainLayout/Sidebar";
import PageFallback from "@/layouts/PageFallback";

const MainLayout = () => {
  return (
    <div className="grid min-h-dvh grid-cols-[auto_1fr] grid-rows-[auto_1fr] lg:block">
      <div className="row-span-3 lg:row-span-1">
        <Sidebar />
      </div>

      <div className="col-start-2 row-span-1 row-start-1">
        <Nav />
      </div>

      <main className="col-start-2 row-start-2 h-[calc(100dvh-90px)] overflow-y-auto overflow-x-clip">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
