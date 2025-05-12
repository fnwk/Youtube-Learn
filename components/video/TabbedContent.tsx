import cn from "@/utils/cn";
import { Pressable, ScrollView, View } from "react-native";
import { StyledText } from "../ui";
import { useT } from "@/i18n/useTranslation";
import { useState } from "react";
import Notes from "./Notes";
import StatisticsItem from "./StatisticsItem";

/**
 * Tabbed content component displaying description, statistics, and notes
 * @param description - The description of the video
 * @param currentTime - The current playback time of the video
 * @param videoId - The ID of the video for associating notes
 * @param viewCount - The number of views for the video
 * @param likeCount - The number of likes for the video
 */

interface TabProps {
  title: string;
  isActive: boolean;
  onPress: () => void;
}

interface TabbedContentProps {
  description: string;
  currentTime: number;
  videoId: string;
  viewCount: number;
  likeCount: number;
}

const Tab = ({ title, isActive, onPress }: TabProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "border-b-2 w-1/2",
        isActive ? "border-b-dark" : "border-b-gray",
      )}
    >
      <StyledText weight="semibold" className="w-full text-center py-2">
        {title}
      </StyledText>
    </Pressable>
  );
};

const TabbedContent = ({
  description,
  currentTime,
  videoId,
  viewCount,
  likeCount,
}: TabbedContentProps) => {
  const { t } = useT("video");

  const [activeTab, setActiveTab] = useState(0);

  return (
    <View className="flex-1">
      <View className="flex-row">
        <Tab
          title={t("description")}
          isActive={activeTab === 0}
          onPress={() => setActiveTab(0)}
        />
        <Tab
          title={t("notes")}
          isActive={activeTab === 1}
          onPress={() => setActiveTab(1)}
        />
      </View>
      {activeTab === 0 ? (
        <ScrollView className="flex-1">
          <StyledText className="p-4">{description}</StyledText>
          <StyledText size="sm" weight="semibold" className="mt-4">
            {t("stats")}
          </StyledText>
          <View className="flex-row mt-3 justify-between pb-10">
            <StatisticsItem
              value={t("views", { count: viewCount })}
              iconName="views"
            />
            <StatisticsItem
              value={t("views", { count: likeCount })}
              iconName="likes"
            />
          </View>
        </ScrollView>
      ) : (
        <Notes currentTime={currentTime} videoId={videoId} />
      )}
    </View>
  );
};

export default TabbedContent;
