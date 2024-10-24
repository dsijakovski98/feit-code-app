import { InferInput, intersect } from "valibot";

import { ProfessorOnboardingSchema } from "@/utils/schemas/onboarding/professorOnboarding";

export const ProfessorProfileSchema = intersect([ProfessorOnboardingSchema]);

export type ProfessorProfileSchema = InferInput<typeof ProfessorProfileSchema>;
