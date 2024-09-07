import { useMemo } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";

import { useUser } from "@clerk/clerk-react";
import { Spinner } from "@nextui-org/react";

import { ProfessorOnboardingContext } from "@/components/Onboarding/Professor";
import Button from "@/components/ui/Button";

import { diceBear } from "@/services/diceBear";

import { createNewProfessor } from "@/actions/users";
import { ROUTES } from "@/constants/routes";
import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";

const ProfessorConfirm = () => {
  const { user } = useUser();

  const navigate = useNavigate();

  const { prevStep } = useCtx(OnboardingContext);
  const [form] = useCtx(ProfessorOnboardingContext);

  const { fullName, type, department } = form;
  const lastName = useMemo(() => fullName.split(" ").slice(1).join(" "), [fullName]);
  const avatarUrl = useMemo(() => diceBear.getInitialsAvatar(fullName), [fullName]);

  const { mutate, isPending } = useMutation({
    mutationFn: createNewProfessor,
    onSuccess: (success) => {
      if (!success) return;

      toast.success(`Welcome, Professor ${lastName}!`);
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
          <h3 className="text-xl font-semibold">Good to see you, Professor {lastName}</h3>
          <p className="text-gray-300">
            Please confirm your details. You can always change them later.
          </p>
        </div>

        {isPending && <Spinner size="lg" color="current" />}
      </div>

      <div className="flex items-center gap-6">
        <img
          width={90}
          height={90}
          alt="Avatar"
          src={avatarUrl}
          className="overflow-hidden rounded-full bg-primary"
        />

        <div className="space-y-1">
          <p className="text-xl font-semibold">{fullName}</p>
          <p className="text-gray-300">
            {type} @ {department}
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

export default ProfessorConfirm;
