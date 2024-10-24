import { useMemo } from "react";

import { getAcademicYear, getSemesterType } from "@/utils";

const academicYear = getAcademicYear();
const semester = getSemesterType();

export const useExamNamePlaceholder = (name: string) => {
  const placeholder = useMemo(() => `Ex. ${name} | ${semester} Semester ${academicYear}`, [name]);

  return placeholder;
};
