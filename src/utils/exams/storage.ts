import { deleteObject, listAll, ref } from "firebase/storage";

import { fireStorage } from "@/services/firebase";

export const deleteExamFolder = async (fullPath: string) => {
  const examStorageRef = ref(fireStorage, fullPath);

  const examEntries = await listAll(examStorageRef);

  const taskEntries = await Promise.all(
    examEntries.prefixes.flatMap((examPrefix) => {
      const examRef = ref(fireStorage, examPrefix.fullPath);

      return listAll(examRef);
    }),
  );

  await Promise.all(
    taskEntries.flatMap((taskEntry) => {
      return taskEntry.items.map((item) => {
        const itemRef = ref(fireStorage, item.fullPath);
        return deleteObject(itemRef);
      });
    }),
  );
};
