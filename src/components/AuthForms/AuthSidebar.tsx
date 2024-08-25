import { Link } from "react-router-dom";

import clsx from "clsx";

import Icon from "@/components/ui/Icon";

import { ROUTES } from "@/constants/routes";

type Props = {
  activeLink: (typeof ROUTES)["signIn" | "signUp"];
};

const AUTH_LINKS = [ROUTES.signIn, ROUTES.signUp];

const AuthSidebar = ({ activeLink }: Props) => {
  return (
    <div className="max-w-[180px] grow space-y-1.5 border-r border-r-content2 bg-background px-3 pt-4 font-mono md:hidden">
      <Link to={ROUTES.home} className="font-bold">
        FEIT Code
      </Link>

      <ul className="space-y-1 pl-4 text-sm">
        {AUTH_LINKS.map((authLink) => (
          <li key={authLink} className="flex items-center gap-2">
            <Icon name="html" className="h-3.5 w-3.5" />

            <Link
              className={clsx(
                "transition-colors focus-within:text-primary-600 hover:text-primary-600",
                {
                  "font-bold text-primary-700 underline": authLink === activeLink,
                },
              )}
              to={authLink}
            >
              {authLink.slice(1).toLowerCase()}.html
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthSidebar;
