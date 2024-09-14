import { InferInput, intersect } from "valibot";

import { ProfessorOnboardingSchema } from "@/utils/formSchemas/onboarding/professorOnboarding";

export const ProfessorProfileSchema = intersect([ProfessorOnboardingSchema]);

export type ProfessorProfileSchema = InferInput<typeof ProfessorProfileSchema>;
