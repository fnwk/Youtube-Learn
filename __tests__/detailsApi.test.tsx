import { apiClient } from "@/api/api.config";
import { getVideoDetails } from "@/api/requests/videoDetails.req";
import { YoutubeVideoResponse } from "@/types/youtube";

/**
 * Tests for getVideoDetails function:
 * - Verifies successful API response handling
 * - Verifies error handling when API call fails
 */

jest.mock("@/api/api.config", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe("getVideoDetails", () => {
  const mockId = "test-video-id";
  const mockResponse: YoutubeVideoResponse = {
    kind: "youtube#videoListResponse",
    etag: "etag123",
    pageInfo: {
      totalResults: 1,
      resultsPerPage: 1,
    },
    items: [
      {
        id: mockId,
        snippet: {
          title: "Test Video",
          description: "A test description",
          channelTitle: "Test Channel",
        },
        statistics: {
          viewCount: "1000",
          likeCount: "100",
        },
      },
    ],
  };

  it("should return video details when API call succeeds", async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await getVideoDetails({ id: mockId });

    expect(apiClient.get).toHaveBeenCalledWith("/videos", {
      params: {
        part: "snippet,statistics",
        id: mockId,
        key: process.env.EXPO_PUBLIC_API_KEY,
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when API call fails", async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    await expect(getVideoDetails({ id: mockId })).rejects.toThrow(
      "Failed to fetch video details",
    );
  });
});
