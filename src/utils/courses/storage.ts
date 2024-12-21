import { listAll, ref } from "firebase/storage";

import { fbStorage } from "@/services/firebase";

import { deleteExamFolder } from "@/utils/exams/storage";

export const deleteCourseFolder = async (fullPath: string) => {
  const courseStorageRef = ref(fbStorage, fullPath);

  const examFolders = await listAll(courseStorageRef);

  await Promise.all(
    examFolders.prefixes.map((examPrefix) => {
      return deleteExamFolder(examPrefix.fullPath);
    }),
  );
};
