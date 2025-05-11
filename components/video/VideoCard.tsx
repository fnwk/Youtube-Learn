import { View, Image } from "react-native";
import { cva } from "class-variance-authority";
import { StyledText } from "@/components/ui";
import type { YoutubeVideo } from "@/types/youtube";

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

  return (
    <View className={thumbnailVariants({ variant })}>
      <Image
        source={{ uri: thumbnail }}
        className="rounded-2xl bg-dark w-full"
        style={{
          height: variant === "small" ? 112 : 225,
        }}
      />

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
