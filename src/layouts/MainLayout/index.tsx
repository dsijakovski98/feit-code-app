import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Nav from "@/layouts/MainLayout/Nav";
import Sidebar from "@/layouts/MainLayout/Sidebar";
import PageFallback from "@/layouts/PageFallback";

import "@/styles/main-layout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="[grid-area:sidebar]">
        <Sidebar />
      </div>

      <div className="sticky top-0 [grid-area:nav]">
        <Nav />
      </div>

      <main className="grid grid-cols-1 grid-rows-1 [grid-area:main] lg:block lg:h-[calc(100dvh-70px-66px)] lg:overflow-y-scroll">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
