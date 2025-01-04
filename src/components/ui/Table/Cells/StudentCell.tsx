import clsx from "clsx";
import { InferSelectModel } from "drizzle-orm";

import { User } from "@nextui-org/user";

import { students } from "@/db/schema";

import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";

type Props = {
  student: Pick<InferSelectModel<typeof students>, "firstName" | "lastName" | "email">;
  avatar: { url?: string | null; isLoading?: boolean };
};

const StudentCell = ({ student, avatar }: Props) => {
  const { isMobile, isMobileSm } = useCtx(ResponsiveContext);

  const { firstName, lastName, email } = student;

  return (
    <User
      name={`${firstName} ${lastName}`}
      description={email}
      avatarProps={{
        size: isMobile ? "md" : "lg",
        src: avatar.url ?? "",
        showFallback: avatar.isLoading,
        className: clsx({
          "scale-[1.2]": isMobile,
          hidden: isMobileSm,
        }),
      }}
      classNames={{
        base: clsx({
          "gap-3": isMobile,
        }),
        name: clsx("text-base font-semibold", {
          "text-sm": isMobile,
        }),
        description: clsx("text-sm", {
          "text-xs sm:hidden": isMobile,
        }),
      }}
    />
  );
};

export default StudentCell;
