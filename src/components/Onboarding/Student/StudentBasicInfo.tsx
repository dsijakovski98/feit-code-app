import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Textarea } from "@nextui-org/react";

import { StudentOnboardingContext } from "@/components/Onboarding/Student";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { StudentOnboardingBasicInfoSchema } from "@/utils/formSchemas/onboarding/studentOnboarding";

const StudentBasicInfo = () => {
  const { nextStep } = useCtx(OnboardingContext);
  const [form, setForm] = useCtx(StudentOnboardingContext);

  const { control, handleSubmit } = useForm<StudentOnboardingBasicInfoSchema>({
    resolver: valibotResolver(StudentOnboardingBasicInfoSchema),
    defaultValues: {
      fullName: form.fullName,
      bio: form.bio,
    },
  });

  const onSubmit: SubmitHandler<StudentOnboardingBasicInfoSchema> = (basicInfo) => {
    setForm((prev) => ({ ...prev, ...basicInfo }));
    nextStep();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-14 py-8">
      <h3 className="text-xl font-semibold">Let's get to know you better</h3>

      <div className="pb-10">
        <Controller
          control={control}
          name="fullName"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              autoFocus
              size="lg"
              color="default"
              variant="underlined"
              label="Full Name"
              placeholder="Your first and last name"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="bio"
          render={({ field, fieldState }) => (
            <Textarea
              {...field}
              size="lg"
              minRows={2}
              color="default"
              variant="underlined"
              label="Bio (optional)"
              placeholder="Tell us something about yourself"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "text-lg font-semibold !text-foreground",
              }}
            />
          )}
        />
      </div>

      <Button fullWidth type="submit" size="lg">
        Continue
      </Button>
    </form>
  );
};

export default StudentBasicInfo;
