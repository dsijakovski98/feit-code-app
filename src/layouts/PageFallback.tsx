import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

import { Spinner } from "@heroui/spinner";
import clsx from "clsx";

import PageMeta from "@/layouts/PageMeta";

type Props = {
  bg?: "main" | "dots";
  outlet?: boolean;
};

const PageFallback = ({ bg = "main", outlet = false }: Props) => {
  return (
    <Fragment>
      <PageMeta title="FEIT Code Loading..." />

      <div
        className={clsx("grid h-dvh place-items-center", {
          "bg-main": bg === "main",
          "bg-dots brightness-75": bg === "dots",
        })}
      >
        <Spinner size="lg" className="scale-[2.2]" />

        {outlet && <Outlet />}
      </div>
    </Fragment>
  );
};

export default PageFallback;
