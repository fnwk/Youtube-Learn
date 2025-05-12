import { PressableProps } from "react-native";
import StyledText from "./StyledText";
import cn from "../../utils/cn";
import AnimatedPressable from "./AnimatedPressable";

/**
 * Custom button component that displays a title text inside an animated pressable container
 * @param title - The text displayed inside the button
 * @param className - Tailwind (NativeWind) className string for styling the button container
 * @param textClassName - Tailwind (NativeWind) className string for styling the text
 * @param ...props - Other props (e.g., onPress) passed down to the `AnimatedPressable` component
 * @returns A stylable button that animates on press using `AnimatedPressable`
 */

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
    <AnimatedPressable
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
    </AnimatedPressable>
  );
};

export default AppButton;
