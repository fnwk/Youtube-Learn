import { useState } from "react";
import { Pressable, View, PressableProps } from "react-native";
import { Icon, IconType } from "@/assets/Icon";
import cn from "@/utils/cn";

interface IconButtonProps extends PressableProps {
  iconName: IconType;
  withBackground?: boolean;
  size?: number; // optional icon size
}

const IconButton = ({
  iconName,
  withBackground = false,
  size = 24,
  style,
  className = "",
  ...props
}: IconButtonProps) => {
  const [pressed, setPressed] = useState(false);

  return (
    <Pressable
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      className={cn(
        "rounded-full p-2",
        withBackground
          ? "bg-black/25"
          : pressed
            ? "bg-black/25"
            : "bg-transparent",
        className,
      )}
      style={style}
      {...props}
    >
      <Icon name={iconName} width={size} height={size} />
    </Pressable>
  );
};

export default IconButton;
