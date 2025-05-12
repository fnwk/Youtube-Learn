import { useInfiniteQuery } from "@tanstack/react-query";
import type { YoutubeSearchResponse } from "@/types/youtube";
import { searchVideos } from "../requests/searchDetails.req";

/**
 * Custom React Query hook for infinite scrolling YouTube video search
 * @param searchTerm - The search query string for finding YouTube videos
 * @param sort - How to sort the results, either by "date" (newest first) or "viewCount" (most viewed first)
 * @returns React Query's useInfiniteQuery result object containing search data and helper functions
 */

export const useSearchVideos = (
  searchTerm: string,
  sort: "date" | "viewCount" | "relevance",
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
