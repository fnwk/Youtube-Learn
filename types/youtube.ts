export interface VideoSnippet {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: Record<string, { url: string; width: number; height: number }>;
  channelTitle: string;
}

export interface YoutubeVideo {
  id: { videoId: string };
  snippet: VideoSnippet;
}

export interface YoutubeSearchResponse {
  nextPageToken?: string;
  items: YoutubeVideo[];
}
