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
