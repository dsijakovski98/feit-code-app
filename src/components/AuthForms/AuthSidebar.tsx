import AuthLink from "@/components/AuthForms/AuthLink";

import { ROUTES } from "@/constants/routes";

export type AuthLinkType = {
  href: string;
  children?: AuthLinkType[];
};

const AUTH_LINKS: AuthLinkType[] = [
  { href: ROUTES.signIn, children: [{ href: ROUTES.forgotPassword }] },
  { href: ROUTES.signUp },
];

type Props = {
  activeLink: (typeof ROUTES)["signIn" | "signUp" | "forgotPassword"];
};

const AuthSidebar = ({ activeLink }: Props) => {
  return (
    <div className="space-y-2 border-r border-r-content2 bg-background px-3 pb-5 pt-4 md:hidden">
      <p className="font-bold">FEIT Code</p>

      <ul className="space-y-2 text-sm">
        {AUTH_LINKS.map((authLink) => (
          <AuthLink key={authLink.href} authLink={authLink} activeLink={activeLink} />
        ))}
      </ul>
    </div>
  );
};

export default AuthSidebar;
