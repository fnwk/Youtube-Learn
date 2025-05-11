import { apiClient } from "../api.config";
import type { YoutubeSearchResponse } from "@/types/youtube";

interface SearchParams {
  query: string;
  sort: "date" | "viewCount";
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
    console.log("test", process.env.API_KEY, process.env.API_URL);

    // Make the API request
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

    console.log("data", data);
    return data;
  } catch (error) {
    // Log any errors that occur during the API request
    console.error("Error fetching videos:", error);

    // Optionally, return a fallback value or rethrow the error
    throw new Error("Failed to fetch videos");
  }
};
