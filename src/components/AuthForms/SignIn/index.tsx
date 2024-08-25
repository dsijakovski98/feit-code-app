import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { valibotResolver } from "@hookform/resolvers/valibot";

import { useSignIn } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { OAuthStrategy } from "@clerk/types";
import { Spinner } from "@nextui-org/react";

import OAuthJoin from "@/components/OAuthJoin";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { ROUTES } from "@/constants/routes";
import { shortClerkErrorMessage } from "@/utils";
import { SignInSchema } from "@/utils/formSchemas/signInSchema";

const SignInForm = () => {
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

  const oAuthSignIn = (strategy: OAuthStrategy) => {
    return signIn?.authenticateWithRedirect({
      strategy,
      redirectUrl: ROUTES.ssoCallback,
      redirectUrlComplete: ROUTES.dashboard,
    });
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
        navigate(ROUTES.dashboard);
      } else {
        setError("root", { message: "Could not verify code!" });
      }
    } catch (e) {
      // TODO: Sentry logging
      console.log({ e });

      if (isClerkAPIResponseError(e)) {
        console.log(e.toString());
        setError("root", { message: shortClerkErrorMessage(e) });
      } else {
        setError("root", { message: "Something unexpected happened!" });
      }
    }
  };

  if (!signIn) return null;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-[80%] space-y-3 pb-3 lg:w-[95%] lg:space-y-2 lg:pb-1"
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

        <Controller
          control={control}
          name="password"
          disabled={isSubmitting}
          render={({ field, fieldState }) => (
            <Input
              {...field}
              size="md"
              type="password"
              label="Password"
              color="default"
              variant="underlined"
              isInvalid={fieldState.invalid}
              errorMessage={fieldState.error?.message}
            />
          )}
        />
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
          Sign in
        </Button>
      </div>

      <p className="text-center text-content1-foreground">or</p>

      <OAuthJoin isSubmitting={isSubmitting} oAuthJoin={oAuthSignIn} />

      <p className="hidden pt-2 text-center md:block">
        Not a member?{" "}
        <Link className="text-primary underline" to={ROUTES.signUp}>
          Join us
        </Link>
      </p>
    </form>
  );
};

export default SignInForm;
