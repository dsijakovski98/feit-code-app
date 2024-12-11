import toast from "react-hot-toast";

import { useMutation } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";

import { leaveExamSessionLogout } from "@/actions/exam-session";
import { ROUTES } from "@/constants/routes";
import { useFCUser } from "@/hooks/useFCUser";
import { USER_TYPE } from "@/types";

export const useLogout = () => {
  const { userData } = useFCUser();
  const { signOut } = useAuth();

  const { mutate } = useMutation({
    mutationFn: async () => {
      if (!userData) return;

      if (userData.type === USER_TYPE.student) {
        await leaveExamSessionLogout({ studentId: userData.user.id });
      }

      signOut({ redirectUrl: ROUTES.signIn });
    },
    onError: (error) => toast.error(error.message),
  });

  return { logOut: mutate };
};
