import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@nextui-org/react";

import { StudentOnboardingContext } from "@/components/Onboarding/Student";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { diceBear } from "@/services/diceBear";

import { createNewStudent } from "@/actions/users";
import { ROUTES } from "@/constants/routes";
import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";

const StudentConfirm = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  const { prevStep } = useCtx(OnboardingContext);
  const [form] = useCtx(StudentOnboardingContext);

  const { fullName, bio, indexNumber, indexYear, major } = form;
  const firstName = useMemo(() => fullName.split(" ")[0], [fullName]);

  const [baseAvatarUrl, setBaseAvatarUrl] = useState(diceBear.getRandomAvatar());
  const [avatarSeed, setAvatarSeed] = useState(diceBear.getRandomSeed());

  const avatarUrl = useMemo(
    () => `${baseAvatarUrl}?seed=${avatarSeed}`,
    [baseAvatarUrl, avatarSeed],
  );

  const getNewStyle = () => {
    let newAvatar = "";
    while (true) {
      newAvatar = diceBear.getRandomAvatar();
      if (newAvatar !== baseAvatarUrl) break;
    }

    setBaseAvatarUrl(newAvatar);
    setAvatarSeed(diceBear.getRandomSeed());
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNewStudent,
    onSuccess: (success) => {
      if (!success) return;

      toast.success(`Welcome ${firstName}!`);
      navigate(ROUTES.dashboard);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleCreateUser = () => {
    if (!user) return;

    mutate({ user, avatarUrl, ...form });
  };

  if (!user) return null;

  return (
    <div className="space-y-10 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Nice to meet you, {firstName}!</h3>
          <p className="text-gray-300">
            Please confirm your details. You can always change them later.
          </p>
        </div>

        {isPending && <Spinner size="lg" color="current" />}
      </div>

      <div className="flex items-end gap-6">
        <div className="relative">
          <img
            width={90}
            height={90}
            alt="Avatar"
            src={avatarUrl}
            className="overflow-hidden rounded-full bg-primary"
          />

          <Button
            isIconOnly
            color="default"
            size="sm"
            className="absolute bottom-0 right-0 grid place-items-center rounded-full p-1 pt-1.5"
            onPress={getNewStyle}
          >
            <Icon name="restart" />
          </Button>
        </div>

        <div>
          <p className="text-xl font-semibold">{fullName}</p>
          <p className="text-gray-300">{bio}</p>
          <p className="mt-2">
            Index {indexNumber}/{indexYear} @ {major}
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <Button
          fullWidth
          color="default"
          variant="bordered"
          size="lg"
          onPress={prevStep}
          disabled={isPending}
        >
          Go back
        </Button>

        <Button fullWidth type="submit" size="lg" onPress={handleCreateUser} disabled={isPending}>
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default StudentConfirm;
