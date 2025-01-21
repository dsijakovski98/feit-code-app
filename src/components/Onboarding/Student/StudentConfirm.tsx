import { useMemo, useState, useTransition } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";

import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/tooltip";

import { StudentOnboardingContext } from "@/components/Onboarding/Student";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

import { diceBear } from "@/services/diceBear";

import { createNewStudent } from "@/actions/users";
import { ROUTES } from "@/constants/routes";
import { OnboardingContext } from "@/context/OnboardingContext";
import { ResponsiveContext } from "@/context/ResponsiveContext";
import { useCtx } from "@/hooks/useCtx";

const StudentConfirm = () => {
  const { isMobile } = useCtx(ResponsiveContext);

  const { prevStep } = useCtx(OnboardingContext);

  const [form] = useCtx(StudentOnboardingContext);
  const { fullName, bio, indexNumber, indexYear, major } = form;

  const { user } = useUser();
  const navigate = useNavigate();

  const firstName = useMemo(() => fullName.split(" ")[0], [fullName]);

  const [baseAvatarUrl, setBaseAvatarUrl] = useState(diceBear.getRandomAvatar());
  const [avatarSeed, setAvatarSeed] = useState(diceBear.getRandomSeed());
  const [transitionPending, startTransition] = useTransition();

  const avatarUrl = useMemo(() => `${baseAvatarUrl}?seed=${avatarSeed}`, [baseAvatarUrl, avatarSeed]);

  const getNewStyle = () => {
    startTransition(async () => {
      let newAvatar = "";
      let newSeed = 0;

      while (true) {
        newAvatar = diceBear.getRandomAvatar();

        if (newAvatar === baseAvatarUrl) continue;

        newSeed = diceBear.getRandomSeed();
        const url = `${newAvatar}?seed=${newSeed}`;

        try {
          const response = await fetch(url, { signal: AbortSignal.timeout(3000) });

          if (response.ok) break;
        } catch {
          continue;
        }
      }

      setBaseAvatarUrl(newAvatar);
      setAvatarSeed(newSeed);
    });
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

  const handleCreateUser = async () => {
    if (!user) return;

    mutate({ user, avatarUrl, ...form });
  };

  if (!user) return null;

  return (
    <div className="space-y-10 py-8 lg:py-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold md:text-lg">Nice to meet you, {firstName}!</h3>
          <p className="text-foreground-300 md:text-sm">
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
            className={clsx("overflow-hidden rounded-full bg-primary", {
              "opacity-50": transitionPending,
            })}
          />

          <Tooltip
            placement="bottom"
            content="Get a random avatar"
            classNames={{ content: "font-semibold text-sm font-serif" }}
          >
            <Button
              isIconOnly
              size="sm"
              color="default"
              onPress={getNewStyle}
              isLoading={transitionPending}
              aria-label="Get random avatar"
              className="absolute bottom-0 right-0 grid place-items-center rounded-full p-1 pt-1.5"
            >
              <Icon name="restart" />
            </Button>
          </Tooltip>
        </div>

        <div>
          <p className="text-xl font-semibold">{fullName}</p>
          <p className="text-foreground-300">{bio}</p>
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
          onPress={prevStep}
          disabled={isPending}
          size={isMobile ? "md" : "lg"}
        >
          Go back
        </Button>

        <Button
          fullWidth
          type="submit"
          disabled={isPending}
          onPress={handleCreateUser}
          size={isMobile ? "md" : "lg"}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default StudentConfirm;
