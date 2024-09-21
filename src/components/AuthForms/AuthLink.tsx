import { Link } from "react-router-dom";

import clsx from "clsx";

import { AuthLinkType } from "@/components/AuthForms/AuthSidebar";
import Icon from "@/components/ui/Icon";

type Props = {
  authLink: AuthLinkType;
  activeLink: string;
};

const AuthLink = ({ authLink, activeLink }: Props) => {
  const { href, children } = authLink;

  return (
    <li key={href} className="space-y-2">
      <div className="flex items-center gap-2">
        <Link
          className={clsx("transition-colors lg:text-[13px]", {
            "focus-within:text-primary-700 hover:text-primary-700": href !== activeLink,
            "!font-bold text-primary-500 underline": href === activeLink,
          })}
          to={href}
        >
          <Icon name="html" className="mr-2 inline-block h-3.5 w-3.5" />
          {href.slice(1).toLowerCase()}.html
        </Link>
      </div>

      {children && (
        <ul className="ml-4">
          {children &&
            children.map((childLink) => (
              <AuthLink key={childLink.href} authLink={childLink} activeLink={activeLink} />
            ))}
        </ul>
      )}
    </li>
  );
};

export default AuthLink;
