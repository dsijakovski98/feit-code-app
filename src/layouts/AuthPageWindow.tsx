import { PropsWithChildren, ReactNode } from "react";

import Window from "@/components/ui/Window";

type Props = {
  title: string;
  heading: ReactNode;
} & PropsWithChildren;

const AuthPageWindow = ({ title, heading, children }: Props) => {
  return (
    <main className="relative min-h-[100dvh] bg-dots bg-fixed pt-10">
      <div className="text-center flex flex-col items-center">
        <div className="flex items-center text-2xl gap-2">
          <p>FEIT</p>
          <div className="flex w-fit max-w-20">
            <img src="/images/logo.svg" />
          </div>
          <p>Code</p>
        </div>

        {heading}
      </div>

      <div className="flex justify-center mt-10">
        <Window title={title} className="min-w-[900px] lg:w-[95%] lg:min-w-min">
          {children}
        </Window>
      </div>
    </main>
  );
};

export default AuthPageWindow;
