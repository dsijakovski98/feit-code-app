import { useQuery } from "@tanstack/react-query";

export const useTaskTemplate = (templateUrl?: string) => {
  return useQuery({
    enabled: !!templateUrl,

    queryKey: [{ name: "task-template", templateUrl }],
    queryFn: async () => {
      if (!templateUrl) return "";

      const response = await fetch(templateUrl);
      const template = await response.text();

      return template;
    },
  });
};
