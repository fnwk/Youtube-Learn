import { useQuery } from "@tanstack/react-query";
import { getVideoDetails } from "../requests/videoDetails.req"; // Adjust import path as needed
import { YoutubeVideoItem, YoutubeVideoResponse } from "@/types/youtube";

interface UseVideoDetailsResult {
  videoDetails: YoutubeVideoItem | null;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
  refetch: () => Promise<void>;
}

/**
 * React Query hook for fetching YouTube video details
 * @param videoId The YouTube video ID
 * @param enabled Whether the query should auto-fetch (defaults to true)
 * @returns Object containing video details and status
 */

export const useVideoDetails = (
  videoId: string,
  enabled: boolean = true,
): UseVideoDetailsResult => {
  const { data, isLoading, isError, error, refetch } = useQuery<
    YoutubeVideoResponse,
    Error
  >({
    queryKey: ["videoDetails", videoId],
    queryFn: () => getVideoDetails({ id: videoId }),
    enabled: !!videoId && enabled,
    staleTime: 5 * 60 * 1000,
  });

  const videoDetails = data?.items?.[0] || null;

  const refetchWrapper = async (): Promise<void> => {
    await refetch();
  };

  return {
    videoDetails,
    isLoading,
    isError,
    error,
    refetch: refetchWrapper,
  };
};
