import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { fbStorage } from "@/services/firebase";

export const getAvatarBlob = async (avatarUrl: string) => {
  const response = await fetch(avatarUrl);

  if (!response.ok) {
    throw new Error(`Failed to get avatar URL: ${avatarUrl}`);
  }

  const avatarBlob = await response.blob();

  return avatarBlob;
};

export const getAvatarUrl = async (userId: string) => {
  const avatarRef = ref(fbStorage, `avatars/${userId}`);

  try {
    const avatarUrl = await getDownloadURL(avatarRef);
    return avatarUrl;
  } catch {
    return "";
  }
};

export const uploadAvatar = async (userId: string, avatarUrl: string) => {
  const avatarRef = ref(fbStorage, `avatars/${userId}`);

  const avatarBlob = await getAvatarBlob(avatarUrl);
  await uploadBytes(avatarRef, avatarBlob);

  const url = await getDownloadURL(avatarRef);
  return url;
};

export const getAvatar = async (userId: string) => {
  const avatarRef = ref(fbStorage, `avatars/${userId}`);
  const url = await getDownloadURL(avatarRef).catch(() => null);

  return url;
};

export const updateAvatar = async (userId: string, avatarUrl: string) => {
  const avatarRef = ref(fbStorage, `avatars/${userId}`);

  if (avatarUrl.trim() === "") {
    await deleteObject(avatarRef);
    return;
  }

  const oldUrl = await getDownloadURL(avatarRef)
    .then((url) => url)
    .catch(() => {});

  if (oldUrl === avatarUrl) {
    return;
  }

  const newAvatar = await getAvatarBlob(avatarUrl);

  await deleteObject(avatarRef).catch(() => {});
  await uploadBytes(avatarRef, newAvatar);

  const newUrl = await getDownloadURL(avatarRef);

  return newUrl;
};
