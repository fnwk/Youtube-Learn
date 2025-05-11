import { useT } from "@/i18n/useTranslation";
import { StyledText } from "../ui";
import { VideoCard } from "../video";
import { View, FlatList } from "react-native";
import { useSearchVideos } from "@/api/queries/searchVideos.query";
import { router } from "expo-router";
import type { YoutubeVideo } from "@/types/youtube";

interface CategorySectionProps {
  title: string;
}

const CategorySection = ({ title }: CategorySectionProps) => {
  const { t } = useT("home");
  const { data, fetchNextPage } = useSearchVideos(
    `"${title.toLowerCase().trim()}" tutorial`,
    "viewCount",
  );

  const showMore = () => {
    router.push({ pathname: "/search", params: { searchTerm: title } });
  };

  const videos: YoutubeVideo[] =
    data?.pages.flatMap((page) => page.items as YoutubeVideo[]) || [];

  return (
    <View className="border-b-dark border-b-2 mt-4 pb-8">
      <View className="flex-row items-center justify-between pb-6 px-8">
        <StyledText size="2xl" weight="semibold">
          {title}
        </StyledText>
        <StyledText underline onPress={showMore}>
          {t("showMore")}
        </StyledText>
      </View>

      <FlatList
        data={videos}
        horizontal
        keyExtractor={(item) => item.id.videoId}
        showsHorizontalScrollIndicator={false}
        onEndReached={() => fetchNextPage()}
        contentContainerStyle={{
          marginLeft: 32,
          flexDirection: "row",
        }}
        renderItem={({ item }) => (
          <View className="mr-4">
            <VideoCard video={item} variant="small" />
          </View>
        )}
      />
    </View>
  );
};

export default CategorySection;
