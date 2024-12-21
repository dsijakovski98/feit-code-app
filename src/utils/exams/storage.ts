import { deleteObject, listAll, ref } from "firebase/storage";

import { fbStorage } from "@/services/firebase";

export const deleteExamFolder = async (fullPath: string) => {
  const examStorageRef = ref(fbStorage, fullPath);

  const examEntries = await listAll(examStorageRef);

  const taskEntries = await Promise.all(
    examEntries.prefixes.flatMap((examPrefix) => {
      const examRef = ref(fbStorage, examPrefix.fullPath);

      return listAll(examRef);
    }),
  );

  await Promise.all(
    taskEntries.flatMap((taskEntry) => {
      return taskEntry.items.map((item) => {
        const itemRef = ref(fbStorage, item.fullPath);
        return deleteObject(itemRef);
      });
    }),
  );
};
