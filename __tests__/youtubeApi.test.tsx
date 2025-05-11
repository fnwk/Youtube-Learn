import { searchVideos } from "@/api/requests/youtube.api";
import { apiClient } from "@/api/api.config";
import type { YoutubeSearchResponse } from "@/types/youtube";

jest.mock("@/api/api.config", () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

describe("searchVideos", () => {
  const mockResponse: YoutubeSearchResponse = {
    nextPageToken: "nextPageToken123",
    items: [
      {
        id: { videoId: "video123" },
        snippet: {
          title: "Test Video",
          description: "Test Description",
          publishedAt: "2023-01-01T00:00:00Z",
          thumbnails: {
            default: {
              url: "http://example.com/default.jpg",
              width: 120,
              height: 90,
            },
          },
          channelTitle: "Test Channel",
        },
      },
    ],
    pageInfo: {
      resultsPerPage: 10,
      totalResults: 100,
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch videos successfully", async () => {
    (apiClient.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await searchVideos({
      query: "test",
      sort: "date",
      maxResults: 5,
    });

    expect(apiClient.get).toHaveBeenCalledWith("/search", {
      params: {
        part: "snippet",
        q: "test",
        type: "video",
        order: "date",
        maxResults: 5,
        pageToken: "",
        key: process.env.EXPO_PUBLIC_API_KEY,
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error when the API call fails", async () => {
    (apiClient.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    await expect(
      searchVideos({
        query: "test",
        sort: "viewCount",
      }),
    ).rejects.toThrow("Failed to fetch videos");
  });
});
