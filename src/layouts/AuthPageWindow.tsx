import { ComponentProps, PropsWithChildren } from "react";

import AuthSidebar from "@/components/AuthForms/AuthSidebar";
import Window from "@/components/ui/Window";

type Props = {
  title: string;
  heading: string;
  href: ComponentProps<typeof AuthSidebar>["activeLink"];
} & PropsWithChildren;

const AuthPageWindow = ({ title, href, heading, children }: Props) => {
  return (
    <main className="relative min-h-[100dvh] bg-dots bg-fixed pt-10">
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center gap-2 text-2xl">
          <p>FEIT</p>
          <div className="flex w-fit max-w-20">
            <img src="/images/logo.svg" />
          </div>
          <p>Code</p>
        </div>

        <h1 className="text-5xl font-semibold">{heading}</h1>
      </div>

      <div className="mt-14 flex justify-center">
        <Window title={title} className="min-w-[900px] lg:w-[90%] lg:min-w-min">
          <div className="flex h-40 items-stretch gap-5">
            <AuthSidebar activeLink={href} />

            <div className="grow py-4 md:px-4">{children}</div>
          </div>
        </Window>
      </div>
    </main>
  );
};

export default AuthPageWindow;
