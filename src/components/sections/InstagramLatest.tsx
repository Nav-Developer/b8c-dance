import { getLatestReels } from "@/data/feed";
import InstagramSection from "./InstagramSection";

export default async function InstagramLatest() {
  const reels = await getLatestReels();
  return <InstagramSection reels={reels} />;
}
