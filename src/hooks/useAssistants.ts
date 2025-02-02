import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";
import { TEACHER_TYPE } from "@/types";

export const useAssistants = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [{ name: "assistants" }],
    queryFn: async () => {
      try {
        const assistants = await db.query.professors.findMany({
          where: (professors, { eq }) => eq(professors.type, TEACHER_TYPE.assistant),
          columns: {
            id: true,
            email: true,
            lastName: true,
            firstName: true,
            avatarUrl: true,
          },
        });

        return assistants;
      } catch (e) {
        // Sentry logging
        console.log({ e });

        throw new Error("Error while fetching Teaching Assistants!");
      }
    },
  });

  return { assistants: data, isLoading, error };
};
