import { Fragment, PropsWithChildren, useEffect } from "react";

import clsx from "clsx";
import { ClassValue } from "clsx";

import WindowBlank from "@/components/ui/Window/WindowBlank";
import WindowControls from "@/components/ui/Window/WindowControls";

import logo from "@/images/logo.svg?w=32&h=32&img";

import { WindowProvider } from "@/context/WindowContext";
import { useDrag } from "@/hooks/useDrag";
import { useToggle } from "@/hooks/useToggle";

type Props = {
  title: string;
  className?: ClassValue;
} & PropsWithChildren;

const FULL_SCREEN_KEY = "fc-auth-fullscreen";

const Window = ({ title, className = "", children }: Props) => {
  const { trigger, windowEl } = useDrag();

  const show = useToggle(true);
  const minimized = useToggle();

  const fullScreen = useToggle(!!localStorage.getItem(FULL_SCREEN_KEY));

  useEffect(() => {
    if (fullScreen.open) {
      localStorage.setItem(FULL_SCREEN_KEY, "1");
    } else {
      localStorage.removeItem(FULL_SCREEN_KEY);
    }
  }, [fullScreen.open]);

  return (
    <Fragment>
      <section
        ref={windowEl}
        className={clsx(
          "group absolute overflow-hidden rounded-xl border border-content2 bg-content1 font-sans opacity-100 shadow-lg transition-all duration-300 data-[moving]:opacity-50 data-[moving]:shadow-transparent dark:border-content1 dark:shadow-xl dark:shadow-background dark:data-[moving]:opacity-80 lg:static",
          {
            "translate-y-4 !opacity-0": !show.open,
            "translate-y-0 opacity-100": show.open,
            "scale-0 !opacity-0": minimized.open,
            "!absolute !inset-0 !w-full !rounded-none": fullScreen.open,
          },
          className,
        )}
      >
        <nav className="flex items-center justify-between border-b border-b-content2 bg-gradient-to-r from-background from-20% to-primary-50/20 px-3 py-2 md:px-4 md:py-3">
          <div
            ref={trigger}
            className="flex grow cursor-grab items-center gap-2 group-data-[moving]:cursor-grabbing lg:cursor-default"
          >
            <img draggable={false} src={logo} alt="FEIT Code logo" className="w-8 scale-[1.4]" />

            <p className="text-lg font-semibold leading-none group-data-[moving]:select-none">{title}</p>
          </div>

          <WindowControls show={show} minimized={minimized} fullScreen={fullScreen} />
        </nav>

        <div className="h-full">
          <WindowProvider fullScreen={fullScreen.open}>{children}</WindowProvider>
        </div>
      </section>

      <WindowBlank show={show} minimized={minimized} />
    </Fragment>
  );
};

export default Window;
