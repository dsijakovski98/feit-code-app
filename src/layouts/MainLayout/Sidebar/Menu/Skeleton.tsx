import { Fragment } from "react/jsx-runtime";

import SidebarItem from "@/layouts/MainLayout/Sidebar/SidebarItem";

const items = [1, 2, 3];

const SidebarMenuSkeleton = () => {
  return (
    <Fragment>
      <ul className="mb-auto space-y-8">
        {items.map((item) => (
          <SidebarItem key={item} isSkeleton />
        ))}
      </ul>
      <ul className="space-y-6">
        {items.slice(1).map((item) => (
          <SidebarItem key={item + items.length} isSkeleton />
        ))}
      </ul>
    </Fragment>
  );
};

export default SidebarMenuSkeleton;
