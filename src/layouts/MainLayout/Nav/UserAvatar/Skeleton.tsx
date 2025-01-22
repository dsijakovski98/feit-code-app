import { Avatar } from "@heroui/avatar";

const UserAvatarSkeleton = () => {
  return <Avatar isBordered className="animate-pulse ring-foreground" classNames={{ icon: "scale-80" }} />;
};

export default UserAvatarSkeleton;
