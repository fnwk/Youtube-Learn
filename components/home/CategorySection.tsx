import { useT } from "@/i18n/useTranslation";
import { StyledText } from "../ui";
import { VideoCard } from "../video";
import { View, FlatList } from "react-native";
import { useSearchVideos } from "@/api/queries/searchVideos.query";
import { router } from "expo-router";
import type { YoutubeVideo } from "@/types/youtube";
import SkeletonContainer from "../ui/SkeletonContainer";

interface CategorySectionProps {
  title: string;
}

const CategorySection = ({ title }: CategorySectionProps) => {
  const { t } = useT("home");
  const { data, isFetching, isLoading, fetchNextPage } = useSearchVideos(
    `"${title.toLowerCase().trim()}" tutorial`,
    "viewCount",
  );

  const showMore = () => {
    router.push({ pathname: "/search", params: { searchTerm: title } });
  };

  // Remove duplicates from the videos array (if any), flatten the pages, and map to unique video IDs
  const videos: YoutubeVideo[] = Array.from(
    new Map(
      (data?.pages.flatMap((page) => page.items as YoutubeVideo[]) || []).map(
        (video) => [video.id.videoId, video],
      ),
    ).values(),
  );

  if (isLoading || isFetching) {
    console.log(title, isLoading, isFetching);
  }

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
        ListFooterComponent={
          isFetching || isLoading ? (
            <View className="flex-row">
              {new Array(10).fill(null).map((_, idx) => (
                <View className="mr-8" key={idx}>
                  <SkeletonContainer loading>
                    <View
                      className="rounded-2xl bg-dark w-[180px]"
                      style={{ height: 112 }}
                    />
                  </SkeletonContainer>
                </View>
              ))}
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default CategorySection;
