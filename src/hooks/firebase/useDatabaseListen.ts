import { useEffect } from "react";

import { onValue, ref } from "firebase/database";

import { fbDatabase } from "@/services/firebase";

export const useDatabaseListen = <T>(refPath: string, onData: (data: T) => void) => {
  useEffect(() => {
    const unsubscribe = onValue(ref(fbDatabase, refPath), (snapshot) => {
      const data = snapshot.val() as T;

      onData(data);
    });

    return () => {
      unsubscribe();
    };
  }, [refPath, onData]);
};
