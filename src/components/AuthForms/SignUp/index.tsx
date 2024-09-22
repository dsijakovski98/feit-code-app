import { useLayoutEffect, useState } from "react";
import { Fragment } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { valibotResolver } from "@hookform/resolvers/valibot";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { useSignUp } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { OAuthStrategy } from "@clerk/types";
import { Spinner } from "@nextui-org/react";

import VerifySignUp from "@/components/AuthForms/SignUp/Verify";
import OAuthJoin from "@/components/OAuthJoin";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { ROUTES } from "@/constants/routes";
import { WindowContext } from "@/context/WindowContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { shortClerkErrorMessage } from "@/utils";
import { SignUpSchema } from "@/utils/formSchemas/auth/signUpSchema";

const SignUpForm = () => {
  const { fullScreen } = useCtx(WindowContext);
  const { signUp } = useSignUp();
  const verifyMode = useToggle();

  const [initialHeight, setInitialHeight] = useState<0 | "auto">("auto");

  useLayoutEffect(() => {
    const timeout = setTimeout(() => setInitialHeight(0), 100);
    return () => clearTimeout(timeout);
  });

  const {
    handleSubmit,
    control,
    setError,
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
      redirectUrlComplete: ROUTES.welcome,
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

  return (
    <Fragment>
      <AnimatePresence>
        {verifyMode.open && (
          <motion.div
            initial={{ opacity: 0, height: "0" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <VerifySignUp verifyMode={verifyMode} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!verifyMode.open && (
          <motion.form
            initial={{ opacity: 0, height: initialHeight }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onChange={handleChange}
            onSubmit={handleSubmit(onSubmit)}
            className={clsx("mx-auto flex h-full w-[90%] flex-col gap-3 pb-3 lg:w-[95%] lg:gap-2 lg:pb-0", {
              "w-[70%] !gap-4 pt-10": fullScreen,
            })}
          >
            <div className={clsx("mb-10 lg:mb-2", { "mb-36": fullScreen })}>
              <Controller
                control={control}
                name="email"
                disabled={isSubmitting}
                render={({ field, fieldState }) => (
                  <Input
                    {...field}
                    autoFocus
                    size="lg"
                    label="Email"
                    color="default"
                    variant="underlined"
                    isInvalid={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />

              <div className="flex items-center justify-between gap-8 lg:block">
                <Controller
                  control={control}
                  name="password"
                  disabled={isSubmitting}
                  render={({ field, fieldState }) => (
                    <Input
                      {...field}
                      size="lg"
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
                      size="lg"
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
                disabled={isSubmitting}
                startContent={isSubmitting && <Spinner color="default" size="sm" />}
                className="bg-primary text-base !font-semibold text-primary-foreground disabled:bg-slate-400"
              >
                Sign up
              </Button>
            </div>

            <p className="text-center text-content1-foreground">or</p>

            <OAuthJoin joinType="Join" isSubmitting={isSubmitting} oAuthJoin={oAuthSignUp} />

            <p className="hidden pt-2 text-center md:block">
              Already a member?{" "}
              <Link className="text-primary underline" to={ROUTES.signIn}>
                Sign in
              </Link>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default SignUpForm;
