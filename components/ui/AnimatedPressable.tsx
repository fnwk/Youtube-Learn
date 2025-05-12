import { GestureResponderEvent, Text } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TapGestureHandler } from "react-native-gesture-handler";

/**
 * Custom animated pressable component using React Native Reanimated and NativeWind
 * @param onPress - Callback triggered when the component is pressed
 * @param children - Optional child elements to render inside the pressable area
 * @param className - Tailwind (NativeWind) className string for styling the component
 * @returns A stylable animated pressable component with a scale-down press animation
 */

type Props = {
  onPress?: ((event: GestureResponderEvent) => void) | null;
  children?: React.ReactNode;
  className?: string;
};

const AnimatedPressable: React.FC<Props> = ({
  onPress,
  children,
  className = "bg-blue-500 rounded-xl p-4",
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 10 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 10 });
  };

  const handleGestureEvent = (event: GestureResponderEvent) => {
    onPress?.(event);
  };

  return (
    <TapGestureHandler
      onBegan={handlePressIn}
      onEnded={(event) => {
        handlePressOut();
        handleGestureEvent(event.nativeEvent as any);
      }}
      onCancelled={handlePressOut}
      onFailed={handlePressOut}
    >
      <Animated.View style={animatedStyle} className={className}>
        {children ?? (
          <Text className="text-white font-semibold text-center">Press Me</Text>
        )}
      </Animated.View>
    </TapGestureHandler>
  );
};

export default AnimatedPressable;
