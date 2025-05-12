import { Text, TextProps as RNTextProps } from "react-native";
import { cva } from "class-variance-authority";
import cn from "@/utils/cn";
import AnimatedPressable from "./AnimatedPressable";

/**
 * Custom styled text component using NativeWind with optional animation on press
 * @param size - Tailwind font size variant
 * @param weight - Font weight (mapped to custom font family)
 * @param underline - Whether text should be underlined
 * @param color - Text color ("white" or "dark")
 * @param className - Tailwind className override
 * @param onPress - If provided, wraps text in AnimatedPressable with press animation
 */

type FontSize = "sm" | "base" | "md" | "lg" | "xl" | "2xl" | "3xl";
type FontWeight = "normal" | "medium" | "semibold" | "bold";
type FontColor = "white" | "dark";

interface StyledTextProps extends RNTextProps {
  size?: FontSize;
  weight?: FontWeight;
  underline?: boolean;
  color?: FontColor;
  className?: string;
  children?: React.ReactNode;
  pressableClassName?: string;
  onPress?: () => void;
}

const fontMap: Record<FontWeight, string> = {
  normal: "Poppins_400Regular",
  medium: "Poppins_500Medium",
  semibold: "Poppins_600SemiBold",
  bold: "Poppins_700Bold",
};

const textVariants = cva("", {
  variants: {
    size: {
      sm: "text-[10px]",
      base: "text-[12px]",
      md: "text-[13px]",
      lg: "text-[14px]",
      xl: "text-[16px]",
      "2xl": "text-[18px]",
      "3xl": "text-[22px]",
    },
    underline: {
      true: "underline",
    },
    color: {
      white: "text-white",
      dark: "text-dark",
    },
  },
  defaultVariants: {
    size: "base",
    underline: false,
    color: "dark",
  },
});

const StyledText = ({
  size,
  weight = "normal",
  underline,
  color,
  className,
  children,
  style,
  pressableClassName,
  onPress,
  ...props
}: StyledTextProps) => {
  const composedClassName = cn(
    textVariants({ size, underline, color }),
    className,
  );

  const textStyles = [{ fontFamily: fontMap[weight] }, style];

  const TextComponent = (
    <Text className={composedClassName} style={textStyles} {...props}>
      {children}
    </Text>
  );

  return onPress ? (
    <AnimatedPressable onPress={onPress} className={pressableClassName}>
      {TextComponent}
    </AnimatedPressable>
  ) : (
    TextComponent
  );
};

export default StyledText;
