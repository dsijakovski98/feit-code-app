import { useEffect } from "react";

import { onValue, ref } from "firebase/database";

import { fireDb } from "@/services/firebase";

export const useDatabaseListen = <T>(refPath: string, onData: (data: T) => void) => {
  useEffect(() => {
    const unsubscribe = onValue(ref(fireDb, refPath), (snapshot) => {
      const data = snapshot.val() as T;

      onData(data);
    });

    return () => {
      unsubscribe();
    };
  }, [refPath, onData]);
};
