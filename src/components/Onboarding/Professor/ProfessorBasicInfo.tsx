import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { Select, SelectItem } from "@nextui-org/select";

import { ProfessorForm, ProfessorOnboardingContext } from "@/components/Onboarding/Professor";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { MAJORS } from "@/constants/students";
import { OnboardingContext } from "@/context/OnboardingContext";
import { useCtx } from "@/hooks/useCtx";
import { TEACHER_TYPE } from "@/types";
import { ProfessorOnboardingSchema } from "@/utils/schemas/onboarding/professorOnboarding";

const ProfessorBasicInfo = () => {
  const { nextStep } = useCtx(OnboardingContext);
  const [form, setForm] = useCtx(ProfessorOnboardingContext);

  const { control, handleSubmit } = useForm<ProfessorForm>({
    resolver: valibotResolver(ProfessorOnboardingSchema),
    defaultValues: { ...form },
  });

  const onSubmit: SubmitHandler<ProfessorForm> = (formData) => {
    setForm(formData);
    nextStep();
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-14 py-8">
      <h3 className="text-xl font-semibold">Tell us more about yourself</h3>

      <div className="pb-10">
        <div className="flex gap-8">
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
            name="type"
            render={({ field, fieldState }) => (
              <Select
                {...field}
                size="lg"
                label="Type"
                color="default"
                variant="underlined"
                defaultSelectedKeys={[form.type]}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
                classNames={{
                  label: "font-semibold !text-foreground text-lg",
                  value: "font-medium",
                }}
              >
                {Object.values(TEACHER_TYPE).map((label) => (
                  <SelectItem key={label} textValue={label}>
                    <p className="text-base font-medium">{label}</p>
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>

        <Controller
          control={control}
          name="department"
          render={({ field, fieldState }) => (
            <Select
              {...field}
              size="lg"
              label="Major"
              color="default"
              variant="underlined"
              defaultSelectedKeys={[form.department]}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "font-semibold !text-foreground text-lg",
                value: "font-medium",
              }}
            >
              {MAJORS.map(({ label, description }) => (
                <SelectItem key={label} textValue={label}>
                  <p className="text-base font-semibold">{label}</p>
                  <p className="text-sm text-foreground-400">{description}</p>
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </div>

      <Button fullWidth type="submit" size="lg">
        Continue
      </Button>
    </form>
  );
};

export default ProfessorBasicInfo;
