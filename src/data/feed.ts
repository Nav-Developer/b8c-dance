import { site } from "@/data/site";

export type Video = { id: string; title: string };
export type Reel = { code: string; title: string };

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");

export async function getLatestVideos(): Promise<Video[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${site.youtubeChannelId}`,
      { next: { revalidate: 1800 } }, // refresh every 30 min
    );
    if (!res.ok) throw new Error("yt feed failed");
    const xml = await res.text();

    const entries = xml.split("<entry>").slice(1);
    const videos = entries
      .map((e) => {
        const id = e.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
        const title = e.match(/<title>(.*?)<\/title>/)?.[1];
        return id && title ? { id, title: decode(title) } : null;
      })
      .filter(Boolean) as Video[];

    return videos.length ? videos : site.videos;
  } catch {
    return site.videos; // fallback
  }
}

export async function getLatestReels(): Promise<Reel[]> {
  try {
    const res = await fetch(site.instagramFeedUrl, {
      next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error("ig feed failed");
    const data = await res.json();

    const reels = (data.posts ?? [])
      .map((p: any) => {
        const code = p.permalink?.match(/\/(?:reel|p)\/([^/?]+)/)?.[1];
        const title =
          (p.caption ?? "").split("\n")[0].slice(0, 40) || "Latest post";
        return code ? { code, title } : null;
      })
      .filter(Boolean) as Reel[];

    return reels.length ? reels : site.reels;
  } catch {
    return site.reels; // fallback
  }
}
