import { InferInput, intersect } from "valibot";

import {
  StudentOnboardingBasicInfoSchema,
  StudentOnboardingMajorSchema,
} from "@/utils/schemas/onboarding/studentOnboarding";

export const StudentProfileSchema = intersect([
  StudentOnboardingBasicInfoSchema,
  StudentOnboardingMajorSchema,
]);

export type StudentProfileSchema = InferInput<typeof StudentProfileSchema>;
