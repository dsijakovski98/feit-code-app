import { useMemo } from "react";
import { Link } from "react-router-dom";

import { InferSelectModel } from "drizzle-orm";

import { User } from "@nextui-org/user";

import { professors } from "@/db/schema";

import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";

const userAvatarProps = {
  isBordered: true,
  className: "-ring-offset-1",
  color: "primary",
} as const;

type Props = {
  type: string;
  teacher: InferSelectModel<typeof professors>;
};

const Teacher = ({ teacher, type }: Props) => {
  const { userData } = useFCUser();
  const userFullName = useMemo(
    () => `${userData?.user.firstName} ${userData?.user.lastName}`,
    [userData?.user.firstName, userData?.user.lastName],
  );

  const teacherFullName = useMemo(
    () => `${teacher.firstName} ${teacher.lastName}`,
    [teacher.firstName, teacher.lastName],
  );

  const isMe = userFullName === teacherFullName;

  return (
    <User
      as={Link}
      to={isMe ? ROUTES.profile : `mailto:${teacher.email}`}
      name={isMe ? "You" : teacherFullName}
      description={<p className="text-sm">{type}</p>}
      avatarProps={{
        size: "lg",
        showFallback: true,
        src: teacher.avatarUrl ?? "",
        ...(isMe ? userAvatarProps : {}),
      }}
      className="shrink-0"
      classNames={{
        name: "font-semibold text-base",
      }}
    />
  );
};

export default Teacher;
