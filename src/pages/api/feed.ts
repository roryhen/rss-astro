import Parser from "rss-parser";
import type { FeedItem, FeedSource } from "../../lib/feeds";

const parser = new Parser();

export type APIResponse = {
  status: "error";
  message: string;
} | {
  status: "success";
  data: {
    source: FeedSource;
    items: FeedItem[];
  };
}

export async function POST({ request }: { request: Request }) {
  const feedUrl = (await request.json()).url;

  if (!feedUrl) {
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Feed URL is required",
      }),
      { status: 400 },
    );
  }

  let source: Parser.Output<Parser.Item>;

  try {
    source = await parser.parseURL(feedUrl);
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({
        status: "error",
        message: "Invalid feed URL",
      }),
      { status: 400 },
    );
  }

  const feedSource: FeedSource = {
    title: source.title ?? source.link ?? feedUrl,
    link: source.link ?? source.feedUrl ?? feedUrl,
    feedUrl: source.feedUrl ?? feedUrl,
    dateAdded: new Date().toISOString(),
  };

  const feedItem: FeedItem[] = source.items.map((item) => {
    return {
      title: item.title ?? feedSource.title,
      author: item.creator ?? "",
      sourceName: feedSource.title,
      sourceId: feedSource.link,
      link: item.link ?? feedSource.link,
      description: item.content ?? item.summary ?? item.contentSnippet ?? "",
      date: item.pubDate ?? item.isoDate ?? "",
      imageUrl: item.enclosure?.url ?? "",
      status: "unread",
    };
  });

  return new Response(
    JSON.stringify({
      status: "success",
      data: {
        source: feedSource,
        feed: feedItem,
      },
    }),
    {
      status: 200
    },
  );
}
