import { PropsWithChildren, useEffect, useState } from "react";
import { LayoutRectangle, StyleSheet, View } from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

interface SkeletonContainerProps extends PropsWithChildren {
  loading?: boolean;
}

const SkeletonContainer = ({
  loading = true,
  children,
}: SkeletonContainerProps) => {
  const [layout, setLayout] = useState<LayoutRectangle>();
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = withRepeat(withTiming(1, { duration: 500 }), Infinity);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          translateX.value,
          [0, 1],
          layout ? [-layout.width, layout.width] : [0, 0],
        ),
      },
    ],
  }));

  if (!loading) {
    return <>{children}</>;
  }

  if (!layout) {
    return (
      <View onLayout={(event) => setLayout(event.nativeEvent.layout)}>
        {children}
      </View>
    );
  }

  return (
    <MaskedView
      maskElement={<View className={"flex-1"}>{children}</View>}
      style={{ width: layout.width, height: layout.height }}
    >
      <View className={"flex-1 flex-grow overflow-hidden bg-white"} />
      <Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={StyleSheet.absoluteFill}
              colors={["transparent", "black", "transparent"]}
            />
          }
        >
          <View className={"flex-1 flex-grow overflow-hidden bg-gray"} />
        </MaskedView>
      </Animated.View>
    </MaskedView>
  );
};

export default SkeletonContainer;
