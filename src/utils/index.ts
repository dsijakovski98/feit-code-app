export const shortClerkErrorMessage = (
  e: { errors: Array<{ message: string; longMessage?: string }> },
  config?: { useLongMessage?: boolean },
) => {
  const message = config?.useLongMessage
    ? e.errors[0].longMessage || e.errors[0].message
    : e.errors[0].message;

  // Return only the first sentence
  return message.split(".")[0].trim() + "!";
};

const ONBOARDING_KEY = "fc-onboarding";
export const getOnboardingKey = (userId: string) => {
  return `${ONBOARDING_KEY}_${userId}`;
};
