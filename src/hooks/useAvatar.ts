import { useQuery } from "@tanstack/react-query";

import { getAvatarUrl } from "@/services/avatars";

export const useAvatar = (userId?: string) => {
  const { data, isLoading } = useQuery({
    queryKey: [{ name: "avatar", userId }],
    queryFn: async () => {
      if (!userId) return null;

      const avatarUrl = await getAvatarUrl(userId);

      return avatarUrl;
    },
  });

  return [data, isLoading] as const;
};
