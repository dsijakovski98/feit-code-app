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

export const getDaytime = () => {
  const [day, ...date] = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  })
    .format(Date.now())
    .split(" ");

  return `${day}, ${date.join(" ")}`;
};

export const getTimeGreeting = () => {
  const currentHour = new Date().getHours();

  if (currentHour >= 6 && currentHour < 12) {
    return "Good morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon";
  } else if (currentHour >= 18 && currentHour < 22) {
    return "Good evening";
  }

  return "Almost bedtime";
};
