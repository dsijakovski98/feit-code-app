import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { valibotResolver } from "@hookform/resolvers/valibot";
import clsx from "clsx";

import { useSignUp } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { OAuthStrategy } from "@clerk/types";
import { Spinner } from "@nextui-org/react";

import Verify from "@/components/AuthForms/SignUp/Verify";
import OAuthJoin from "@/components/OAuthJoin";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { ROUTES } from "@/constants/routes";
import { useToggle } from "@/hooks/useToggle";
import { useWindowContext } from "@/hooks/useWindowContext";
import { shortClerkErrorMessage } from "@/utils";
import { SignUpSchema } from "@/utils/formSchemas/signUpSchema";

const SignUpForm = () => {
  const { fullScreen } = useWindowContext();
  const { signUp } = useSignUp();
  const verifyMode = useToggle();

  const {
    handleSubmit,
    control,
    setError,
    reset,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<SignUpSchema>({
    resolver: valibotResolver(SignUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const oAuthSignUp = (strategy: OAuthStrategy) => {
    return signUp?.authenticateWithRedirect({
      strategy,
      redirectUrl: ROUTES.ssoCallback,
      redirectUrlComplete: ROUTES.dashboard,
    });
  };

  const onSubmit: SubmitHandler<SignUpSchema> = async ({ email, password, confirmPassword }) => {
    if (!signUp) return;

    clearErrors("root");

    if (password !== confirmPassword) {
      setError("confirmPassword", { message: "Passwords must match!" });

      return;
    }

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      verifyMode.toggleOn();
      reset({ email: "", password: "", confirmPassword: "" });
    } catch (e) {
      // TODO: Sentry logging
      console.log(e);

      if (isClerkAPIResponseError(e)) {
        setError("root", { message: shortClerkErrorMessage(e) });
      } else {
        setError("root", { message: "Something unexpected happened!" });
      }
    }
  };

  if (!signUp) {
    return null;
  }

  if (verifyMode.open) {
    return <Verify verifyMode={verifyMode} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(
        "mx-auto flex h-full w-[90%] flex-col gap-3 pb-3 lg:w-[95%] lg:gap-2 lg:pb-3",
        {
          "w-[70%] !gap-4 pt-10": fullScreen,
        },
      )}
    >
      <div
        className={clsx("mb-9 space-y-1 lg:space-y-0", {
          "mb-36": fullScreen,
        })}
      >
        <Controller
          control={control}
          name="email"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              size={fullScreen ? "lg" : "md"}
              label="Email"
              color="default"
              variant="underlined"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <div className="flex items-center justify-between gap-10 lg:block">
          <Controller
            control={control}
            name="password"
            disabled={isSubmitting}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                size={fullScreen ? "lg" : "md"}
                label="Password"
                type="password"
                color="default"
                variant="underlined"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            disabled={isSubmitting}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                size={fullScreen ? "lg" : "md"}
                label="Confirm password"
                type="password"
                color="default"
                variant="underlined"
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="relative">
        {errors.root?.message && (
          <p
            className={clsx(
              "absolute -top-2 w-full -translate-y-full text-center text-sm font-medium leading-[1.1] text-danger-400",
              {
                "!-top-4 !text-lg": fullScreen,
              },
            )}
          >
            {errors.root.message}
          </p>
        )}

        <Button
          fullWidth
          size={fullScreen ? "lg" : "md"}
          type="submit"
          color="default"
          variant="solid"
          disabled={isSubmitting}
          startContent={isSubmitting && <Spinner color="default" size="sm" />}
          className="bg-slate-300 text-base text-content1 disabled:bg-slate-500"
        >
          Sign up
        </Button>
      </div>

      <p className="text-center text-content1-foreground">or</p>

      <OAuthJoin isSubmitting={isSubmitting} oAuthJoin={oAuthSignUp} />

      <p className="hidden pt-2 text-center md:block">
        Already a member?{" "}
        <Link className="text-primary underline" to={ROUTES.signIn}>
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
