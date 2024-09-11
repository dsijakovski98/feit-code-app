import { ChangeEvent, ElementRef, KeyboardEvent, useRef, useState } from "react";

import clsx from "clsx";
import { ClassValue } from "clsx";

import AvatarPreview from "@/components/ProfileManagement/AvatarUpload/AvatarPreview";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

type Props = {
  avatarUrl: string | null;
  className?: ClassValue;
};

const AvatarUpload = ({ avatarUrl, className = "" }: Props) => {
  const [avatar, setAvatar] = useState(avatarUrl ?? "");
  const inputRef = useRef<ElementRef<"input">>(null);
  const imgRef = useRef<ElementRef<"img">>(null);

  const clearAvatar = () => {
    setAvatar("");
  };

  const handleInputButton = (e: KeyboardEvent) => {
    if (!inputRef.current) return;

    if (["Enter", "Space"].includes(e.code)) {
      inputRef.current.click();
    }
  };

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (!files) return;

    const newAvatar = URL.createObjectURL(files[0]);
    setAvatar(newAvatar);
  };

  return (
    <div className={clsx("flex items-center gap-4", className)}>
      <AvatarPreview avatar={avatar} ref={imgRef} />
      <div className="space-y-1">
        <p className="font-semibold">Avatar</p>
        <div className="flex items-center gap-2">
          <Button
            color="default"
            variant="ghost"
            size="sm"
            tabIndex={-1}
            className="min-w-max px-0 focus-within:outline focus-within:outline-primary"
          >
            <label
              role="button"
              tabIndex={0}
              onKeyDown={handleInputButton}
              htmlFor="upload-avatar"
              className="grid h-full cursor-pointer place-items-center px-3 text-xs !outline-none"
            >
              Upload
            </label>
          </Button>
          <input
            ref={inputRef}
            id="upload-avatar"
            type="file"
            aria-hidden="false"
            tabIndex={-1}
            className="sr-only appearance-none"
            accept="image/*"
            onChange={handleAvatarChange}
          />

          <Button
            isIconOnly
            variant="light"
            radius="full"
            color="danger"
            className="p-1.5 text-xs"
            onPress={clearAvatar}
          >
            <Icon name="trash" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AvatarUpload;
