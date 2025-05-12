import { PressableProps, ViewStyle, StyleProp, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Icon, IconType } from "@/assets/Icon";
import cn from "@/utils/cn";

/**
 * Animated icon button with optional background and press scaling effect
 * @param iconName - Name of the icon from the custom Icon set
 * @param withBackground - Whether to show a semi-transparent background behind the icon
 * @param size - Size of the icon (width and height)
 * @param style - Additional style for the pressable container
 * @param className - Tailwind className override
 * @param ...props - Additional Pressable props passed to the component
 */

const AnimatedPressable = Animated.createAnimatedComponent(
  Pressable,
) as React.ComponentType<PressableProps>;

interface IconButtonProps extends PressableProps {
  iconName: IconType;
  withBackground?: boolean;
  size?: number;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

const IconButton = ({
  iconName,
  withBackground = false,
  size = 24,
  style,
  className = "",
  ...props
}: IconButtonProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withTiming(0.9, { duration: 100 });
  };

  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      className={cn(
        "rounded-full p-2",

        className,
      )}
      style={[
        animatedStyle,
        style,
        { backgroundColor: withBackground ? "#00000050" : "" },
      ]}
      {...props}
    >
      <Icon name={iconName} width={size} height={size} />
    </AnimatedPressable>
  );
};

export default IconButton;
