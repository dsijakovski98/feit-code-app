import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import Nav from "@/layouts/MainLayout/Nav";
import Sidebar from "@/layouts/MainLayout/Sidebar";
import PageFallback from "@/layouts/PageFallback";

import OngoingExamAlert from "@/components/Exams/OngoingExamAlert";

import "@/styles/main-layout.css";

const MainLayout = () => {
  return (
    <div className="main-layout">
      <div className="z-20 [grid-area:sidebar]">
        <Sidebar />
      </div>

      <div className="sticky top-0 z-10 [grid-area:nav]">
        <Nav />
      </div>

      <main className="empty:bg-main z-0 grid grid-cols-1 grid-rows-1 [grid-area:main] lg:block lg:h-[calc(100dvh-65px-65px)]">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
          <OngoingExamAlert />
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
