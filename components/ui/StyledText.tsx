import { Text, TextProps as RNTextProps } from "react-native";
import { cva } from "class-variance-authority";
import cn from "@/utils/cn";

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
      false: "",
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
  size = "base",
  weight = "normal",
  underline = false,
  color = "dark",
  className = "",
  children,
  style,
  ...props
}: StyledTextProps) => {
  const textClassNames = textVariants({ size, underline, color });

  return (
    <Text
      className={cn(textClassNames, className)}
      style={[{ fontFamily: fontMap[weight] }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};

export default StyledText;
