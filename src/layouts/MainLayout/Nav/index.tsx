import { useMemo } from "react";

import UserAvatar from "@/layouts/MainLayout/Nav/UserAvatar";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

const Nav = () => {
  const timestamp = useMemo(() => {
    const [day, ...date] = new Intl.DateTimeFormat(undefined, {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    })
      .format(Date.now())
      .split(" ");

    return `${day}, ${date.join(" ")}`;
  }, []);

  return (
    <header className="bg-gradient-to-r from-transparent to-primary-200 p-8 pb-36 font-quicksand">
      <nav className="flex items-center justify-between">
        <time>{timestamp}</time>

        <div className="flex items-center gap-5">
          <div className="space-x-1">
            {/* TODO: Theme switching */}
            <Button isIconOnly radius="full" variant="light" color="default" className="p-1.5">
              <Icon name="moon" />
            </Button>

            {/* TODO: Notifications system */}
            <Button isIconOnly radius="full" variant="light" color="default" className="p-1">
              <Icon name="bell" />
            </Button>
          </div>

          <UserAvatar />
        </div>
      </nav>
    </header>
  );
};

export default Nav;
