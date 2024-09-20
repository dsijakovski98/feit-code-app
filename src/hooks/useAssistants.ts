import { useQuery } from "@tanstack/react-query";
import { InferSelectModel } from "drizzle-orm";

import { professors } from "@/db/schema";

import { getAvatar } from "@/services/avatars";

import { db } from "@/db";
import { QueryColumns, TEACHER_TYPE } from "@/types";

export const useAssistants = (columns?: QueryColumns<InferSelectModel<typeof professors>>) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [{ name: "assistants" }],
    queryFn: async () => {
      try {
        const assistants = await db.query.professors.findMany({
          where: (professors, { eq }) => eq(professors.type, TEACHER_TYPE.assistant),
          columns,
        });

        const assistantsWithAvatars = await Promise.all(
          assistants.map((assistant) =>
            getAvatar(assistant.id).then((avatarUrl) => ({ ...assistant, avatarUrl })),
          ),
        );

        return assistantsWithAvatars;
      } catch (e) {
        // TODO: Sentry logging
        console.log({ e });

        throw new Error("Error while fetching Teaching Assistants!");
      }
    },
  });

  return { assistants: data, isLoading, error };
};
