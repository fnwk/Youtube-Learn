import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { StyledText } from "@/components/ui";
import VideoPlayer from "@/components/video/player/VideoPlayer";
import { Icon } from "@/assets/Icon";
import { useVideoDetails } from "@/api/queries/videoDetails.query";
import { useLocalSearchParams } from "expo-router";
import { tailwindColors } from "@/utils/colors";
import { useT } from "@/i18n/useTranslation";
import StatisticsItem from "@/components/video/StatisticsItem";
import TabbedContent from "@/components/video/TabbedContent";

/**
 * Video screen component that displays a YouTube video with its details
 */

const VideoScreen = () => {
  const { id: videoId } = useLocalSearchParams();
  const { t } = useT("video");
  const { videoDetails, isLoading, isError } = useVideoDetails(
    typeof videoId === "string" ? videoId : "",
  );
  const [currentTime, setCurrentTime] = useState(0);

  if (isLoading || !videoId) {
    return (
      <View className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color={tailwindColors.dark} />
      </View>
    );
  }

  if (
    isError ||
    !videoDetails ||
    !videoDetails.snippet ||
    !videoDetails.statistics
  ) {
    return (
      <View className="flex-1 bg-white justify-center items-center p-4">
        <StyledText size="lg" weight="semibold" className="mt-2 text-center">
          Failed to load video details
        </StyledText>
      </View>
    );
  }
  const {
    snippet: { title, channelTitle, description },
    statistics: { viewCount, likeCount },
  } = videoDetails;

  return (
    <View className="flex-1 bg-white ">
      <VideoPlayer setCurrentTime={setCurrentTime} />
      <View className="p-6 flex-1">
        <StyledText
          size="2xl"
          weight="semibold"
          className="width"
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          {title}
        </StyledText>

        <View className="flex-row mt-4 items-center">
          <View className="bg-dark w-12 h-12 rounded-full items-center justify-center">
            <Icon name="person" width={16} height={16} />
          </View>
          <StyledText size="lg" weight="bold" className="ml-3">
            {channelTitle}
          </StyledText>
        </View>

        <TabbedContent
          description={description}
          videoId={typeof videoId === "string" ? videoId : videoId[0]}
          currentTime={currentTime}
          viewCount={viewCount}
          likeCount={likeCount}
        />
      </View>
    </View>
  );
};

export default VideoScreen;
