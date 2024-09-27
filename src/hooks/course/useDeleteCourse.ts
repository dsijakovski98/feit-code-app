import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCourse } from "@/actions/courses";
import { ROUTES } from "@/constants/routes";
import { USER_TYPE } from "@/types";

type CourseOptions = {
  name: string;
  professorId: string;
};

export const useDeleteCourse = ({ name, professorId }: CourseOptions) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: async (success) => {
      if (!success) return;

      await queryClient.invalidateQueries({
        queryKey: [{ name: "courses", type: USER_TYPE.professor, id: professorId }],
      });

      toast(`${name} course deleted!`);
      navigate(ROUTES.courses);
    },
    onError: (error) => toast.error(error.message),
  });
};
