import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { valibotResolver } from "@hookform/resolvers/valibot";
import clsx from "clsx";

import { useSignUp } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { Spinner } from "@nextui-org/react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { ROUTES } from "@/constants/routes";
import { WindowContext } from "@/context/WindowContext";
import { useCtx } from "@/hooks/useCtx";
import { Toggle } from "@/hooks/useToggle";
import { shortClerkErrorMessage } from "@/utils";
import { VerifyAuthSchema } from "@/utils/formSchemas/auth/verifyAuthSchema";

type Props = {
  verifyMode: Toggle;
};

const Verify = ({ verifyMode }: Props) => {
  const { fullScreen } = useCtx(WindowContext);
  const { signUp, setActive } = useSignUp();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setError,
    formState: { isSubmitting },
  } = useForm<VerifyAuthSchema>({
    resolver: valibotResolver(VerifyAuthSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit: SubmitHandler<VerifyAuthSchema> = async ({ code }) => {
    if (!signUp) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status == "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigate(ROUTES.welcome);
      } else {
        setError("code", { message: "Could not verify code!" });
      }
    } catch (e) {
      // TODO: Sentry logging
      console.log(e);

      if (isClerkAPIResponseError(e)) {
        setError("code", { message: shortClerkErrorMessage(e, { useLongMessage: true }) });
      } else {
        setError("code", { message: "Something unexpected happened!" });
      }
    }
  };

  if (!signUp) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("mx-auto flex h-full w-[90%] flex-col gap-4 pb-3 lg:w-[95%] lg:pb-1", {
        "pt-36": fullScreen,
      })}
    >
      <p className="text-center text-lg">Enter the 6 digit code you received on your email</p>

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
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
              classNames={{
                input: "placeholder:font-light placeholder:text-slate-400",
                label: "group-data-[filled-within='true']:!-translate-y-[12px]",
                errorMessage: fullScreen ? "text-base" : "",
              }}
            />
          )}
        />

        <div className="flex justify-between gap-4">
          <Button fullWidth size="lg" color="default" onPress={verifyMode.toggleOff}>
            Use different email
          </Button>

          <Button
            fullWidth
            size="lg"
            type="submit"
            color="default"
            variant="solid"
            disabled={isSubmitting}
            startContent={isSubmitting && <Spinner color="default" size="sm" />}
            className="bg-primary text-primary-foreground disabled:bg-slate-500"
          >
            Verify
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Verify;
