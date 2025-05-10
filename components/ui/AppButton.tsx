import { Pressable, PressableProps } from "react-native";
import StyledText from "./StyledText";
import cn from "../../utils/cn";

interface ButtonProps extends PressableProps {
  title: string;
  className?: string;
  textClassName?: string;
}

const AppButton = ({
  title,
  className,
  textClassName,
  ...props
}: ButtonProps) => {
  return (
    <Pressable
      className={cn(
        "w-full bg-dark rounded-xl py-4 items-center justify-center",
        className,
      )}
      {...props}
    >
      <StyledText
        size="xl"
        weight="semibold"
        color="white"
        className={textClassName}
      >
        {title}
      </StyledText>
    </Pressable>
  );
};

export default AppButton;
