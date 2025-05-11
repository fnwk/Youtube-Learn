import { useInfiniteQuery } from "@tanstack/react-query";
import type { YoutubeSearchResponse } from "@/types/youtube";
import { searchVideos } from "../requests/youtube.api";

export const useCategoryVideos = (
  category: string,
  sort: "date" | "viewCount",
) =>
  useInfiniteQuery<YoutubeSearchResponse, Error>({
    queryKey: ["videos", "category", category, sort],
    queryFn: async ({ pageParam }) => {
      return searchVideos({
        query: category + " tutorial",
        sort,
        pageToken: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageToken ?? undefined;
    },
    staleTime: 1000 * 60 * 5,
    initialPageParam: "",
  });
