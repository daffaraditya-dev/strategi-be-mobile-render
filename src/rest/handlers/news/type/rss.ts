export interface RssResponse {
  status: boolean;
  data: RssFeed;
}

export interface RssItem {
  title: string;
  link: string;
  pubDate?: string;
  description?: string;
  author?: string;
  guid?: string;
  enclosure?: {
    url: string;
    length: string;
    type: string;
  };
}

export interface RssFeed {
  title: string;
  link: string;
  description: string;
  image?: { url: string };
  language?: string;
  pubDate?: string;
  items: RssItem[];
}
