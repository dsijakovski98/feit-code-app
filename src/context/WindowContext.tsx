import { PropsWithChildren, createContext } from "react";

type WindowContext = {
  fullScreen: boolean;
};

export const WindowContext = createContext<WindowContext | null>(null);
WindowContext.displayName = "WindowContext";

type Props = WindowContext & PropsWithChildren;

export const WindowProvider = ({ fullScreen, children }: Props) => {
  return <WindowContext.Provider value={{ fullScreen }}>{children}</WindowContext.Provider>;
};
