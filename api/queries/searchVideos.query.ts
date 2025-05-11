import { useInfiniteQuery } from "@tanstack/react-query";
import type { YoutubeSearchResponse } from "@/types/youtube";
import { searchVideos } from "../requests/youtube.api";

export const useSearchVideos = (
  searchTerm: string,
  sort: "date" | "viewCount",
) =>
  useInfiniteQuery<YoutubeSearchResponse, Error>({
    queryKey: ["videos", "search", searchTerm, sort],
    queryFn: async ({ pageParam }) => {
      return searchVideos({
        query: searchTerm,
        sort,
        pageToken: pageParam,
      });
    },
    enabled: !!searchTerm,
    getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    staleTime: 1000 * 60 * 15,
    initialPageParam: "",
  });
