import { useEffect, useState } from "react";
import { View, FlatList } from "react-native";
import { useSearchVideos } from "@/api/queries/searchVideos.query";
import { useLocalSearchParams } from "expo-router";
import { VideoCard } from "@/components/video";
import Header from "@/components/search/Header";
import type { YoutubeVideo } from "@/types/youtube";
import { useDebounce } from "@/utils/hooks/useDebounce";

const Search = () => {
  const { searchTerm, focused } = useLocalSearchParams();
  const [input, setInput] = useState(
    typeof searchTerm === "string" ? searchTerm : searchTerm?.[0] || "",
  );

  const debouncedQuery = useDebounce(input, 600);
  const { data, fetchNextPage, isFetchingNextPage } = useSearchVideos(
    debouncedQuery,
    "viewCount",
  );

  const videos: YoutubeVideo[] =
    data?.pages.flatMap((page) => page.items as YoutubeVideo[]) || [];

  useEffect(() => {
    setInput(
      typeof searchTerm === "string" ? searchTerm : searchTerm?.[0] || "",
    );
  }, [searchTerm]);

  return (
    <View className="flex-1 pt-5">
      <Header
        inputFocused={focused === "1"}
        searchTerm={input}
        setSearchTerm={setInput}
        totalResults={data?.pages[0].pageInfo?.totalResults ?? 0}
      />
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        onEndReached={() => fetchNextPage()}
        onEndReachedThreshold={0.4}
        contentContainerStyle={{ paddingBottom: 32 }}
        renderItem={({ item }) => (
          <View className="mb-6">
            <VideoCard video={item} variant="large" />
          </View>
        )}
      />
    </View>
  );
};

export default Search;
