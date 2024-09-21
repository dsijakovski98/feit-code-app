import { ElementRef, useLayoutEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";

import clsx from "clsx";

import Button from "@/components/ui/Button";

import { PAGE_TITLES, ROUTES } from "@/constants/routes";
import { Toggle } from "@/hooks/useToggle";

type Props = {
  show: Toggle;
  minimized: Toggle;
};

const WindowBlank = ({ show, minimized }: Props) => {
  const { pathname } = useLocation();

  const actionBtn = useRef<ElementRef<"button">>(null);

  const shouldShow = useMemo(() => !show.open || minimized.open, [show.open, minimized.open]);
  const actionBtnLabel = useMemo(() => {
    if (pathname === ROUTES.signIn || pathname === ROUTES.signUp) return PAGE_TITLES[pathname];

    if (pathname === ROUTES.forgotPassword) return "Reset password";

    return "Go back";
  }, [pathname]);

  const bringBack = () => {
    show.toggleOn();
    minimized.toggleOff();
  };

  useLayoutEffect(() => {
    if (!actionBtn.current) return;

    if (!shouldShow) return;

    actionBtn.current.focus();
  }, [shouldShow]);

  return (
    shouldShow && (
      <section
        className={clsx(
          "absolute inset-5 grid animate-appearance-in place-items-center [animation-delay:300ms]",
        )}
      >
        <div className="text-center">
          <h2 className="mb-2 text-4xl font-medium">
            {!show.open ? "Welp...That was fun I guess" : "Wow, you made it disappear!"}
          </h2>
          <p className="mb-8 font-sans text-lg">Let's get you back on track</p>

          <Button ref={actionBtn} size="lg" color="default" variant="flat" onPress={bringBack}>
            {actionBtnLabel}
          </Button>
        </div>
      </section>
    )
  );
};

export default WindowBlank;
