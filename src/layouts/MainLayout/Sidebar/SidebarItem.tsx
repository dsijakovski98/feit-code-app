import { ComponentProps, ReactNode, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import { As } from "@heroui/react";
import { Skeleton } from "@heroui/skeleton";
import { ClassValue } from "clsx";
import clsx from "clsx";

type BaseProps =
  | {
      isSkeleton?: undefined;
      href: string;
      target?: ComponentProps<"a">["target"];
      label: string;
      icon: ReactNode;
      className?: ClassValue;
    }
  | {
      isSkeleton: boolean;
      href?: never;
      target?: never;
      label?: never;
      icon?: never;
      className?: never;
    };

type Props = {
  as?: As;
} & BaseProps;

const SidebarItem = ({ as: As = "li", ...props }: Props) => {
  const { pathname } = useLocation();

  const active = useMemo(() => {
    const href = props.href?.trim();

    if (href?.length === 0) return false;

    return href === pathname || pathname.endsWith(href ?? "");
  }, [props.href, pathname]);

  const Element = As;

  if (props.isSkeleton) {
    return <Skeleton as={Element} className="h-12 w-12 rounded-full lg:h-11 lg:w-11" />;
  }

  const { href, icon, label, target, className = "" } = props;

  return (
    <Element className="mx-auto min-w-fit max-w-[8ch] lg:mx-[initial] lg:w-[8ch]">
      <Link
        to={href!}
        target={target}
        className={clsx("group grid w-full place-items-center text-primary-foreground", className)}
      >
        <div className="grid place-items-center">
          <div
            className={clsx(
              "h-7 w-7 overflow-hidden rounded-full text-primary-foreground transition-colors group-hover:!text-foreground dark:group-hover:!text-primary-500 lg:h-6 lg:w-6",
              {
                "dark:!text-foreground": active,
              },
            )}
          >
            {icon}
          </div>
          <p
            className={clsx(
              "w-full border-b-2 border-transparent text-center text-sm font-semibold text-primary-foreground transition-colors group-hover:text-foreground dark:group-hover:text-primary-500",
              {
                "!border-b-2 !border-primary-foreground group-hover:!border-foreground dark:group-hover:!border-primary-500":
                  active,
              },
            )}
          >
            {label}
          </p>
        </div>
      </Link>
    </Element>
  );
};

export default SidebarItem;
