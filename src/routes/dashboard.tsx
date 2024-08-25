import { useAuth } from "@clerk/clerk-react";

import Button from "@/components/ui/Button";

import { ROUTES } from "@/constants/routes";

const Dashboard = () => {
  const { signOut } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <Button onClick={() => signOut({ redirectUrl: ROUTES.signIn })}>Sign Out</Button>
    </div>
  );
};

export default Dashboard;
