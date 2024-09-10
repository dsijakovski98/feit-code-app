import { useTheme } from "next-themes";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";

type Props = {
  size?: "sm" | "md";
};

const ThemeSwitcher = ({ size = "md" }: Props) => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      isIconOnly
      onPress={toggleTheme}
      size={size}
      radius="full"
      variant="light"
      color="default"
      className="p-1.5"
    >
      <Icon name={theme === "dark" ? "moon" : "sun"} />
    </Button>
  );
};

export default ThemeSwitcher;
