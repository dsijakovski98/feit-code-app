import { useQuery } from "@tanstack/react-query";

import { useAuth } from "@clerk/clerk-react";

import { RunCodeOptions } from "@/actions/exam-session";

type Options = { enabled: boolean } & Omit<RunCodeOptions, "token">;

export const useCleanSubmission = ({ code, language, name: taskName, enabled }: Options) => {
  const { getToken } = useAuth();

  return useQuery({
    enabled,
    queryKey: [{ name: "clean-submission", taskName, code, language }],
    queryFn: async () => {
      const token = await getToken();

      if (!token) {
        throw new Error("Token not found!");
      }

      const response = await fetch(`${import.meta.env.VITE_CODE_RUNNER_URL}/cleanup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ taskName, code, language }),
      });

      if (!response.ok) {
        const { error } = (await response.json()) as { error: string };
        throw new Error(error);
      }

      const { cleanCode } = (await response.json()) as { cleanCode: string };

      return cleanCode;
    },
  });
};
