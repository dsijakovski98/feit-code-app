import { useMemo } from "react";
import { Link } from "react-router-dom";

import { InferSelectModel } from "drizzle-orm";

import { User } from "@nextui-org/react";

import { professors } from "@/db/schema";

import { ROUTES } from "@/constants/routes";
import { TeacherType } from "@/types";

const userAvatarProps = {
  isBordered: true,
  className: "-ring-offset-1",
  color: "primary",
} as const;

type Props = {
  type: TeacherType;
  userFullName: string;
  teacher: InferSelectModel<typeof professors>;
  avatarUrl?: string | null;
};

const CourseTeacher = ({ userFullName, teacher, type, avatarUrl }: Props) => {
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
        src: avatarUrl ?? "",
        ...(isMe ? userAvatarProps : {}),
      }}
      className="shrink-0"
      classNames={{
        name: "font-semibold",
      }}
    />
  );
};

export default CourseTeacher;
