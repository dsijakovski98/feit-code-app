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
    <main className="relative min-h-[100dvh] bg-dots-light bg-fixed pt-10 dark:!bg-dots-dark lg:pt-5">
      <h1 className="text-center text-5xl font-semibold lg:text-3xl">{heading}</h1>

      <div className="mt-24 flex justify-center lg:mt-12">
        <Window title={title} className="w-[870px] lg:w-[90%] lg:min-w-[350px]">
          <div className="grid h-full grid-cols-[1.15fr_3fr] lg:grid-cols-[1.5fr_3fr] md:block">
            <AuthSidebar activeLink={href} />

            <div className="bg-gradient-to-r from-background/90 to-primary-50/20 p-6 lg:p-4">{children}</div>
          </div>
        </Window>
      </div>
    </main>
  );
};

export default AuthPageWindow;
