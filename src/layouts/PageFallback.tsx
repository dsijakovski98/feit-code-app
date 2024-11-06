import clsx from "clsx";

import { Spinner } from "@nextui-org/react";

type Props = {
  bg?: "main" | "dots";
};

const PageFallback = ({ bg = "main" }: Props) => {
  return (
    <div
      className={clsx("grid h-dvh place-items-center", {
        "bg-main": bg === "main",
        "bg-dots": bg === "dots",
      })}
    >
      <Spinner size="lg" className="scale-[2]" />
    </div>
  );
};

export default PageFallback;
