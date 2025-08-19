import { ChangeEvent, ComponentRef, KeyboardEvent, useRef } from "react";

import clsx from "clsx";
import { ClassValue } from "clsx";

import AvatarPreview from "@/components/ProfileManagement/AvatarUpload/AvatarPreview";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { UseState } from "@/types";

type Props = {
  email: string;
  avatarState: UseState<string>;
  className?: ClassValue;
};

const AvatarUpload = ({ avatarState, email, className = "" }: Props) => {
  const [avatar, setAvatar] = avatarState;
  const inputRef = useRef<ComponentRef<"input">>(null);
  const imgRef = useRef<ComponentRef<"img">>(null);

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

    const [file] = files;

    const newAvatar = URL.createObjectURL(file);
    setAvatar(newAvatar);
  };

  return (
    <section className="flex items-end justify-between">
      <div className={clsx("flex items-end gap-4 lg:w-full lg:items-center lg:justify-center", className)}>
        <AvatarPreview avatar={avatar} ref={imgRef} />

        <div className="space-y-1">
          <p className="font-semibold">Update Avatar</p>
          <div className="flex items-center gap-2">
            <Button
              color="default"
              variant="ghost"
              size="sm"
              aria-hidden
              tabIndex={-1}
              className="min-w-max px-0 focus-within:outline focus-within:outline-primary"
            >
              <label
                tabIndex={0}
                htmlFor="upload-avatar"
                onKeyDown={handleInputButton}
                className="grid h-full cursor-pointer place-items-center px-4 text-sm !outline-none"
              >
                Upload
              </label>
            </Button>

            <input
              ref={inputRef}
              type="file"
              tabIndex={-1}
              accept="image/*"
              id="upload-avatar"
              aria-hidden="false"
              className="sr-only appearance-none"
              onChange={handleAvatarChange}
            />

            <Button
              isIconOnly
              size="sm"
              radius="full"
              color="danger"
              variant="light"
              aria-label="Remove avatar"
              className="p-1 text-xs text-danger-500"
              onPress={clearAvatar}
            >
              <Icon name="trash" />
            </Button>
          </div>
        </div>
      </div>

      <p className="text-end lg:hidden">
        Signed in as <span className="block font-semibold">{email}</span>
      </p>
    </section>
  );
};

export default AvatarUpload;
