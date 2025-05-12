import { SortingOption } from "@/types/sorting";
import { apiClient } from "../api.config";
import type {
  YoutubeSearchResponse,
  YoutubeVideoDetailsResponse,
} from "@/types/youtube";

interface SearchParams {
  query: string;
  sort: SortingOption;
  pageToken?: string | unknown;
  maxResults?: number;
}

export const searchVideos = async ({
  query,
  sort,
  pageToken = "",
  maxResults = 10,
}: SearchParams): Promise<YoutubeSearchResponse> => {
  try {
    const { data } = await apiClient.get<YoutubeSearchResponse>("/search", {
      params: {
        part: "snippet",
        q: query,
        type: "video",
        order: sort,
        maxResults,
        pageToken,
        key: process.env.EXPO_PUBLIC_API_KEY, // Make sure this is set
      },
    });

    return data;
  } catch (error) {
    throw new Error("Failed to fetch videos");
  }
};

export const getVideoDetails = async (
  videoId: string,
): Promise<YoutubeVideoDetailsResponse> => {
  try {
    const { data } = await apiClient.get<YoutubeVideoDetailsResponse>(
      "/videos",
      {
        params: {
          part: "snippet,statistics",
          id: videoId,
          key: process.env.EXPO_PUBLIC_API_KEY,
        },
      },
    );

    return data;
  } catch (error) {
    throw new Error("Failed to fetch video details");
  }
};
