import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { useSignUp } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { OAuthStrategy } from "@clerk/types";
import { Spinner } from "@nextui-org/react";

import Verify from "@/components/AuthForms/SignUp/Verify";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Input from "@/components/ui/Input";

import { ROUTES } from "@/constants/routes";
import { useToggle } from "@/hooks/useToggle";
import { shortClerkErrorMessage } from "@/utils";
import { AuthSchema } from "@/utils/formSchemas/authSchema";

const SignUpForm = () => {
  const { signUp } = useSignUp();

  const verifyMode = useToggle();

  const {
    handleSubmit,
    control,
    setError,
    reset,
    clearErrors,
    formState: { isSubmitting, errors },
  } = useForm<AuthSchema>({
    resolver: valibotResolver(AuthSchema),
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

  const onSubmit: SubmitHandler<AuthSchema> = async ({ email, password, confirmPassword }) => {
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
      className="mx-auto w-[80%] space-y-3 pb-3 lg:w-full lg:space-y-2 lg:pb-1"
    >
      <div className="mb-9 space-y-1 lg:space-y-0">
        <Controller
          control={control}
          name="email"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              size="md"
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
                size="md"
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
                size="md"
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
          <p className="absolute -top-2 w-full -translate-y-full text-center text-sm font-medium leading-[1.1] text-danger-400">
            {errors.root.message}
          </p>
        )}

        <Button
          fullWidth
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

      <div className="flex items-center justify-between gap-4 lg:justify-center">
        <Button
          fullWidth
          size="lg"
          color="default"
          variant="bordered"
          disabled={isSubmitting}
          className="lg:px-3"
          onClick={() => oAuthSignUp("oauth_google")}
        >
          <Icon name="google" className="min-h-6 min-w-6 lg:min-h-5 lg:min-w-5" />
          <span className="lg:text-sm">Join with Google</span>
        </Button>
        <Button
          fullWidth
          size="lg"
          color="default"
          variant="bordered"
          disabled={isSubmitting}
          className="lg:px-3"
          onClick={() => oAuthSignUp("oauth_github")}
        >
          <Icon name="github" className="min-h-6 min-w-6 lg:min-h-5 lg:min-w-5" />
          <span className="lg:text-sm">Join with GitHub</span>
        </Button>
      </div>

      <p className="hidden pt-2 text-center lg:block">
        Already a member?{" "}
        <Link className="text-primary underline" to={ROUTES.signIn}>
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default SignUpForm;
