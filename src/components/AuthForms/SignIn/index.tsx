import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useMutation } from "@tanstack/react-query";
import clsx from "clsx";

import { useSignIn } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { OAuthStrategy } from "@clerk/types";
import { Spinner } from "@nextui-org/react";

import OAuthJoin from "@/components/OAuthJoin";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { ROUTES } from "@/constants/routes";
import { WindowContext } from "@/context/WindowContext";
import { useCtx } from "@/hooks/useCtx";
import { shortClerkErrorMessage } from "@/utils";
import { joinOAuth } from "@/utils/auth";
import { SignInSchema } from "@/utils/formSchemas/auth/signInSchema";

const SignInForm = () => {
  const { fullScreen } = useCtx(WindowContext);
  const { signIn, setActive } = useSignIn();
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<SignInSchema>({
    resolver: valibotResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: joinOAuth,
    onError: (error) => toast.error(error.message),
  });

  const oAuthSignIn = (strategy: OAuthStrategy) => {
    mutate({ strategy, authResource: signIn });
  };

  const onSubmit: SubmitHandler<SignInSchema> = async ({ email, password }) => {
    if (!signIn) return;

    clearErrors("root");

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        navigate(ROUTES.welcome);
      } else {
        setError("root", { message: "Could not verify code!" });
      }
    } catch (e) {
      // TODO: Sentry logging
      console.log({ e });

      if (isClerkAPIResponseError(e)) {
        setError("root", { message: shortClerkErrorMessage(e) });
      } else {
        setError("root", { message: "Something unexpected happened!" });
      }
    }
  };

  const handleChange = () => {
    clearErrors("root");
  };

  // isSuccess is needed because need to wait for OAuth to redirect after Promise is resolved
  const formLoading = isSubmitting || isPending || isSuccess;

  return (
    <form
      onChange={handleChange}
      onSubmit={handleSubmit(onSubmit)}
      className={clsx("mx-auto flex h-full w-[90%] flex-col gap-3 pb-3 lg:w-[95%] lg:gap-2 lg:pb-3", {
        "w-[70%] !gap-4 pt-10": fullScreen,
      })}
    >
      <div className="mb-10">
        <Controller
          control={control}
          name="email"
          disabled={formLoading}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              autoFocus
              size="lg"
              label="Email"
              color="default"
              variant="underlined"
              isDisabled={formLoading}
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        <div>
          <Controller
            control={control}
            name="password"
            disabled={formLoading}
            render={({ field, fieldState }) => (
              <Input
                {...field}
                size="lg"
                type="password"
                label="Password"
                color="default"
                variant="underlined"
                isDisabled={formLoading}
                isInvalid={fieldState.invalid}
                errorMessage={fieldState.error?.message}
              />
            )}
          />
          <Link
            aria-disabled={formLoading}
            to={ROUTES.forgotPassword}
            className={clsx("font-medium transition-colors hover:text-primary focus:text-primary", {
              "pointer-events-none text-default": formLoading,
            })}
          >
            Forgot password?
          </Link>
        </div>
      </div>

      <div className="relative">
        {errors.root?.message && (
          <p
            className={clsx(
              "absolute -top-2 w-full -translate-y-full text-center text-sm font-medium leading-[1.1] text-danger-500",
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
          disabled={formLoading}
          startContent={isSubmitting && <Spinner color="default" size="sm" />}
          className="bg-primary text-base font-semibold text-primary-foreground disabled:bg-slate-400"
        >
          Sign in
        </Button>
      </div>

      <p className="my-1 text-center font-sans text-content1-foreground">or</p>

      <OAuthJoin joinType="Sign in" oAuthJoin={oAuthSignIn} formLoading={formLoading} />

      <p className="hidden pt-2 text-center md:block">
        Not a member?{" "}
        <Link
          aria-disabled={formLoading}
          className={clsx("text-primary underline", {
            "pointer-events-none text-default": formLoading,
          })}
          to={ROUTES.signUp}
        >
          Join us
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
