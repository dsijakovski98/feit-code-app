import { Fragment, PropsWithChildren, createContext } from "react";

import clsx from "clsx";
import { ClassValue } from "clsx";

import WindowBlank from "@/components/ui/Window/WindowBlank";
import WindowControls from "@/components/ui/Window/WindowControls";

import { useDrag } from "@/hooks/useDrag";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  title: string;
  className?: ClassValue;
} & PropsWithChildren;

const WindowContext = createContext<{ fullScreen: boolean } | null>(null);

const Window = ({ title, className = "", children }: Props) => {
  const { trigger, windowEl } = useDrag();

  const show = useToggle(true);
  const minimized = useToggle();

  const fullScreen = useToggle();

  return (
    <Fragment>
      <section
        ref={windowEl}
        className={clsx(
          "opacity-100 absolute rounded-xl lg:static overflow-hidden bg-content1 transition-all duration-300 data-[moving]:opacity-80 shadow-lg group",
          {
            "!opacity-0 translate-y-4": !show.open,
            "opacity-100 translate-y-0": show.open,
            "!opacity-0 scale-0": minimized.open,
            "!inset-0": fullScreen.open,
          },
          className,
        )}
      >
        <nav className="flex items-center p-3 py-2 justify-between bg-content2">
          <div
            ref={trigger}
            className="grow cursor-grab group-data-[moving]:cursor-grabbing lg:cursor-default"
          >
            <p className="font-semibold text-lg group-data-[moving]:select-none">{title}</p>
          </div>

          <WindowControls show={show} minimized={minimized} fullScreen={fullScreen} />
        </nav>

        <div className="px-3 py-4">
          <WindowContext.Provider value={{ fullScreen: fullScreen.open }}>
            {children}
          </WindowContext.Provider>
        </div>
      </section>

      <WindowBlank show={show} minimized={minimized} />
    </Fragment>
  );
};

export default Window;
