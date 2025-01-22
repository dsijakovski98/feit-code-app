import {
  adventurer,
  adventurerNeutral,
  avataaars,
  avataaarsNeutral,
  bigEarsNeutral,
  bigSmile,
  botttsNeutral,
  funEmoji,
  glass,
  identicon,
  initials,
  lorelei,
  loreleiNeutral,
  micah,
  miniavs,
  notionists,
  notionistsNeutral,
  personas,
  pixelArt,
  pixelArtNeutral,
  rings,
  shapes,
  thumbs,
} from "@dicebear/collection";
import { Style, createAvatar } from "@dicebear/core";

const studentIconStyles = [
  adventurer,
  adventurerNeutral,
  avataaars,
  avataaarsNeutral,
  bigEarsNeutral,
  bigSmile,
  botttsNeutral,
  funEmoji,
  glass,
  identicon,
  lorelei,
  loreleiNeutral,
  micah,
  miniavs,
  notionists,
  notionistsNeutral,
  personas,
  pixelArt,
  pixelArtNeutral,
  rings,
  shapes,
  thumbs,
];

export const AVATAR_SIZE = 90;

const getRandomAvatar = (seed: string) => {
  const style = studentIconStyles[Math.floor(Math.random() * studentIconStyles.length)] as Style<
    typeof studentIconStyles
  >;

  return createAvatar(style, { size: AVATAR_SIZE, seed }).toDataUri();
};

const getInitialsAvatar = (fullName: string) => {
  return createAvatar(initials, { seed: fullName, size: AVATAR_SIZE }).toDataUri();
};

const RANDOM_SEED = 120;
const getRandomSeed = () => Math.floor(Math.random() * RANDOM_SEED).toString();

export const diceBear = {
  getRandomAvatar,
  getInitialsAvatar,
  getRandomSeed,
};
