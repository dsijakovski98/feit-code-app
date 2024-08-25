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

export const WindowContext = createContext<{ fullScreen: boolean } | null>(null);

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
          "group absolute overflow-hidden rounded-xl bg-content1 opacity-100 shadow-2xl transition-all duration-300 data-[moving]:opacity-80 data-[moving]:shadow-transparent lg:static",
          {
            "translate-y-4 !opacity-0": !show.open,
            "translate-y-0 opacity-100": show.open,
            "scale-0 !opacity-0": minimized.open,
            "!absolute !inset-0 !w-full !rounded-none": fullScreen.open,
          },
          className,
        )}
      >
        <nav className="flex items-center justify-between bg-gradient-to-t from-primary-50/80 from-20% to-primary-100/80 px-3 py-2 md:px-4 md:py-3">
          <div
            ref={trigger}
            className="grow cursor-grab group-data-[moving]:cursor-grabbing lg:cursor-default"
          >
            <p className="text-lg font-semibold group-data-[moving]:select-none">{title}</p>
          </div>

          <WindowControls show={show} minimized={minimized} fullScreen={fullScreen} />
        </nav>

        <div className="h-full">
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
