export const MAJOR_TYPE = {
  KTI: "KTI",
  KSIAR: "KSIAR",
  KHIE: "KHIE",
  TKII: "TKII",
} as const;

export const MAJORS = [
  { label: MAJOR_TYPE.KTI, description: "Computer Technologies and Engineering" },
  { label: MAJOR_TYPE.KSIAR, description: "Computer System Engineering, Automation and Robotics" },
  { label: MAJOR_TYPE.KHIE, description: "Computer Hardware Engineering and Electronics" },
  { label: MAJOR_TYPE.TKII, description: "Telecommunication and Information Engineering" },
];

export const STUDENT_COLUMNS_LG = [
  { key: "student", label: "Student" },
  { key: "index", label: "Index no." },
  { key: "major", label: "Major" },
  { key: "joined", label: "Joined on" },
  { key: "actions", label: "Actions" },
] as const;

export const STUDENT_COLUMNS_SM = [
  { key: "student", label: "Student" },
  { key: "info", label: "Info" },
  { key: "actions", label: "Actions" },
] as const;
