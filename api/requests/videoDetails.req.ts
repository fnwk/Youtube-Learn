import { apiClient } from "../api.config";
import { YoutubeVideoResponse } from "@/types/youtube";

interface VideoDetailsParams {
  id: string;
}

export const getVideoDetails = async ({
  id,
}: VideoDetailsParams): Promise<YoutubeVideoResponse> => {
  try {
    const { data } = await apiClient.get<YoutubeVideoResponse>("/videos", {
      params: {
        part: "snippet,statistics",
        id: id,
        key: process.env.EXPO_PUBLIC_API_KEY,
      },
    });
    return data;
  } catch (error) {
    throw new Error("Failed to fetch video details");
  }
};
