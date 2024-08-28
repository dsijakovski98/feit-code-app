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
    <div className="space-y-2 border-r border-r-content2 bg-background px-3 pb-5 pt-4 font-mono md:hidden">
      <p className="font-bold">FEIT Code</p>

      <ul className="space-y-2 pl-4 text-sm">
        {AUTH_LINKS.map((authLink) => (
          <li key={authLink} className="flex items-center gap-2">
            <Link
              className={clsx("font-light transition-colors", {
                "focus-within:text-primary-700 hover:text-primary-700": authLink !== activeLink,
                "!font-bold text-primary-500 underline": authLink === activeLink,
              })}
              to={authLink}
            >
              <Icon name="html" className="mr-2 inline-block h-3.5 w-3.5" />
              {authLink.slice(1).toLowerCase()}.html
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthSidebar;
