import { View, Image } from "react-native";
import { cva } from "class-variance-authority";
import { StyledText } from "@/components/ui";
import { VideoCardData } from "@/types/video";

type Variant = "small" | "large";

interface VideoCardProps
  extends Pick<
    VideoCardData,
    "thumbnail" | "title" | "uploadDate" | "channelName"
  > {
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

const VideoCard = ({
  thumbnail,
  title,
  uploadDate,
  channelName,
  variant = "small",
}: VideoCardProps) => {
  return (
    <View className={thumbnailVariants({ variant })}>
      <Image
        source={{ uri: thumbnail }}
        className="rounded-2xl bg-dark w-full"
        style={{
          height: variant === "small" ? 112 : 225,
        }}
      />

      {variant === "large" && channelName && (
        <StyledText weight="bold" className="mt-2">
          {channelName}
        </StyledText>
      )}

      <View className="mt-1">
        <StyledText
          numberOfLines={2}
          ellipsizeMode="tail"
          size={variant === "large" ? "lg" : undefined}
          weight={variant === "small" ? "medium" : undefined}
        >
          {title}
        </StyledText>
        <StyledText size="sm" className="text-muted mt-1 text-right">
          {uploadDate}
        </StyledText>
      </View>
    </View>
  );
};

export default VideoCard;
