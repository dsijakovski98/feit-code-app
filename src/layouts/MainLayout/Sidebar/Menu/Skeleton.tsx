import SidebarItem from "@/layouts/MainLayout/Sidebar/SidebarItem";

const items = [1, 2, 3];

const SidebarMenuSkeleton = () => {
  return (
    <ul className="space-y-8 pt-3 lg:flex lg:w-full lg:items-center lg:justify-evenly lg:space-y-0 lg:self-center lg:pt-0">
      {items.map((item) => (
        <SidebarItem key={item} isSkeleton />
      ))}
    </ul>
  );
};

export default SidebarMenuSkeleton;
