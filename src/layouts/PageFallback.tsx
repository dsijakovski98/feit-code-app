import { Outlet } from "react-router-dom";

import clsx from "clsx";

import { Spinner } from "@nextui-org/spinner";

type Props = {
  bg?: "main" | "dots";
  outlet?: boolean;
};

const PageFallback = ({ bg = "main", outlet = false }: Props) => {
  return (
    <div
      className={clsx("grid h-dvh place-items-center", {
        "bg-main": bg === "main",
        "bg-dots brightness-75": bg === "dots",
      })}
    >
      <Spinner size="lg" className="scale-[2]" />

      {outlet && <Outlet />}
    </div>
  );
};

export default PageFallback;
