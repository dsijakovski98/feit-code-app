import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Textarea } from "@nextui-org/react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { StudentOnboardingBasicInfoSchema } from "@/utils/formSchemas/onboarding/studentOnboarding";

const StudentBasicInfo = () => {
  const {
    studentState: [form, setStudentForm],
    nextStep,
  } = useCtx(OnboardingContext);

  const { control, handleSubmit } = useForm<StudentOnboardingBasicInfoSchema>({
    resolver: valibotResolver(StudentOnboardingBasicInfoSchema),
    defaultValues: {
      fullName: form.fullName,
      bio: form.bio,
    },
  });

  const onSubmit: SubmitHandler<StudentOnboardingBasicInfoSchema> = ({ fullName, bio }) => {
    console.log({ fullName, bio });

    setStudentForm((prev) => ({ ...prev, fullName, bio }));
    nextStep();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-12 px-14 py-8">
      <div>
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
                label: "text-base",
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
