/**
 * ---------------------------------
 * Snippet & Video
 * ---------------------------------
 */

export interface VideoThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface VideoSnippet {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails: Record<string, VideoThumbnail>;
  channelTitle: string;
}

export interface YoutubeVideo {
  id: { videoId: string };
  snippet: VideoSnippet;
}

/** ---------------------------------
 * Video Details Response
 * ---------------------------------
 */

export interface YoutubeVideoResponse {
  items: YoutubeVideoItem[];
  kind: string;
  etag: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
}

interface YoutubeVideoItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelTitle: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
  };
}

/** ---------------------------------
 * Search Response
 * ---------------------------------
 */

export interface PageInfo {
  resultsPerPage: number;
  totalResults: number; // often an upper-bound estimate (e.g., 1 000 000)
}

export interface YoutubeSearchResponse {
  nextPageToken?: string;
  items: YoutubeVideo[];
  pageInfo: PageInfo;
}
