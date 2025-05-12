export type SortingOption = "viewCount" | "date" | "relevance";

export type SortingOptions = {
  [key in SortingOption]: string;
};
