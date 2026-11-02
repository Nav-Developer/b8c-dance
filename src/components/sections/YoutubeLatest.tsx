import { getLatestVideos } from "@/data/feed";
import YouTubeSection from "./YoutubeSection";

export default async function YouTubeLatest() {
  const videos = await getLatestVideos();
  return <YouTubeSection videos={videos} />;
}
