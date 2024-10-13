import { useMemo } from "react";

import { LANUGAGES_SUPPORTED_TESTS } from "@/constants/code/languageTests";
import { ProgrammingLanguage } from "@/constants/enums";

export const useTestsSupported = (language: ProgrammingLanguage) => {
  return useMemo(() => LANUGAGES_SUPPORTED_TESTS.includes(language), [language]);
};
