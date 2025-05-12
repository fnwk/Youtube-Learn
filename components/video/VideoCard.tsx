import { View, Image, Pressable } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { cva } from "class-variance-authority";
import { StyledText } from "@/components/ui";
import type { YoutubeVideo } from "@/types/youtube";
import { router } from "expo-router";

/**
 * Video card component displaying a thumbnail, title, and channel information
 * @param video - YouTube video object containing metadata like title, channel, and thumbnails
 * @param variant - Layout variant for the card ("small" or "large")
 */

type Variant = "small" | "large";

interface VideoCardProps {
  video: YoutubeVideo;
  variant?: Variant;
}

const thumbnailVariants = cva("rounded-2xl", {
  variants: {
    variant: {
      small: "w-[180px]",
      large: "w-full px-8 mb-10",
    },
  },
  defaultVariants: {
    variant: "small",
  },
});

const VideoCard = ({ video, variant = "small" }: VideoCardProps) => {
  const { snippet } = video;
  const thumbnail =
    snippet.thumbnails.medium?.url || snippet.thumbnails.default?.url;

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.95, { damping: 10, stiffness: 200 });
  };

  const onPressOut = () => {
    scale.value = withSpring(1, { damping: 10, stiffness: 200 });
    router.push({ pathname: "/video/[id]", params: { id: video.id.videoId } });
  };

  return (
    <View className={thumbnailVariants({ variant })}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        unstable_pressDelay={500}
      >
        <Animated.View style={animatedStyle}>
          <Image
            source={{ uri: thumbnail }}
            className="rounded-2xl w-full"
            style={{
              height: variant === "small" ? 112 : 225,
            }}
          />
        </Animated.View>
      </Pressable>

      {variant === "large" && snippet.channelTitle && (
        <StyledText weight="bold" className="mt-2">
          {snippet.channelTitle}
        </StyledText>
      )}

      <View className="mt-1">
        <StyledText
          numberOfLines={2}
          ellipsizeMode="tail"
          size={variant === "large" ? "lg" : undefined}
          weight={variant === "small" ? "medium" : undefined}
        >
          {snippet.title}
        </StyledText>
        <StyledText size="sm" className="text-muted mt-1 text-right">
          {new Date(snippet.publishedAt).toLocaleDateString("pl-PL")}
        </StyledText>
      </View>
    </View>
  );
};

export default VideoCard;
