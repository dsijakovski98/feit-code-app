import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { valibotResolver } from "@hookform/resolvers/valibot";
import clsx from "clsx";

import { useSignIn } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { ROUTES } from "@/constants/routes";
import { WindowContext } from "@/context/WindowContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";
import { shortClerkErrorMessage } from "@/utils";
import { VerifyPasswordSchema } from "@/utils/schemas/auth/forgotPasswordSchema";

type Props = {
  verifyToggle: Toggle;
};

const VerifyPassword = ({ verifyToggle }: Props) => {
  const { fullScreen } = useCtx(WindowContext);
  const { signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<VerifyPasswordSchema>({
    resolver: valibotResolver(VerifyPasswordSchema),
    defaultValues: {
      code: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<VerifyPasswordSchema> = async ({ code, password }) => {
    if (!signIn) return;

    try {
      const completeReset = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });

      if (completeReset.status === "complete") {
        await setActive({ session: completeReset.createdSessionId });
        navigate(ROUTES.dashboard);

        toast.success("Password reset!");
      } else {
        setError("code", { message: "Could not verify code!" });
      }
    } catch (e) {
      // TODO: Sentry logging
      console.log({ e });

      if (isClerkAPIResponseError(e)) {
        setError("code", { message: shortClerkErrorMessage(e, { useLongMessage: true }) });
      } else {
        setError("code", { message: "Something unexpected happened!" });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("mx-auto flex h-full w-[90%] flex-col gap-6 pb-3 lg:w-[95%] lg:pb-1", {
        "pt-2": fullScreen,
      })}
    >
      <div className="text-center">
        <p className="text-lg font-semibold">Enter the 6 digit code you received on your email</p>

        <p className="text-sm font-medium text-foreground-300">
          Make sure to check your Spam folder just in case
        </p>
      </div>

      <div
        className={clsx("space-y-1.5", {
          "space-y-3": fullScreen,
        })}
      >
        <Controller
          control={control}
          name="code"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              autoFocus
              size="lg"
              color="default"
              variant="bordered"
              inputMode="numeric"
              label="Verification code"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                label: "group-data-[filled-within='true']:!-translate-y-[12px]",
                errorMessage: fullScreen ? "text-base" : "",
                input: "!font-sans",
              }}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              size="lg"
              label="New password"
              type="password"
              color="default"
              variant="underlined"
              isDisabled={isSubmitting}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <div className="flex justify-between gap-4">
          <Button fullWidth size="lg" color="default" onPress={verifyToggle.toggleOff}>
            Use different email
          </Button>

          <Button
            fullWidth
            size="lg"
            type="submit"
            color="default"
            variant="solid"
            isLoading={isSubmitting}
            className="bg-primary text-primary-foreground disabled:bg-slate-500"
          >
            Reset Password
          </Button>
        </div>
      </div>
    </form>
  );
};

export default VerifyPassword;
