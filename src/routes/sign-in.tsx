import AuthPageWindow from "@/layouts/AuthPageWindow";

const SignInPage = () => {
  return (
    <AuthPageWindow
      title="Sign in"
      heading={<h1 className="text-5xl font-semibold">Welcome back!</h1>}
    >
      Sign in form here
    </AuthPageWindow>
  );
};

export default SignInPage;
