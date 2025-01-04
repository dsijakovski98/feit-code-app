import { Fragment, useLayoutEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { valibotResolver } from "@hookform/resolvers/valibot";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";

import { useSignIn } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { Spinner } from "@nextui-org/spinner";

import VerifyPassword from "@/components/AuthForms/SignIn/ForgotPassword/Verify";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { WindowContext } from "@/context/WindowContext";
import { useCtx } from "@/hooks/useCtx";
import { useToggle } from "@/hooks/useToggle";
import { shortClerkErrorMessage } from "@/utils";
import { ForgotPasswordSchema } from "@/utils/schemas/auth/forgotPasswordSchema";

const ForgotPasswordForm = () => {
  const { fullScreen } = useCtx(WindowContext);
  const { signIn } = useSignIn();
  const verifyToggle = useToggle();

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
  } = useForm<ForgotPasswordSchema>({
    resolver: valibotResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordSchema> = async ({ email }) => {
    if (!signIn) return;

    clearErrors("root");

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });

      verifyToggle.toggleOn();
    } catch (e) {
      // Sentry logging
      console.log({ e });

      if (isClerkAPIResponseError(e)) {
        if (e.errors[0].message.includes("not allowed")) {
          setError("root", {
            message: "Password reset not allowed for Google/GitHub users!",
          });
        } else {
          setError("root", { message: shortClerkErrorMessage(e) });
        }
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
        {verifyToggle.open && (
          <motion.div
            initial={{ opacity: 0, height: "0" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <VerifyPassword verifyToggle={verifyToggle} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!verifyToggle.open && (
          <motion.form
            initial={{ opacity: 0, height: initialHeight }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            onChange={handleChange}
            onSubmit={handleSubmit(onSubmit)}
            className={clsx("mx-auto flex h-full w-[90%] flex-col gap-12 pb-3 lg:w-[95%] lg:gap-2 lg:pb-3", {
              "w-[70%] !gap-16 pt-2": fullScreen,
            })}
          >
            <div className="relative">
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
                    isDisabled={isSubmitting}
                    isInvalid={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              {!errors.email?.message && (
                <p className="absolute -translate-y-4 text-sm font-semibold text-foreground-300">
                  We will send a verification code to this email
                </p>
              )}
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
                Send code
              </Button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </Fragment>
  );
};

export default ForgotPasswordForm;
