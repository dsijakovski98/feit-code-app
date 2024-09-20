import { Spinner } from "@nextui-org/react";

const PageFallback = () => {
  return (
    <div className="grid h-dvh place-items-center">
      <Spinner size="lg" className="scale-[2]" />
    </div>
  );
};

export default PageFallback;
