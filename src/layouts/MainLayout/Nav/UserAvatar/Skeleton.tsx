import { Avatar } from "@nextui-org/react";

const UserAvatarSkeleton = () => {
  return (
    <Avatar
      isBordered
      className="animate-pulse ring-foreground"
      classNames={{ icon: "scale-80" }}
    />
  );
};

export default UserAvatarSkeleton;
