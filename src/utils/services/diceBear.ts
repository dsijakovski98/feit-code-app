const studentIconStyles = [
  "glass",
  "personas",
  "pixel-art",
  "pixel-art-neutral",
  "big-ears-neutral",
  "adventurer-neutral",
  "avataaars",
  "avataaars-neutral",
  "adventurer",
  "adventurer-neutral",
  "thumbs",
  "shapes",
  "rings",
  "miniavs",
  "notionists",
  "notionists-neutral",
  "lorelei",
  "lorelei-neutral",
  "micah",
  "icons",
  "identicon",
  "fun-emoji",
  "bottts",
  "bottts-neutral",
  "big-smile",
];

const DICE_BEAR_URL = "https://api.dicebear.com/9.x";

const getRandomAvatar = () => {
  const style = studentIconStyles[Math.floor(Math.random() * studentIconStyles.length)];
  return `${DICE_BEAR_URL}/${style}/svg`;
};

const getInitialsAvatar = (fullName: string) => {
  return `${DICE_BEAR_URL}/initials/svg?seed=${fullName}`;
};

const RANDOM_SEED = 120;
const getRandomSeed = () => Math.floor(Math.random() * RANDOM_SEED);

export const diceBear = {
  getRandomAvatar,
  getInitialsAvatar,
  getRandomSeed,
};
