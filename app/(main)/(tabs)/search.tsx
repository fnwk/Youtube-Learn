import { useEffect, useState } from "react";
import { View, FlatList, RefreshControl } from "react-native";
import { useSearchVideos } from "@/api/queries/searchVideos.query";
import { useLocalSearchParams } from "expo-router";
import { VideoCard } from "@/components/video";
import Header from "@/components/search/Header";
import type { YoutubeVideo } from "@/types/youtube";
import { useDebounce } from "@/utils/hooks/useDebounce";
import { SortingOption } from "@/types/sorting";
import SkeletonContainer from "@/components/ui/SkeletonContainer";
import { StyledText } from "@/components/ui";
import { useT } from "@/i18n/useTranslation";

const Search = () => {
  const { t } = useT("common");
  const { searchTerm, focused } = useLocalSearchParams();
  const [input, setInput] = useState(
    typeof searchTerm === "string" ? searchTerm : searchTerm?.[0] || "",
  );
  const [sortingOption, setSortingOption] =
    useState<SortingOption>("viewCount");

  const debouncedQuery = useDebounce(input, 600);
  const { data, fetchNextPage, isFetching, isLoading, isError, refetch } =
    useSearchVideos(debouncedQuery, sortingOption);

  // Remove duplicates from the videos array (if any), flatten the pages, and map to unique video IDs
  const videos: YoutubeVideo[] = Array.from(
    new Map(
      (data?.pages.flatMap((page) => page.items as YoutubeVideo[]) || []).map(
        (video) => [video.id.videoId, video],
      ),
    ).values(),
  );

  useEffect(() => {
    setInput(
      typeof searchTerm === "string" ? searchTerm : searchTerm?.[0] || "",
    );
  }, [searchTerm]);

  const showLoading = isFetching || isLoading || input !== debouncedQuery;

  return (
    <View className="flex-1 pt-5">
      <Header
        inputFocused={focused === "1"}
        searchTerm={input}
        totalResults={data?.pages[0].pageInfo?.totalResults ?? 0}
        sortingOption={sortingOption}
        setSearchTerm={setInput}
        setSortingOption={setSortingOption}
      />
      <FlatList
        data={input !== debouncedQuery ? [] : videos}
        keyExtractor={(item) => item.id.videoId}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.4}
        contentContainerStyle={{ paddingBottom: 32 }}
        renderItem={({ item }) => (
          <View className="mb-6">
            <VideoCard video={item} variant="large" />
          </View>
        )}
        ListEmptyComponent={() => (
          <View>
            {showLoading ? null : (
              <StyledText
                size="lg"
                weight="semibold"
                className="w-full text-center mb-6"
              >
                {t("notFound")}
              </StyledText>
            )}
          </View>
        )}
        ListFooterComponent={
          showLoading && !isError ? (
            <>
              {new Array(10).fill(null).map((_, idx) => (
                <View className="px-8" key={idx}>
                  <SkeletonContainer loading>
                    <View
                      className="rounded-2xl bg-white w-full mb-6"
                      style={{
                        height: 225,
                      }}
                    />
                  </SkeletonContainer>
                </View>
              ))}
            </>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
