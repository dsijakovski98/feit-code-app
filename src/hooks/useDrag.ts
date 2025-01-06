import { ComponentRef, useCallback, useLayoutEffect, useRef } from "react";

export const useDrag = () => {
  const trigger = useRef<ComponentRef<"div">>(null);
  const windowEl = useRef<ComponentRef<"section">>(null);

  const prevTouch = useRef<{ x: number; y: number } | null>(null);

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!windowEl.current) return;

    const isMoving = !!windowEl.current.getAttribute("data-moving");

    if (!isMoving) return;

    let shiftX = 0;
    let shiftY = 0;

    if (e instanceof MouseEvent) {
      shiftX = e.movementX;
      shiftY = e.movementY;
    } else {
      const { pageX: x, pageY: y } = e.touches[0];
      shiftX = prevTouch.current ? x - prevTouch.current.x : 0;
      shiftY = prevTouch.current ? y - prevTouch.current.y : 0;

      prevTouch.current = { x, y };
    }

    const { x, y, width, height } = windowEl.current.getBoundingClientRect();

    const newX = x + shiftX;
    const newY = y + shiftY;

    const xOutOfBounds = newX + width >= window.innerWidth || newX <= 0;
    const yOutOfBounds = newY + height >= window.innerHeight || newY <= 0;

    if (xOutOfBounds || yOutOfBounds) {
      return;
    }

    windowEl.current.style.left = `${newX}px`;
    windowEl.current.style.top = ` ${newY}px`;
  };

  const startMoving = useCallback((e: MouseEvent | TouchEvent) => {
    if (!windowEl.current) return;

    const mobileSize = 1023;
    if (window.innerWidth <= mobileSize) return;

    windowEl.current.setAttribute("data-moving", "true");
    windowEl.current.style.transitionProperty = "none";

    handleMove(e);
  }, []);

  const stopMoving = () => {
    if (!windowEl.current) return;

    windowEl.current?.removeAttribute("data-moving");
    windowEl.current.style.transitionProperty = "initial";
    prevTouch.current = null;
  };

  useLayoutEffect(() => {
    const wdw = windowEl.current;
    const trig = trigger.current;

    if (!wdw) return;
    if (!trig) return;

    trig.addEventListener("mousedown", startMoving);
    trig.addEventListener("touchstart", startMoving);

    document.addEventListener("mouseup", stopMoving);
    document.addEventListener("touchend", stopMoving);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);

    return () => {
      trig.removeEventListener("mousedown", startMoving);
      trig.removeEventListener("touchstart", startMoving);

      document.removeEventListener("mouseup", stopMoving);
      document.removeEventListener("touchend", stopMoving);

      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
    };
  }, [startMoving]);

  return { trigger, windowEl };
};
