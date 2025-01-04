import { useQuery } from "@tanstack/react-query";

import { db } from "@/db";

export const useCourseCategories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [{ name: "categories" }],
    queryFn: async () => {
      try {
        const categories = await db.query.categories.findMany();
        return categories;
      } catch (e) {
        // Sentry logging
        console.log({ e });

        throw new Error("Error while fetching course categories!");
      }
    },
  });

  return { categories: data, isLoading, error };
};
