import { Request, Response } from "express";
import Parser from "rss-parser";
import { RssFeed, RssResponse } from "./type/rss";
import { formatPubDate } from "@/utils/date";
import { config } from "@/config";

const parser = new Parser();

export const rssHandler = async (req: Request, res: Response) => {
  try {
    const feed = await parser.parseURL(
      config.rssUrl ?? "https://portal.dephub.go.id/rss"
    );

    const rssData: RssFeed = {
      title: feed.title ?? "",
      link: feed.link ?? "",
      description: feed.description ?? "",
      image: feed.image ? { url: feed.image.url } : undefined,
      language: feed.language,
      pubDate: formatPubDate(feed.pubDate ?? ""),
      items: feed.items.map((item) => ({
        title: item.title ?? "",
        link: item.link ?? "",
        pubDate: formatPubDate(item.pubDate ?? ""),
        description: item.content ?? "",
        author: item.author,
        guid: item.guid,
        enclosure: item.enclosure
          ? {
              url: item.enclosure.url,
              length: item.enclosure.length?.toString() ?? "",
              type: item.enclosure.type ?? "",
            }
          : undefined,
      })),
    };

    const response: RssResponse = {
      status: true,
      data: rssData,
    };

    res.json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
