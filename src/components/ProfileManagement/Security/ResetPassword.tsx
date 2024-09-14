import { Fragment, useMemo } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useQueryClient } from "@tanstack/react-query";

import { useAuth, useUser } from "@clerk/clerk-react";
import { isClerkAPIResponseError } from "@clerk/clerk-react/errors";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/modal";
import { Checkbox } from "@nextui-org/react";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

import { resetPassword } from "@/actions/users";
import { ROUTES } from "@/constants/routes";
import { useToggle } from "@/hooks/useToggle";
import { getAuthStrategy, shortClerkErrorMessage } from "@/utils";
import { ResetPasswordSchema } from "@/utils/formSchemas/profile/resetPassword";

const ResetPassword = () => {
  const { user } = useUser();
  const { signOut } = useAuth();
  const queryClient = useQueryClient();

  const dialog = useToggle();

  const authStrategy = useMemo(() => getAuthStrategy(user), [user]);

  const {
    control,
    setError,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ResetPasswordSchema>({
    resolver: valibotResolver(ResetPasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      signOutOfOtherSessions: false,
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordSchema> = async ({
    currentPassword,
    newPassword,
    confirmNewPassword,
    signOutOfOtherSessions,
  }) => {
    if (!user) return;

    if (newPassword !== confirmNewPassword) {
      setError("confirmNewPassword", { message: "Passwords must match!" });

      return;
    }

    try {
      await user.updatePassword({
        currentPassword,
        newPassword,
        signOutOfOtherSessions,
      });

      if (signOutOfOtherSessions) {
        await signOut({ redirectUrl: ROUTES.signIn });
      } else {
        await Promise.all([
          queryClient.invalidateQueries({
            queryKey: [{ name: "student-profile", userId: user.id }],
          }),
          queryClient.invalidateQueries({ queryKey: [{ name: "user", userId: user.id }] }),
        ]);

        toast.success("Password reset!");
        dialog.toggleOff();
      }
    } catch (error) {
      // TODO: Sentry logging
      console.log({ error });

      if (isClerkAPIResponseError(error)) {
        setError("root", { message: shortClerkErrorMessage(error) });
      } else {
        setError("root", { message: "Something unexpected happened!" });
      }
    }
  };

  return (
    <Fragment>
      <Button
        variant="ghost"
        color="default"
        className="w-[140px] border-foreground-300 py-[22px] text-sm font-semibold text-foreground lg:w-full"
        disabled={!!authStrategy}
        onPress={dialog.toggleOn}
      >
        Reset password
      </Button>

      <Modal
        isOpen={dialog.open}
        onOpenChange={dialog.toggle}
        hideCloseButton
        placement="center"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-background/50",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalHeader className="text-2xl">Password reset</ModalHeader>

              <ModalBody className="relative">
                <form
                  id="reset-pwd"
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 pb-8"
                >
                  <Controller
                    control={control}
                    name="currentPassword"
                    disabled={isSubmitting}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        size="lg"
                        type="password"
                        label="Old password"
                        color="default"
                        variant="underlined"
                        isDisabled={isSubmitting}
                        isInvalid={fieldState.invalid}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="newPassword"
                    disabled={isSubmitting}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        size="lg"
                        type="password"
                        label="New password"
                        color="default"
                        variant="underlined"
                        isDisabled={isSubmitting}
                        isInvalid={fieldState.invalid}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="confirmNewPassword"
                    disabled={isSubmitting}
                    render={({ field, fieldState }) => (
                      <Input
                        {...field}
                        size="lg"
                        type="password"
                        label="Confirm new password"
                        color="default"
                        variant="underlined"
                        isDisabled={isSubmitting}
                        isInvalid={fieldState.invalid}
                        errorMessage={fieldState.error?.message}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="signOutOfOtherSessions"
                    disabled={isSubmitting}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Checkbox
                        onBlur={onBlur}
                        onChange={onChange}
                        isSelected={value}
                        isDisabled={isSubmitting}
                        classNames={{ label: "ml-1" }}
                      >
                        Sign out of all sessions
                      </Checkbox>
                    )}
                  />
                </form>

                {errors.root?.message && (
                  <p className="absolute bottom-0 left-0 w-full text-center font-semibold text-danger">
                    {errors.root.message}
                  </p>
                )}
              </ModalBody>

              <ModalFooter>
                <Button
                  fullWidth
                  color="default"
                  variant="bordered"
                  isDisabled={isSubmitting}
                  onPress={onClose}
                >
                  Go back
                </Button>

                <Button
                  fullWidth
                  type="submit"
                  form="reset-pwd"
                  color="primary"
                  isDisabled={isSubmitting}
                  isLoading={isSubmitting}
                  onPress={resetPassword}
                >
                  Submit
                </Button>
              </ModalFooter>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </Fragment>
  );
};

export default ResetPassword;
